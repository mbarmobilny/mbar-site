# mBar — Premium Mobilny Bar

Сайт мобільного бару. React + TypeScript + Vite + Tailwind CSS.

## Швидкий старт

```bash
npm install
npm run dev
```

## Конфігурація (.env)

```env
VITE_PHONE=+48578224721
VITE_EMAIL=mbarmobilny@gmail.com
VITE_INSTAGRAM_URL=https://www.instagram.com/mbarmobilny
VITE_FACEBOOK_URL=https://www.facebook.com/share/17HJkD8LRt/

# Formspree — для відправки форми на пошту
# 1. Створіть акаунт на formspree.io
# 2. Нова форма → Email: mbarmobilny@gmail.com
# 3. Скопіюйте ID з URL (https://formspree.io/f/XXXXX → XXXXX)
VITE_FORMSPREE_ID=your_form_id

# Google Analytics 4 (опційно)
# analytics.google.com → Admin → Data streams → Measurement ID
VITE_GA_ID=G-XXXXXXXXXX
```

## Деплой

- **Netlify**: `npm run build` → publish `dist/` (див. DEPLOY.md)

## Структура

```
src/
├── components/
├── context/       # LanguageContext
├── utils/         # translations
├── assets/        # logo.png, hero.png
└── ...
```
