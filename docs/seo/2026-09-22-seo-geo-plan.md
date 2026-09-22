# thebrightbyte.com: SEO/GEO — ядро «было / стало» и план работ

Дата: 22.09.2026. Данные: Google Search Console за 3 месяца (≈21.06–20.09.2026), аудит репозитория, ревью SEO-агента, `offer-by-segment.md`.

## 1. Исходная точка (GSC, 3 месяца)

| Метрика | Значение |
|---|---|
| Клики / показы | 244 / 99 174, CTR 0,25%, средняя позиция ≈19 |
| США | 79 кликов / 54 178 показов |
| Тренд показов | −22% (первые 30 дней → последние 30) |
| Кластер «sports CRM» | 11,3k показов, 3 клика, поз. 10–20. Трафик забирала статья The-best-CRM, а не продукт |
| Страницы Revanta | `/revanta` 305 показов, 0 кликов. Продуктовые `virazh-*`: **0 показов**, в sitemap их не было |
| Бренд «revanta» | 53 показа, поз. 7,4 |
| Hockey / academy / ticketing / rink / website / merch | 0–250 показов на кластер |
| GEO | ChatGPT и AI-сводки цитируют Revanta только через статью The-best-CRM, причём с KHL-позиционированием. Продуктовые страницы не цитируются |

## 2. SEO-ядро: страницы Revanta, было → стало

| Страница | Было: URL / title | Стало: URL / title | Главный кластер (стало) | Сегмент / конкурент |
|---|---|---|---|---|
| Хаб | `/revanta` · «Revanta — platform for sports clubs \| BCT» | `/revanta` · **Revanta: Software for Sports Clubs, Academies & Rinks** | sports club software, sports club management software | все |
| SportSchool | `/revanta/en/products/virazh-sports-school` · «Revanta SportSchool — sports academy management \| BCT» | `/revanta/youth-sports-club-software` · **Sports Academy Management Software \| Revanta SportSchool** | sports academy management software; вторичные: youth club registration, tryouts, practice scheduling, player development, field scheduling | клубы, академии, лиги / PlayMetrics |
| Loyalty | `/revanta/en/products/virazh-loyalty` · «Revanta Loyalty — CRM for a sports club \| BCT», meta на русском | `/revanta/sports-crm` · **Sports CRM, Ticketing & Fan Loyalty \| Revanta Loyalty** | sports CRM (11k показов уже есть), fan loyalty program software, season ticket software, ticketing for sports clubs | клубы со зрителями, университеты / FanMaker |
| Venues | — (не было) | `/revanta/sports-facility-software` · **Rink & Sports Facility Management Software \| Revanta** | ice rink management software, sports facility management/scheduling, facility rental booking, public skate tickets | катки, арены, стадионы, рек-центры / Dash Platform |
| Sites | `/revanta/en/products/virazh-sites` · «Revanta — CMS and websites for sports clubs \| BCT», meta на русском | `/revanta/sports-club-website` · **Sports Club Website Platform & CMS \| Revanta Sites** | sports club website builder / platform, club website CMS | клубы, академии |
| e-com | `/revanta/en/products/virazh-ecom` · «Revanta e-com — club merchandise store \| BCT», meta на русском | `/revanta/club-merch-store` · **Merch Store Platform for Sports Clubs \| Revanta e-com** | club merchandise store platform, team store software | клубы со зрителями (низкий приоритет) |
| Academy | `/revanta_academy` (сломанная страница, 9 показов) | редирект → SportSchool | — | — |

Что изменилось на каждой странице:
- **Было:** prebuilt HTML из чужой сборки. Три имени продукта (Revanta / Virazh / BCT), русские meta и keywords, «Storage in Russia», CDEK, 1C, VAT, логотипы KHL-клубов, publisher указывал на digitalburo.tech, страниц не было в sitemap.
- **Стало:** нативные Next-страницы из одного источника данных (`src/data/revanta/`). В title сначала ключ, бренд в конце. H1 = категория + выгода. Тексты построены на закрытом списке работ сегмента и формулировках конкурентов, переписанных своими словами. На каждой странице:
  - блок фактов;
  - честная таблица сравнения с конкурентом сегмента, включая «чего у нас нет»;
  - FAQ;
  - schema: SoftwareApplication + FAQPage + BreadcrumbList, связанные с `@id` организации.

  Все URL есть в sitemap, старые адреса перенаправлены.

