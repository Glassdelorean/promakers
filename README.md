# ProMakers — сайт IT-консалтинга

Одностраничный сайт компании ProMakers: экспертный IT-консалтинг и цифровая трансформация.
Тёмная тема, адаптивная вёрстка, поддержка трёх языков (русский / English / 中文).

## Стек

- Чистый HTML5 / CSS3 / JavaScript — без сборки и зависимостей
- i18n на `data-i18n`-атрибутах, словарь в одном файле (`assets/js/i18n.js`)
- Никаких трекеров и внешних шрифтов — работает офлайн

## Структура проекта

```
├── index.html                  # главная страница (лендинг)
├── 404.html                    # страница ошибки
├── favicon.ico                 # иконка вкладки (16/32/48)
├── assets/
│   ├── css/
│   │   └── style.css           # тёмная тема, адаптив, анимации, стили 404
│   ├── js/
│   │   ├── i18n.js             # словарь RU/EN/ZH + переключение языка
│   │   └── main.js             # меню, reveal-анимации, счётчики, форма
│   └── img/
│       ├── logo-mark.png       # эмблема (шапка, футер, favicon)
│       ├── logo-full.png       # полный логотип (404, og:image)
│       ├── favicon-32.png      # PNG-иконка 32×32
│       └── apple-touch-icon.png# иконка 180×180 для iOS
├── README.md
├── LICENSE
└── .gitignore
```

## Локализация

Переводы хранятся в словаре `I18N` в `assets/js/i18n.js` (65 ключей на каждый язык).
Чтобы добавить или изменить текст:

1. добавьте элементу атрибут `data-i18n="my.key"` (или `data-i18n-ph` для placeholder);
2. добавьте ключ `my.key` в каждую из локалей: `ru`, `en`, `zh`.

Переключатель в шапке сохраняет выбор в `localStorage`; при первом визите язык
определяется из настроек браузера. На 404.html используется тот же ключ хранилища.

## Запуск

Это статический сайт — достаточно открыть `index.html` в браузере
или отдать папку любым веб-сервером:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .
```

## Деплой на GitHub Pages

1. Создайте репозиторий на GitHub и загрузите проект:
   ```bash
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. В репозитории: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. Через минуту сайт будет доступен по адресу `https://<user>.github.io/<repo>/`.

## Деплой на Netlify / Vercel

- **Netlify:** перетащите папку проекта в dashboard (drag & drop) — сборка не нужна,
  publish directory = корень проекта.
- **Vercel:** `vercel deploy` из корня — framework: Other, без build-команды.

## Настройка формы

Форма заявки в `index.html` сейчас работает в демо-режиме (без отправки).
Подключите свой обработчик в `assets/js/main.js` в блоке `contact form`,
например `fetch()` к Formspree, EmailJS или собственному бэкенду:

```js
await fetch("https://formspree.io/f/<your-id>", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
});
```

## Лицензия

Код — MIT (см. `LICENSE`). Логотип и тексты — собственность ProMakers.
