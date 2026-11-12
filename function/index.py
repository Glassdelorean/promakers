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

REQUIRED_FIELDS = ("Имя", "E-mail", "Задача")

# Кеш tenant_access_token на уровне контейнера функции.
_token_cache = {"value": None, "expires_at": 0.0}


def _post_json(url, payload, headers=None):
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8", **(headers or {})},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
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

    return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"ok": True})}