## 3. SEO-ядро: кластеры, было → стало

| Кластер | GSC сейчас (показы / поз.) | Кто держал | Кто держит теперь |
|---|---|---|---|
| sports CRM / CRM for sports clubs & teams | 11 327 / 18,6 | The-best-CRM (информационная статья) | коммерческий: `/revanta/sports-crm`; сравнение: The-best-CRM (новый title «Best CRM for Sports Clubs & Teams (2026): 7 Tools Compared», ссылка на продукт) |
| fan loyalty / fan engagement | 4 787 / 42,5 | 4 статьи вразнобой | `/revanta/sports-crm` (коммерческий), статьи ссылаются на него (фаза 3) |
| ticketing / season tickets | 248 / 14,7 | How_CRM_helps_increase_ticket | `/revanta/sports-crm` + статья со ссылкой-анкором |
| stadium / arena / rink / facility | 1 596 / 41,2 | stadium-management-system | `/revanta/sports-facility-software` + статья со ссылкой |
| academy / youth / tryouts / practice planning | ≈1 000 / 56,8 | — | `/revanta/youth-sports-club-software` |
| hockey | 58 / 44,6 | — | SportSchool + Venues (хоккейные сценарии). Отдельная `/revanta/hockey` — фаза 4 |
| sports club website / CMS | 0 | — | `/revanta/sports-club-website` |
| merch / team store | 226 / 27,1 | — | `/revanta/club-merch-store` |
| brand «revanta» | 53 / 7,4 | `/revanta` | `/revanta` + Organization.brand + llms.txt |

## 4. GEO: было → стало

| Сигнал | Было | Стало |
|---|---|---|
| Имя сущности | Revanta / Virazh / Вираж / Tribune / BCT / Бюро Цифровых Технологий | Одно: «Revanta is sports club software by The BrightByte» (сайт, schema, llms.txt) |
| llms.txt | «Tribune / Virazh», KHL-клиенты, без URL | 5 продуктов со ссылками и фактами, блок «What Revanta does not do», сроки и модель цены |
| Schema | SoftwareApplication с publisher → digitalburo.tech | Organization `@id` + legalName + brand Revanta; продукты `isPartOf` хаба; FAQPage; BreadcrumbList |
| Сравнения | нет | vs PlayMetrics, vs FanMaker, vs Dash на страницах продуктов (дата «as of Sep 2026») |
| robots | AI-боты через `*` | + OAI-SearchBot, Perplexity-User явно |
| Русские сигналы | KHL, ₽, CDEK, 1C, «Storage in Russia», KHL sync в видео | убраны со страниц Revanta и из спортивных статей |

## 5. Сделано сегодня

1. GA: исправлена загрузка счётчика на повторных визитах, добавлена ссылка на политику в баннер. Политика переписана под US / The BrightByte Capital LLC (Wyoming). *(коммит `a4e3356`, задеплоен)*
2. Revanta пересобрана нативно, 6 страниц, новые slug'и, редиректы со старых URL, sitemap, schema, llms.txt, robots. *(коммит `c422780`, локально, ждёт push)*
3. Virazh / BCT / Tribune удалены из кода, имён файлов, статей и меню. Tribune-статья → `/playbook/expertise/fan-data-analytics-sports-crm` (с редиректом).
4. The-best-CRM: новые title и meta, KHL-позиционирование убрано, ссылки на `/revanta/sports-crm`. Контекстные ссылки на продукты из How_CRM_helps_increase_ticket, stadium-management-system и sports-crm-2026.

## 6. План работ

### Фаза 1 — сразу после деплоя (1 день)
| # | Задача | Кто |
|---|---|---|
| 1.1 | Push `c422780` и проверка деплоя: 6 страниц 200, редиректы со старых URL, `sitemap.xml` содержит Revanta | Claude |
| 1.2 | GSC: отправить sitemap, Request Indexing для 6 URL Revanta | владелец |
| 1.3 | Bing Webmaster Tools (импорт из GSC) + sitemap. ChatGPT search и Copilot опираются на индекс Bing | владелец |
| 1.4 | IndexNow-пинг в CI после деплоя (`nextjs.yml`) | Claude |
| 1.5 | GA4: фильтр hostname = thebrightbyte.com, content groups `revanta` / `ai`, channel group «AI Assistants», событие `generate_lead` с `product` | Claude + владелец |

