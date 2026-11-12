# Прокси формы → Lark Bitable (Yandex Cloud Function)

Функция принимает POST `{"fields": {...}}` с сайта, сама получает
`tenant_access_token` у Lark и создаёт запись в Bitable.
`app_secret` хранится только в переменных окружения функции и не попадает
ни в браузер, ни в git-репозиторий.

## 1. Создание функции (консоль Yandex Cloud)

1. **Serverless → Functions → Создать функцию**, имя: `promakers-form-proxy`.
2. **Создать версию**:
   - Runtime: **Python 3.12**
   - Способ: «Редактор кода» — вставьте содержимое `index.py` из этой папки
   - Точка входа: `index.handler`
   - Таймаут: 10 сек, память: 128 МБ
   - **Переменные окружения** (Add environment variable):

     | Ключ | Значение |
     |---|---|
     | `LARK_APP_ID` | `cli_aa7caffc4438de26` |
     | `LARK_APP_SECRET` | ваш app secret |
     | `LARK_APP_TOKEN` | `SphgbuTNFagCgcseiOEjzAGJpgg` |
     | `LARK_TABLE_ID` | `tblzWxoKRHubqfLZ` |
     | `ALLOWED_ORIGIN` | `https://promakers.pro` |

3. Создать версию.

## 2. HTTP-триггер (публичный URL)

1. **Serverless → Триггеры → Создать триггер**.
2. Тип: **HTTP**; Функция: `promakers-form-proxy`, тег `$latest`.
3. Создать → скопируйте **URL для вызова** вида
   `https://functions.yandexcloud.net/d4e1xxxxxxxxxxxxxxxx`.

## 3. Подключение к сайту

В `assets/js/main.js` замените плейсхолдер:

```js
const FORM_ENDPOINT = "https://functions.yandexcloud.net/d4e1xxxxxxxxxxxxxxxx";
```

Закоммитьте и запушьте — Actions перезальёт сайт на бакет.

## 4. Проверка

```powershell
curl -X POST <URL триггера> -H "Content-Type: application/json" -d '{\"fields\":{\"Имя\":\"Тест\",\"E-mail\":\"t@t.ru\",\"Задача\":\"Проверка\"}}'
```

Ожидается `{"ok": true}` и строка в таблице Lark.

## Важно

- Старый app secret уже попадал в клиентский код — **перевыпустите его**
  в консоли Lark (App → Credentials → reset secret) и обновите переменную
  окружения функции.
- Проверьте, что CORS-заголовок `ALLOWED_ORIGIN` совпадает с доменом
  (включая `www`, если используется).
- В таблице Bitable должны существовать текстовые поля: `Имя`, `Компания`,
  `E-mail`, `Телефон`, `Задача`.
