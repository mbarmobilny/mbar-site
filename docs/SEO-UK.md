# SEO та іконка в Google (короткий гайд для mbar.events)

## Чому в пошуку був старий опис і «земна куля»

- **Сніпет** (заголовок + текст під ним) Google бере з кешу. Після змін на сайті потрібні **кілька днів — інколи тижнів**, поки робот знову просканує сторінку.
- **Іконка (favicon)** у видачі має бути **квадратною** (співвідношення 1:1), Google рекомендує **мінімум 48×48 px**. Не-квадратний SVG часто ігнорують → показують стандартну «землю».

Що зроблено в проєкті:

- `public/favicon.svg` — **квадратний** 512×512 з вашим логотипом.
- У `index.html` — посилання на favicon + `site.webmanifest`.
- Тексти title/description — з ключовими фразами (mobilny bar, Leszno тощо) без спаму.
- **Дві мови (PL + EN):** у `<head>` додані **hreflang** (`/` = pl, `/?lang=en` = en), у JSON-LD — `availableLanguage`. Після перемикання мови на сайті в адресі з’являється `?lang=en` (можна ділитися англомовним посиланням). У sitemap є обидва URL.

## Що зробити тобі вперше (покроково)

### 1. Google Search Console (обов’язково)

1. Зайди на [search.google.com/search-console](https://search.google.com/search-console).
2. Додай **ресурс** з префіксом URL: `https://mbar.events/`.
3. Підтвердь власність (зазвичай файл або DNS — Netlify часто підказує TXT).
4. У розділі **Sitemaps** додай: `https://mbar.events/sitemap.xml`.
5. Використай **URL inspection** (Перевірка URL) для головної → **Request indexing** («Запросити індексацію») після кожного важливого оновлення.
6. Опційно: так само запроси індексацію для **`https://mbar.events/?lang=en`**, щоб Google швидше пов’язав англійську версію з hreflang.

### 2. Іконка в Google (нема окремої кнопки «замінити»)

Google **сама** підтягує favicon з HTML, коли:

- Іконка доступна за URL (наприклад `/favicon.svg`), без блокування в `robots.txt`.
- Формат підходить (квадрат; для надійності інколи додають ще `favicon.ico` 48×48 — можна згенерувати з SVG онлайн).
- Пройшов час після переобходу сайту.

Якщо через 2–4 тижні після деплою все ще «земля» — перевір у Search Console **Coverage** / **Page indexing**, чи немає помилок для головної.

### 3. Запити на кшталт «mobilne bary», «mobilny bar na wesele»

Google не «вмикає» сайт за одну ніч. Допомагає:

- **Релевантні фрази** в `<title>` і meta description (вже підлаштовано під PL).
- **Унікальний текст** на сторінці (у вас — польською в `translations.ts`).
- **Посилання з інших сайтів** (Instagram, Facebook, каталоги локальних фірм, весільні портали).
- **Google Business Profile** (карти) для запитів у регіоні — дуже важливо для «поблизу мене».

### 4. Реалістичні очікування

- Топ-3 по загальних словах на кшталт «mobilne bary» по всій Польщі — дуже конкурентно; простіше збирати трафік з **Leszno**, **wielkopolskie**, **bar na wesele** + місто.
- Один гарний сайт + Search Console + профіль у Google Maps + соцмережі — нормальний старт для малого бізнесу.

Офіційна довідка Google про favicon:  
[developers.google.com/search/docs/appearance/favicon-in-search](https://developers.google.com/search/docs/appearance/favicon-in-search)