### Фаза 2 — подтверждения от владельца (блокеры контента)
| # | Вопрос | Почему важно |
|---|---|---|
| 2.1 | В SportSchool есть экраны регистрации и взносов, tryouts, внутренних лиг, документов игроков? Тексты написаны по `offer-by-segment.md`, на текущих скринах этого нет | не обещать то, чего не покажет демо |
| 2.2 | Модель цены (за организацию / сезон / модуль) | блок «How pricing works», частый вопрос к LLM |
| 2.3 | Где физически хостятся данные (US / EU)? | фраза для блока фактов вместо удалённого «Storage in Russia» |
| 2.4 | Какой адрес компании правильный: Raleigh (schema), Cary + Belgrade (футер), Wyoming (политика)? | единый NAP для Google и LLM |
| 2.5 | Кейсы `/cases/torpedo`, `avangard`, `norilsk`, `fcdm` (российские клубы): оставить, обезличить или noindex? | единственный proof Revanta, но это российский сигнал для US-рынка |
| 2.6 | Перезаписать демо-видео: в роликах `admin@digitalburo.tech`, русские имена, поле «Patronymic» | GEO и доверие US-покупателя |

### Фаза 3 — перелинковка и существующий контент (1 неделя)
| # | Задача |
|---|---|
| 3.1 | Блок «Our products: Revanta, Regfo» на главной; колонка Revanta со всеми 6 URL в футере |
| 3.2 | `How_to_choose_a_CRM_for_a_sports_club` → интент «Sports CRM Requirements Checklist (RFP Template)» (убрать каннибализацию) |
| 3.3 | `interactive-platforms-and-fan-engagement` → листикл «Fan Engagement Platforms for Sports Teams (2026)» со ссылкой на `/revanta/sports-crm` |
| 3.4 | `stadium-management-system` → retitle «Stadium & Arena Management Software (2026)» |
| 3.5 | The-best-CRM: H2 «EngageRM alternatives» (запрос уже на поз. 3,8) |
| 3.6 | Слить `sports-crm-2026-from-database-to-ai-agent` в `ai-sports-crm-decision-engine` (redirect) |
| 3.7 | `src/data/revanta/keyword-map.ts`: кластер → URL, одна главная фраза на страницу |

### Фаза 4 — новые страницы (2–4 недели)
| # | Задача |
|---|---|
| 4.1 | `/revanta/hockey`: SportSchool + Venues + Loyalty для хоккея (главный proof продукта) |
| 4.2 | Comparison-страницы: `/revanta/vs/playmetrics`, `/revanta/vs/fanmaker`, `/revanta/vs/dash-platform`, «EngageRM alternatives» |
| 4.3 | `/revanta/soccer` (football CRM уже даёт 1,7k показов) |
| 4.4 | AI-линия: retitle striking-distance статей (audit trail, SOC 2 agents, PCI, CRA, DORA) и service-страницы `/services/ai-agent-development` и т.д. |

### Фаза 5 — GEO off-site (постоянно)
| # | Задача |
|---|---|
| 5.1 | Листинги Revanta: Capterra / GetApp / G2 (Sports League Management, Club Management, Fan Engagement, Facility Management), Crunchbase, LinkedIn showcase page |
| 5.2 | Ежемесячный прогон 30 промптов в ChatGPT search, Perplexity и Google AI Mode; таблица «упомянуты? какой URL?» |
| 5.3 | 1–2 US/EU пилота → кейс с цифрами |

### Фаза 6 — измерение (ежемесячно)
- GSC: regex-сегменты brand / GEO-proxy (промпт-запросы от 10 слов) / off-ICP / аномалии; фильтр Page contains `/revanta`.
- Через 28 дней после индексации сравнить кластеры: sports CRM, academy, facility, ticketing, website.
- KPI: показы и клики по кластерам Revanta, доля топ-10, заявки `generate_lead` по продуктам.
