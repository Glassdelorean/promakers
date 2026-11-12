"""ProMakers — прокси формы заявки в Lark Bitable (Yandex Cloud Function).

Секреты хранятся только в переменных окружения функции (LARK_APP_SECRET
и др. задаются при создании версии функции), в коде и на клиенте их нет.

Ручка: index.handler. Runtime: python312 (подойдёт и python311/310).
Зависимостей нет — используется стандартная библиотека urllib.
"""

import json
import os
import time
import urllib.request

LARK_TOKEN_URL = "https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal"
LARK_RECORDS_URL = (
    "https://open.larksuite.com/open-apis/bitable/v1/apps"
    "/{app_token}/tables/{table_id}/records"
)

APP_ID = os.environ["LARK_APP_ID"]
APP_SECRET = os.environ["LARK_APP_SECRET"]
APP_TOKEN = os.environ["LARK_APP_TOKEN"]
TABLE_ID = os.environ["LARK_TABLE_ID"]

# Домен сайта, которому разрешено обращаться к функции из браузера.
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "https://promakers.pro")

# Telegram: оповещение о новых заявках (токен и chat_id — только в env функции).
# ВАЖНО: api.telegram.org блокируется с IP РФ (в т.ч. Yandex Cloud) —
# без зарубежного прокси уведомления не уйдут. См. LARK_WEBHOOK_URL ниже.
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")

# Вебхук кастомного бота Lark-группы: надежный канал уведомлений без блокировок.
# Формат: https://open.larksuite.com/open-apis/bot/v2/hook/xxxxxxxx
LARK_WEBHOOK_URL = os.environ.get("LARK_WEBHOOK_URL", "")

REQUIRED_FIELDS = ("Имя", "E-mail", "Задача")

# Кеш tenant_access_token на уровне контейнера функции.
_token_cache = {"value": None, "expires_at": 0.0}


def _post_json(url, payload, headers=None, timeout=10):
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8", **(headers or {})},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def get_tenant_token():
    now = time.time()
    if _token_cache["value"] and now < _token_cache["expires_at"] - 60:
        return _token_cache["value"]
    data = _post_json(LARK_TOKEN_URL, {"app_id": APP_ID, "app_secret": APP_SECRET})
    if data.get("code") != 0:
        raise RuntimeError(f"Lark auth failed: {data.get('msg')}")
    _token_cache["value"] = data["tenant_access_token"]
    _token_cache["expires_at"] = now + data.get("expire", 7200)
    return _token_cache["value"]


def create_record(fields):
    token = get_tenant_token()
    url = LARK_RECORDS_URL.format(app_token=APP_TOKEN, table_id=TABLE_ID)
    data = _post_json(url, {"fields": fields}, {"Authorization": f"Bearer {token}"})
    if data.get("code") != 0:
        raise RuntimeError(f"Lark record failed: {data.get('msg')}")
    return data.get("data", {})


def notify_telegram(fields):
    """Шлёт уведомление о заявке в Telegram. Не падает при ошибке —
    заявка уже сохранена в Bitable, уведомление лишь информирует."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return
    text = format_lead_text(fields)
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    try:
        # Короткий таймаут: Telegram не должен блокировать ответ посетителю.
        _post_json(url, {"chat_id": TELEGRAM_CHAT_ID, "text": text}, timeout=3)
    except Exception as exc:  # noqa: BLE001 - логируем и идём дальше
        print(f"Telegram notify failed: {exc}", flush=True)
        print("NOTE: api.telegram.org is blocked from RU IPs — use LARK_WEBHOOK_URL", flush=True)


def format_lead_text(fields):
    lines = ["🆕 Новая заявка с promakers.pro"]
    for key in ("Имя", "Компания", "E-mail", "Телефон", "Задача"):
        value = str(fields.get(key, "")).strip()
        if value:
            lines.append(f"{key}: {value}")
    return "\n".join(lines)


def notify_lark_webhook(fields):
    """Шлёт уведомление в Lark-группу через вебхук кастомного бота.
    Не падает при ошибке — заявка уже сохранена в Bitable."""
    if not LARK_WEBHOOK_URL:
        return
    payload = {"msg_type": "text", "content": {"text": format_lead_text(fields)}}
    try:
        _post_json(LARK_WEBHOOK_URL, payload, timeout=3)
    except Exception as exc:  # noqa: BLE001 - логируем и идём дальше
        print(f"Lark webhook notify failed: {exc}", flush=True)


def handler(event, context):
    cors_headers = {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    method = (event.get("httpMethod") or "").upper()

    # Preflight-запрос браузера.
    if method == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if method != "POST":
        return {
            "statusCode": 405,
            "headers": cors_headers,
            "body": json.dumps({"error": "method not allowed"}),
        }

    try:
        body = json.loads(event.get("body") or "{}")
    except (TypeError, ValueError):
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "invalid JSON"}),
        }

    fields = body.get("fields") or {}

    # Минимальная серверная валидация: на сервере нельзя доверять клиенту.
    missing = [f for f in REQUIRED_FIELDS if not str(fields.get(f, "")).strip()]
    if missing:
        return {
            "statusCode": 422,
            "headers": cors_headers,
            "body": json.dumps({"error": f"missing required fields: {', '.join(missing)}"}),
        }

    # Обрезаем значения, чтобы не забить таблицу мусором.
    fields = {k: str(v)[:4000] for k, v in fields.items() if isinstance(v, (str, int, float))}

    try:
        create_record(fields)
    except Exception as exc:  # noqa: BLE001 - возвращаем текст ошибки в лог/клиент
        return {
            "statusCode": 502,
            "headers": cors_headers,
            "body": json.dumps({"error": str(exc)}),
        }

    notify_telegram(fields)
    notify_lark_webhook(fields)

    return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"ok": True})}
