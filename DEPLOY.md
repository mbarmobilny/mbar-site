# Деплой mBar на Netlify

## 1. Підготовка

- [ ] Додай зображення `public/og-image.jpg` (1200×630 px) для соцмереж

Домен налаштовано: **mbar.events** (robots.txt, sitemap.xml, index.html)

## 2. Netlify

1. Зайди на [netlify.com](https://netlify.com) → Sign up / Log in
2. **Add new site** → **Import an existing project**
3. Підключи GitHub/GitLab (або завантаж через drag & drop з `dist/`)
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **Environment variables** (Site settings → Environment variables → Add variable):
   - `VITE_FORMSPREE_ID` = твій Formspree ID (наприклад `xwvnyqzz`)
   - `VITE_PHONE` = номер телефону
   - `VITE_EMAIL` = email
   - `VITE_INSTAGRAM_URL` = посилання на Instagram
   - `VITE_FACEBOOK_URL` = посилання на Facebook
6. **Trigger deploy** після додавання змінних (Deploys → Trigger deploy)

## 3. Домен

1. Netlify → **Domain settings** → **Add custom domain**
2. Введи свій домен (mbar.events)
3. Netlify покаже, які DNS-записи додати у реєстраторі домену
4. Після оновлення DNS (5–60 хв) Netlify підхопить домен і видасть SSL

## 4. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console)
2. **Add property** → введи свій домен
3. Підтвердження: DNS (TXT-запис) або HTML-файл
4. **Sitemaps** → додай `https://mbar.events/sitemap.xml`

## 5. Перевірка

- [ ] Сайт відкривається по домену
- [ ] HTTPS працює (замок у браузері)
- [ ] `https://mbar.events/robots.txt` відкривається
- [ ] `https://mbar.events/sitemap.xml` відкривається
