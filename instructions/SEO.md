# SEO thebrightbyte.com: спорт и развлечения

Дата: 29.10.2026. Заменяет SEO-стратегию от 20.01.2026 (compliance) и план SEO/GEO от 22.09.2026. Данные: Google Search Console за 29.07–26.10.2026.

Это единственный SEO-документ проекта. Агенты, которые работают с метаданными, схемами и контентом, читают его и `.claude/product-marketing-context.md`.

## 1. Позиционирование

The BrightByte делает софт и ИИ для спортивных клубов, лиг, академий и площадок: программы лояльности, билеты, CRM, мобильные приложения, интеграции и автоматизация. Собственный продукт в этой нише: Revanta.

Что это значит для поиска:

- Главная, разделы, Organization schema и llms.txt описывают спорт и развлечения. Сделано 29.10.2026.
- Регуляторика и fintech остаются только в тегах кейсов и в уже написанных статьях. Новых compliance-материалов не пишем, главная на них не ссылается.
- Один бренд продукта: Revanta, software by The BrightByte. Virazh, Tribune и BCT на сайте не упоминаются.

## 2. Где мы сейчас

| Метрика за 3 месяца | Значение |
|---|---|
| Клики / показы | 250 / 65 000, средняя позиция около 21 |
| Показы в день | 900 в августе, 500 в октябре |
| Главная | 45 кликов, 2 260 показов, позиция 11 |
| Бренд brightbyte | 21 клик, 422 показа, позиция 5,5 |
| Бренд revanta | 1 клик, 85 показов, позиция 6 |

Падение показов с августа идёт в основном по compliance-запросам, которые мы больше не развиваем. Это ожидаемо.

### Кластер sports CRM: главная возможность

Все запросы вида sports crm, crm for sports clubs, crm for sports teams, sports crm software, football club crm software ведут на статью The-best-CRM. По кластеру около 5 000 показов за квартал, позиции 9–15, кликов два. Продуктовая страница `/revanta/loyalty` по этим запросам почти не показывается: 14 показов за квартал.

Вывод: статья собирает спрос, продукт его не получает. Задача квартала перевести коммерческий интент на продуктовую страницу, а статью оставить на сравнительном интенте.

### Что ещё ранжируется по спорту

| Страница | Клики / показы | Позиция | Комментарий |
|---|---|---|---|
| interactive-platforms-and-fan-engagement | 14 / 5 542 | 36 | большой спрос по fan engagement platforms, нужна подтяжка |
| How_to_choose_a_CRM_for_a_sports_club | 7 / 5 093 | 29 | каннибализация с The-best-CRM по sports club crm |
| stadium-management-system | 4 / 2 068 | 44 | запрос stadium management app на позиции 19 |
| ai-transforming-real-time-coaching | 4 / 897 | 18 | ai sports coach на позиции 16 |
| How-AI-is-revolutionising-performance-in-sport | 5 / 875 | 41 | ai sports analytics, позиции 55–70 |
| loyalty-programmes-in-nhl-club-mobile-apps | 4 / 618 | 25 | единственная страница про лояльность, которую видит Google |

### Compliance-хвост, который остаётся

ai-audit-trail-architecture-compliance даёт 9 400 показов на позиции 7 и два клика, ai-coding-agents-soc2 3 200 показов и 12 кликов, All-fintech-is-about-c-sharp 25 кликов. Эти страницы не удаляем и не переписываем, они держат индекс. Ссылки на них с главной и из футера убраны.

## 3. Карта кластеров и страниц

Одна главная фраза на страницу. Коммерческий интент на продукт, информационный на статьи.

| Кластер | Главная фраза | Коммерческая страница | Информационные страницы |
|---|---|---|---|
| Sports CRM | sports crm software | `/revanta/loyalty` | The-best-CRM (сравнение 7 систем), How_to_choose_a_CRM (чек-лист), ai-sports-crm-decision-engine |
| Fan loyalty | fan loyalty program software | `/revanta/loyalty` | loyalty-programmes-in-nhl-club-mobile-apps, fan-data-analytics-sports-crm |
| Fan engagement | fan engagement platform for sports teams | `/revanta/loyalty` | interactive-platforms-and-fan-engagement, ai-fan-engagement-pro-sports |
| Ticketing | sports ticketing software, season ticket management | `/revanta/ticketing` | How_CRM_helps_increase_ticket, fan-app-game-day-load-vibe-coded-prototype |
| Facilities | ice rink management software, arena management software | `/revanta/ticketing` | stadium-management-system |
| Youth sports | youth sports registration software | `/revanta/sportschool` | youth_sports_trauma_article, organise_tournament_software |
| Club websites | sports club website builder | `/revanta/sites` | sports-club-website-disaster-court |
| Merch | team store software | `/revanta/ecom` | нет, низкий приоритет |
| AI in sport | ai sports analytics, ai sports coach | главная, `/cases` | How-AI-is-revolutionising-performance-in-sport, ai-transforming-real-time-coaching, How-sports-analytics-works |
| Agency | sports software development company, fan app development | главная, `/comparison`, `/cases` | кейсы Torpedo, Norilsk, FCDM, Stocks Soccer |

## 4. Метаданные

Правила для title и description:

- Title до 60 знаков, ключ в начале, бренд в конце через вертикальную черту.
- Description до 155 знаков, включает ключ и одну конкретику: вид спорта, что делает продукт, с какого года работаем.
- На продуктовых страницах Revanta H1 равен категории плюс выгода, без слоганов.
- Статьи: title называет формат и год, если это сравнение или список: «Best CRM for Sports Clubs & Teams (2026): 7 Tools Compared».

Текущие title страниц сайта лежат в `src/utils/pageMetadata.ts`, страниц Revanta в `src/data/revanta/content.ts`.

## 5. Схемы

- Organization с `@id`, legalName The BrightByte Capital LLC, brand Revanta, knowsAbout про спорт. Файл `src/utils/organizationSchema.ts`.
- ProfessionalService с каталогом услуг: лояльность, билеты, CRM и интеграции, мобильные приложения, ИИ-агенты, аудит безопасности агентов.
- Страницы Revanta: SoftwareApplication, FAQPage, BreadcrumbList, связаны с организацией через `isPartOf`.
- Кейсы: вид спорта в title, description и тегах.
- JobPosting: отрасль Sports Technology, Entertainment, Artificial Intelligence.

## 6. GEO: как нас цитируют ИИ-поисковики

Запросы длиной от десяти слов в GSC уже есть: «which companies provide the best crm tools for sports fan databases», «sports software rated highest for fan engagement and ticket sales management». Они ведут на The-best-CRM и на чек-лист, позиции 4–8.

Что держим:

- llms.txt со списком продуктов Revanta, фактами, ценовой моделью и блоком «чего не делаем».
- Сравнения с конкурентами сегмента на продуктовых страницах с датой «as of».
- robots пропускает OAI-SearchBot, PerplexityBot, Perplexity-User. Работает.
- IndexNow после деплоя. Работает в `nextjs.yml`.

Раз в месяц прогоняем 20 промптов в ChatGPT search, Perplexity и Google AI Mode и записываем, упомянута ли Revanta и какой URL.

## 7. План работ

### Ближайшие две недели

1. Пуш репозиционирования от 29.10 и проверка: главная, схемы, редиректы со старых URL SOC2-checker.
2. `/revanta/loyalty`: title «Sports CRM, Fan Loyalty & Ticketing Software | Revanta», H1 с фразой sports CRM, блок «Revanta vs FanMaker» с датой. Сейчас страница по кластеру не видна.
3. The-best-CRM: в первом экране ссылка на `/revanta/loyalty` с анкором «sports CRM software», раздел «EngageRM alternatives».
4. interactive-platforms-and-fan-engagement: обновить на 2026, добавить таблицу платформ, ссылку на продукт. 5 500 показов на позиции 36.
5. Снять каннибализацию sports club crm: How_to_choose_a_CRM остаётся чек-листом, из текста убрать абзацы, которые повторяют сравнение из The-best-CRM.

### Месяц

6. stadium-management-system: retitle «Stadium & Arena Management Software (2026)», ссылка на `/revanta/ticketing`.
7. Статьи по ИИ в спорте: три страницы с позициями 40–70 объединить в одну «AI in Sports Analytics and Coaching: What Clubs Use in 2026» с редиректами.
8. Кейсы: Torpedo, Norilsk, FCDM, Stocks Soccer проверить title и description на вид спорта и продукт.
9. Листинги Revanta: Capterra, GetApp, G2 в категориях Sports League Management, Club Management, Fan Engagement.

### Квартал

10. Сравнительные страницы `/revanta/vs/fanmaker`, `/revanta/vs/playmetrics`, `/revanta/vs/dash-platform`.
11. Alternative-страницы по автокомплиту: TeamSnap alternatives, SportsEngine alternatives.
12. Один американский или европейский пилот Revanta и кейс с цифрами. Пока все спортивные кейсы российские, для US-покупателя это слабое место.

## 8. Измерение

Ежемесячно в GSC:

- Фильтр Page contains `/revanta`: показы, клики, позиции по кластерам из раздела 3.
- Regex по запросам `crm|loyalty|ticket|fan|rink|arena|stadium|youth sports`: доля топ-10.
- Бренд-запросы brightbyte и revanta отдельно.
- GA4: событие `generate_lead` с полем product.

Цель на квартал: `/revanta/loyalty` в топ-10 по sports crm software, клики по спортивным кластерам выше compliance-хвоста.

## 9. Открытые вопросы

- Модель цены Revanta для блока «How pricing works» и llms.txt.
- Где физически хостятся данные клиентов США.
- Адрес компании: Los Angeles в schema и футере, Wyoming LLC в политике, Raleigh в маркетинговом контексте и LinkedIn. Нужен один для Google и ИИ-поисковиков.
