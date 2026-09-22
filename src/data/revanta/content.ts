import { REVANTA_IMAGES } from './routes';
import { RevantaPageContent } from './types';

// Copy rules: only jobs from the closed per-segment list (commercial/us-sports-outreach/offer-by-segment.md)
// and features the product demonstrably has. No invented numbers, no promises of a mobile wallet,
// card-linked offers or ready-made integrations with US ticketing/POS systems.

const hub: RevantaPageContent = {
  key: 'hub',
  seo: {
    title: 'Revanta: Software for Sports Clubs, Academies & Rinks',
    description:
      'Revanta by The BrightByte runs sports clubs, academies and rinks: registration, schedules, tickets, season passes, loyalty and facility booking.',
    keywords: [
      'sports club management software',
      'sports club software',
      'sports organization management platform',
      'sports CRM',
      'fan loyalty platform',
      'rink and arena management software',
    ],
  },
  eyebrow: 'Revanta by The BrightByte',
  h1: 'Revanta: sports club software for academies, spectator clubs and rinks',
  lead: 'Revanta is sports club software by The BrightByte — registration, ticketing, fan loyalty and facility booking for clubs, academies and rinks. One system for the people who play, the fans who watch and the facility that hosts them.',
  heroImage: `${REVANTA_IMAGES}/admin-desktop.webp`,
  heroAlt: 'Revanta admin panel with fan segments and campaign results',
  audience: {
    heading: 'Built for',
    items: [
      'Youth clubs and academies',
      'Leagues and associations',
      'Professional and semi-pro clubs',
      'College athletic programs',
      'Ice rinks and arenas',
      'Sports complexes and rec centers',
    ],
  },
  problem: {
    heading: 'One system instead of five spreadsheets',
    before:
      'Registration sits in one tool, schedules in a group chat, tickets with a third-party seller and fan emails in a newsletter service. Nobody can see the same person across them, and every report is assembled by hand.',
    after:
      'Players, parents, fans and renters live in one base. Registration, schedules, tickets, loyalty and bookings write into the same profile, so segments, campaigns and reports come out of data you already collect.',
  },
  features: {
    heading: 'Pick the module your organisation needs',
    intro:
      'Revanta is modular. Start with the job that hurts most and add the rest on the same fan and member base.',
    items: [
      {
        title: 'Sports academy and club management: Revanta SportSchool',
        text: 'Registration and fee collection, tryouts and team building, practice and game schedules, field allocation, player development and family communication.',
      },
      {
        title: 'Ticketing, season passes and fan loyalty: Revanta Loyalty',
        text: 'Tickets and season passes, a fan profile with attendance history, points and tiers, promo codes and vouchers, segments and push or email campaigns.',
      },
      {
        title: 'Rink and sports facility management: Revanta Venues',
        text: 'Season and event schedules, facility rentals confirmed in one place, public sessions sold online with QR entry, and reports on the hours your venue sits empty.',
      },
      {
        title: 'Sports club website: Revanta Sites',
        text: 'News, schedules, rosters and stats published from the same system, so the score is updated once.',
      },
      {
        title: 'Club merch store: Revanta e-com',
        text: 'A club store that sees who buys jerseys and who comes to games.',
      },
      {
        title: 'Segments and campaigns',
        text: 'Build a segment with filters, send an email or push to it, or switch on a ready trigger chain for a missed game, a birthday or expiring points.',
      },
    ],
  },
  scenarios: {
    heading: 'How it works in the admin panel',
    items: [
      {
        title: 'Segment by purchase history',
        text: 'Pick the fans who buy often and agreed to hear from you. The segment is saved and reused.',
        video: 'segment-orders',
      },
      {
        title: 'An email to one segment',
        text: 'Subject, body and recipients by saved segment. A targeted campaign in a couple of minutes, no developers.',
        video: 'email-segment',
      },
      {
        title: 'A ready chain from the template library',
        text: 'Missed game, birthday, expiring points, welcome to the program: start from a template instead of a blank page.',
        video: 'chains-template',
      },
      {
        title: 'A trigger that fires on its own',
        text: 'When a fan moves up a loyalty tier, the chain sends the email and push without anyone touching it.',
        video: 'chains',
      },
    ],
  },
  facts: {
    heading: 'Revanta at a glance',
    items: [
      'Sports club software made by The BrightByte (The BrightByte Capital LLC, USA).',
      'Five modules: SportSchool, Loyalty, Venues, Sites and e-com. Use one or all of them.',
      'One profile per person: player, parent, fan and renter are the same record.',
      'Web admin for staff, web accounts and mobile flows for members and fans.',
      'Granular permissions and an audit trail of user actions.',
      'Rollout starts in the current season, without pausing your operations.',
    ],
  },
  faq: [
    {
      question: 'What is Revanta?',
      answer:
        'Revanta is sports club management software by The BrightByte. It covers registration and schedules for clubs and academies, ticketing and fan loyalty for spectator clubs, and bookings and public sessions for rinks and arenas, all on one member and fan base.',
    },
    {
      question: 'Who is Revanta for?',
      answer:
        'Youth clubs, academies, leagues and associations; professional, semi-pro and college programs that sell tickets; and ice rinks, arenas and sports complexes that rent out time.',
    },
    {
      question: 'Do I have to buy the whole platform?',
      answer:
        'No. Revanta is modular. Most organisations start with one module, such as registration or ticketing, and add others later without moving data.',
    },
    {
      question: 'Can Revanta work with the systems we already use?',
      answer:
        'Yes, through data export and connections built during the rollout. We do not claim ready-made plug-ins for every US ticketing or POS system; if you need one, we build it as part of the project.',
    },
    {
      question: 'How long does a rollout take?',
      answer:
        'A standard SaaS setup takes about two weeks. Work starts in the current season, so you do not need to pause registration, practices or ticket sales.',
    },
    {
      question: 'How is Revanta priced?',
      answer:
        'Pricing depends on the modules and the size of your organisation. Book a demo and we will send a quote.',
    },
  ],
  articles: [
    {
      title: 'Best CRM software for sports clubs and teams',
      href: '/playbook/expertise/The-best-CRM',
    },
    {
      title: 'Sports CRM in 2026: when the database starts deciding',
      href: '/playbook/insights/sports-crm-2026-from-database-to-ai-agent',
    },
    {
      title: 'Fan data analytics: turning CRM data into revenue',
      href: '/playbook/expertise/fan-data-analytics-sports-crm',
    },
  ],
};

const sportschool: RevantaPageContent = {
  key: 'sportschool',
  seo: {
    title: 'Sports Academy Management Software | Revanta SportSchool',
    description:
      'Run registration and fees, tryouts, team formation, practice and game schedules, field allocation and player development for your club or academy.',
    keywords: [
      'sports academy management software',
      'youth sports club management software',
      'sports club registration software',
      'tryout and evaluation software',
      'practice scheduling software',
      'player development software',
      'field scheduling software',
    ],
  },
  eyebrow: 'Revanta SportSchool',
  h1: 'Sports academy and club management software, from registration to player development',
  lead: 'Revanta SportSchool keeps sign-ups, teams, schedules and every player’s progress in one place, so directors stop rebuilding the season in spreadsheets.',
  heroImage: `${REVANTA_IMAGES}/sportschool-hero.webp`,
  heroAlt: 'Youth hockey players on the ice at an academy practice',
  audience: {
    heading: 'Built for',
    items: [
      'Youth sports clubs',
      'Academies and development programs',
      'Travel and competitive teams',
      'Leagues and associations',
      'Club directors and coaching staff',
    ],
  },
  problem: {
    heading: 'Stop running the club from group chats and paper',
    before:
      'Registration comes in through forms and payment links, schedules are built by hand in group chats, attendance and training load live in a coach’s notebook, and fitness tests are written down twice a year. Team decisions are made by eye.',
    after:
      'Revanta SportSchool moves the whole cycle into one system: from registration and fees to the season plan, field time, attendance and a player card with test results. Directors see the club as a whole, families see their child’s progress, and your coaching method stays with the club.',
  },
  features: {
    heading: 'Everything a club director runs in a season',
    items: [
      {
        title: 'Registration and fee collection',
        text: 'Sign-ups and season fees land in the same place your coaches work. No exports, no chasing checks.',
      },
      {
        title: 'Tryouts, evaluations and team formation',
        text: 'Tryout scores become team rosters in one pass, and families get their offers the same day.',
      },
      {
        title: 'Practice and game scheduling',
        text: 'Build the season plan once. Practices, games and ice time follow from it, in one calendar for coaches and families.',
      },
      {
        title: 'Field and rink allocation',
        text: 'See ice, field and gym use across every team and coach, and place sessions with no double-booked fields.',
      },
      {
        title: 'Player development: season plans, practice plans and testing',
        text: 'A player’s whole history, from the first tryout to this season’s test results, stays with the club when a coach moves on.',
      },
      {
        title: 'In-house leagues and tournaments',
        text: 'Run your in-house league on the same rosters and fields your club already uses.',
      },
      {
        title: 'Finance and reporting',
        text: 'Fees, payments and season reports come from the data you already entered, not a separate spreadsheet.',
      },
      {
        title: 'Player documents and compliance',
        text: 'Every waiver and player document is attached to the player, not buried in someone’s inbox.',
      },
      {
        title: 'Family communication',
        text: 'Parents hear about changes from the system, not from a group chat: attendance, schedule updates and emails to a team or age group.',
      },
    ],
  },
  scenarios: {
    heading: 'How it works for coaches and directors',
    items: [
      {
        title: 'The annual training plan',
        text: 'Ice, dryland, strength and theory hours by month, games and testing sessions. The actual pulls in from the schedule.',
        video: 'sportschool-training-plan',
      },
      {
        title: 'Plan approval by the club director',
        text: 'The coach submits the plan, the director approves it or returns it for changes. Approved plans are locked.',
        video: 'sportschool-plan-approve',
      },
      {
        title: 'A drill with a diagram on the rink',
        text: 'Draw passes, shots and player positions right on the board and save the drill to the club library.',
        video: 'sportschool-exercise-new',
      },
      {
        title: 'Practice plans from the drill library',
        text: 'Assemble a practice from ready drills with minutes and stations, and reuse it for any team.',
        video: 'sportschool-exercise-library',
      },
      {
        title: 'Attendance in a few taps',
        text: 'Present, sick, excused or absent for every player, saved automatically, with a summary across the club.',
        video: 'sportschool-attendance',
      },
      {
        title: 'Prospects from season stats',
        text: 'Star a promising player from season stats and see attendance history and fitness tests on one card.',
        video: 'sportschool-prospect',
      },
      {
        title: 'A game card with score, video and lineup',
        text: 'Open a game from the schedule to see venue, score, game video, the lineup with stats and attendance in one place.',
        video: 'sportschool-event-card',
      },
    ],
  },
  facts: {
    heading: 'What you start measuring',
    items: [
      'Training attendance by player, team and club for any period.',
      'Squad retention: how many selected players stay to the end of the season.',
      'Player progress: the share of players who improved between testing rounds.',
      'Plan versus actual training load across the club and each team.',
      'Ice, field and gym utilisation: the share of slots taken.',
      'Rollout: data collection 5–10 days, setup 2 days, staff training 2 weeks, starting mid-season.',
    ],
  },
  comparison: {
    heading: 'Revanta SportSchool vs PlayMetrics',
    competitor: 'PlayMetrics',
    intro:
      'PlayMetrics is a strong club management platform for youth soccer and multi-sport clubs. Here is how the two compare on the jobs a club director runs.',
    rows: [
      { job: 'Registration and fees', them: 'Yes', us: 'Yes' },
      { job: 'Tryouts and team formation', them: 'Yes', us: 'Yes' },
      {
        job: 'Practice and game scheduling',
        them: 'Yes',
        us: 'Yes, with season, monthly and weekly training plans',
      },
      {
        job: 'Field allocation',
        them: 'Yes',
        us: 'Yes, for ice, fields and gyms',
      },
      {
        job: 'Player development',
        them: 'Yes',
        us: 'Player card with testing, stats, coach ratings and prospects',
      },
      {
        job: 'Drill library and practice plans',
        them: 'Limited',
        us: 'Drill diagrams on the rink or field, practice plans from the library',
      },
      {
        job: 'Ticketing and fan loyalty on the same base',
        them: 'No',
        us: 'Yes, with Revanta Loyalty',
      },
    ],
    note: 'Based on public product information as of September 2026.',
  },
  faq: [
    {
      question: 'What is Revanta SportSchool?',
      answer:
        'Revanta SportSchool is sports academy and club management software by The BrightByte. It covers registration and fees, tryouts, practice and game schedules, field allocation, player development, documents and family communication.',
    },
    {
      question: 'Which sports does it support?',
      answer:
        'It was built with hockey academies and works for any team sport with practices, games and age groups, including soccer, basketball and volleyball. Drill diagrams support rinks and fields.',
    },
    {
      question: 'Can parents register and pay online?',
      answer:
        'Yes. Families register players and pay fees online, and the club office sees payment status per player.',
    },
    {
      question: 'Can coaches track player development?',
      answer:
        'Yes. Each player has a card with attendance, fitness testing, match statistics and coach ratings, with season-over-season comparison.',
    },
    {
      question: 'Do we have to wait until the off-season to switch?',
      answer:
        'No. The rollout starts with the current season: data collection takes 5–10 days, setup 2 days and staff training about 2 weeks.',
    },
    {
      question: 'Can we run leagues and tournaments in it?',
      answer:
        'Yes. Internal leagues and tournaments use the same teams, schedules and venues as the rest of the club.',
    },
  ],
  articles: [
    {
      title: 'How AI is changing real-time coaching',
      href: '/playbook/expertise/ai-transforming-real-time-coaching',
    },
  ],
};

const loyalty: RevantaPageContent = {
  key: 'loyalty',
  seo: {
    title: 'Sports CRM, Ticketing & Fan Loyalty | Revanta Loyalty',
    description:
      'Sell tickets and season passes in your own system, see each fan’s attendance history, run a loyalty program with promo codes and export fan data.',
    keywords: [
      'sports CRM',
      'fan loyalty program software',
      'sports ticketing software',
      'season ticket software',
      'fan engagement platform',
      'ticketing for sports clubs',
      'fan data platform',
    ],
  },
  eyebrow: 'Revanta Loyalty',
  h1: 'Sports CRM with ticketing, season passes and a fan loyalty program',
  lead: 'When a third-party ticketing service sells your seats, it keeps your fans. Revanta Loyalty sells them in your system and shows you who comes, who buys and who stopped showing up.',
  heroImage: `${REVANTA_IMAGES}/loyalty-hero.webp`,
  heroAlt: 'Fans in the stands at a hockey game',
  audience: {
    heading: 'Built for',
    items: [
      'Professional and semi-pro clubs',
      'Minor league teams',
      'College athletic programs',
      'Clubs with their own arena',
      'Club marketing and ticketing teams',
    ],
  },
  problem: {
    heading: 'Know who buys, who comes and who stopped',
    before:
      'Tickets are sold through a third-party service and the fan data stays with it. The club does not know who comes to games, who has quietly stopped, or who buys merch but never buys a ticket.',
    after:
      'Revanta Loyalty sells tickets and season passes into the club’s own fan base. Every purchase, visit and reward lands on one profile, so marketing can segment, reward and win back fans with data the club owns.',
  },
  features: {
    heading: 'What the club runs in Revanta Loyalty',
    items: [
      {
        title: 'Sell tickets and season passes in your own system',
        text: 'The fan relationship starts with you, not a reseller. Every buyer lands in the club’s own base.',
      },
      {
        title: 'One fan profile with full attendance and purchase history',
        text: 'Know who came to every home game and who quietly stopped coming. A season-pass holder who skipped three games shows up in a list before renewal time, not after.',
      },
      {
        title: 'A fan loyalty program with points, tiers and achievements',
        text: 'Reward the fans who show up: points for attendance, tiers that move with each game, achievements the club designs itself.',
      },
      {
        title: 'Promo codes, gift cards and vouchers',
        text: 'Issued and redeemed in the same system that holds the fan’s profile.',
      },
      {
        title: 'Segments and personal offers',
        text: 'Build a segment of lapsed season-pass holders in a minute and send them an offer they will actually open.',
      },
      {
        title: 'Push notifications and email',
        text: 'Game-day reminders and win-streak offers go out by push and email without anyone pressing send.',
      },
      {
        title: 'Your fan data, exportable any time',
        text: 'Export any segment or the full base whenever you need it, no ticket to support.',
      },
    ],
  },
  scenarios: {
    heading: 'How it works for club marketing',
    items: [
      {
        title: 'Earning rates per tier',
        text: 'Starter, Bronze, Silver, Gold: set how many points each tier earns. The rule applies immediately.',
        video: 'loyalty-tiers',
      },
      {
        title: 'Conditions for moving up a tier',
        text: 'Ten home games, merch purchases or a season pass: pick the condition from a list and set the threshold.',
        video: 'loyalty-rules',
      },
      {
        title: 'Achievements with their own rules',
        text: 'Build an achievement for attendance, purchases or registration and set the reward in points.',
        video: 'achievements',
      },
      {
        title: 'The whole fan in one profile',
        text: 'Contacts, points, progress to the next tier, rewards and orders on one card.',
        video: 'customer-profile',
      },
      {
        title: 'From a dashboard chart to a segment',
        text: 'Click a column on the chart and land in the customer list with that filter applied.',
        video: 'dashboard-segment',
      },
      {
        title: 'A segment exported to Excel',
        text: 'A ready list for a report, a sponsor or a call round, exported from a saved segment.',
        video: 'export-segment',
      },
    ],
  },
  facts: {
    heading: 'Revanta Loyalty at a glance',
    items: [
      'Tickets, season passes, loyalty and campaigns on one fan profile.',
      'Points, tiers and achievements configured by the club, without developers.',
      'Segments by attendance, purchases, tier, age and registration source.',
      'Email and push campaigns plus trigger chains from a template library.',
      'Full data export: the fan base belongs to the club.',
      'Connections to an existing ticketing or POS system are built per project.',
    ],
  },
  comparison: {
    heading: 'Revanta Loyalty vs FanMaker',
    competitor: 'FanMaker',
    intro:
      'FanMaker is an established fan loyalty platform for NFL, NBA, NHL, MLB and college programs. Here is an honest comparison, including what Revanta does not do.',
    rows: [
      {
        job: 'Selling tickets and season passes',
        them: 'Through integrations with ticketing systems',
        us: 'Built in',
      },
      { job: 'Fan profile and attendance history', them: 'Yes', us: 'Yes' },
      { job: 'Points, tiers and achievements', them: 'Yes', us: 'Yes' },
      { job: 'Promo codes, gift cards, vouchers', them: 'Yes', us: 'Yes' },
      { job: 'Segments and personal offers', them: 'Yes', us: 'Yes' },
      { job: 'Push and email', them: 'Yes', us: 'Yes' },
      { job: 'Data export to the club', them: 'Yes', us: 'Yes' },
      { job: 'Mobile wallet with a balance', them: 'Yes', us: 'No' },
      {
        job: 'Card-linked rewards for sponsor purchases',
        them: 'Yes',
        us: 'No',
      },
      {
        job: 'Ready integrations with US ticketing and POS',
        them: 'Yes',
        us: 'Built per project',
      },
    ],
    note: 'Based on public product information as of September 2026.',
  },
  faq: [
    {
      question: 'What is Revanta Loyalty?',
      answer:
        'Revanta Loyalty is a sports CRM and fan loyalty platform by The BrightByte. Clubs sell tickets and season passes, keep each fan’s attendance and purchase history, and run points, tiers, promo codes and campaigns on that data.',
    },
    {
      question: 'Does Revanta sell tickets itself?',
      answer:
        'Yes. Tickets and season passes are sold in Revanta, so buyers land in the club’s own fan base. If you keep another ticketing system, we build the connection during the rollout.',
    },
    {
      question: 'Who owns the fan data?',
      answer:
        'The club. Any segment or the full base can be exported at any time.',
    },
    {
      question: 'Is there a mobile wallet or card-linked rewards?',
      answer:
        'Not today. Revanta does not offer a mobile wallet with a balance or card-linked sponsor rewards. If you need them, we can scope them as custom development.',
    },
    {
      question: 'Can we change loyalty rules ourselves?',
      answer:
        'Yes. Earning rates, tier conditions and achievements are configured in the admin panel and apply immediately.',
    },
    {
      question: 'Is this a sportsbook CRM?',
      answer:
        'No. Revanta Loyalty is built for clubs and their fans, not for betting operators.',
    },
  ],
  articles: [
    {
      title: 'Best CRM software for sports clubs and teams',
      href: '/playbook/expertise/The-best-CRM',
    },
    {
      title: 'How a CRM helps increase ticket sales',
      href: '/playbook/expertise/How_CRM_helps_increase_ticket',
    },
    {
      title: 'Fan data analytics: turning CRM data into revenue',
      href: '/playbook/expertise/fan-data-analytics-sports-crm',
    },
  ],
};

const venues: RevantaPageContent = {
  key: 'venues',
  seo: {
    title: 'Rink & Sports Facility Management Software | Revanta',
    description:
      'Sell public skate sessions with QR tickets, confirm ice and court rentals, run memberships and leagues, and see which hours sit empty at your rink.',
    keywords: [
      'ice rink management software',
      'sports facility management software',
      'ice facility scheduling software',
      'facility rental booking software',
      'sports facility scheduling software',
      'public skate ticketing',
      'rec center registration software',
    ],
  },
  eyebrow: 'Revanta Venues',
  h1: 'Rink and sports facility management software that fills empty hours',
  lead: 'Rentals booked in email threads and public skate sold at the door leave ice empty on weekdays. Revanta Venues puts sessions, rentals and members on one calendar.',
  heroImage: `${REVANTA_IMAGES}/arena.webp`,
  heroAlt: 'An indoor arena with fans in the stands',
  audience: {
    heading: 'Built for',
    items: [
      'Ice rinks',
      'Arenas and stadiums',
      'Sports complexes',
      'Municipal rec centers',
      'Venue and facility managers',
    ],
  },
  problem: {
    heading: 'Fill the empty hours',
    before:
      'Weekday hours stay empty, rentals are negotiated over email and text, and public skate sessions are sold at the box office. Nobody can say which hours earn money and which ones cost it.',
    after:
      'Revanta Venues puts every booking, class, league and session on one calendar. Renters confirm online, the public buys session tickets with a QR code, and the utilisation report shows where the gaps are.',
  },
  features: {
    heading: 'What a venue runs in Revanta',
    items: [
      {
        title: 'One calendar for seasons, classes and events',
        text: 'The front desk and the league director see the same ice.',
      },
      {
        title: 'Facility rentals: request, book and confirm',
        text: 'Rental requests get booked and confirmed in the system, not negotiated in email threads.',
      },
      {
        title: 'Customer registration and memberships',
        text: 'Members register once and keep one profile across every program at your facility.',
      },
      {
        title: 'Leagues at your venue',
        text: 'Build adult and youth leagues on your own ice or courts.',
      },
      {
        title: 'Public skate sessions with time slots and QR tickets',
        text: 'Skaters see how many spots are left, pay online and walk in with a QR ticket.',
      },
      {
        title: 'QR check-in at the door',
        text: 'Scan the QR at the door and know exactly who is on the ice.',
      },
      {
        title: 'Emails to the right visitors',
        text: 'Email the stick-and-puck regulars about the new Tuesday slot, not your whole list.',
      },
      {
        title: 'Utilization, revenue and idle-hours reports',
        text: 'See which weekday hours sit empty before the month is over, and fill them.',
      },
    ],
  },
  facts: {
    heading: 'Revanta Venues at a glance',
    items: [
      'One calendar for seasons, classes, rentals, leagues and events.',
      'Public sessions sold online with capacity limits and QR tickets.',
      'QR scanning at the entrance.',
      'Hour-by-hour utilisation and revenue reporting.',
      'Customers, members and renters on one profile, ready for segments and email.',
      'Works alongside Revanta SportSchool for clubs that train at the venue.',
    ],
  },
  comparison: {
    heading: 'Revanta Venues vs Dash Platform',
    competitor: 'Dash Platform',
    intro:
      'Dash is a well-known facility management platform for rinks, sports complexes and rec centers. Here is how Revanta compares.',
    rows: [
      { job: 'Season, class and event scheduling', them: 'Yes', us: 'Yes' },
      {
        job: 'Facility booking and rental confirmation',
        them: 'Yes',
        us: 'Yes',
      },
      { job: 'Customer registration and memberships', them: 'Yes', us: 'Yes' },
      { job: 'League building', them: 'Yes', us: 'Yes' },
      { job: 'Segments and email', them: 'Yes', us: 'Yes' },
      {
        job: 'Utilisation and revenue reports',
        them: 'Yes',
        us: 'Yes, hour by hour',
      },
      {
        job: 'Public sessions with time grid, capacity and QR ticket',
        them: 'Limited',
        us: 'Yes',
      },
      { job: 'QR entry control', them: 'Limited', us: 'Yes' },
    ],
    note: 'Based on public product information as of September 2026.',
  },
  faq: [
    {
      question: 'What is Revanta Venues?',
      answer:
        'Revanta Venues is booking and management software for ice rinks, arenas and sports complexes by The BrightByte. It covers schedules, rentals, memberships, leagues, public sessions with QR tickets and utilisation reports.',
    },
    {
      question: 'Can we sell public skate sessions online?',
      answer:
        'Yes. Sessions are sold on a time grid with remaining capacity, online payment and a QR ticket that is scanned at the entrance.',
    },
    {
      question: 'Can renters book ice or court time online?',
      answer:
        'Yes. Rental requests and confirmations happen in one place instead of in email and text threads.',
    },
    {
      question: 'Does it show which hours are empty?',
      answer:
        'Yes. The utilisation report breaks down each hour, so you can see where the venue is empty and price or program those slots.',
    },
    {
      question: 'Can the clubs that train at our rink use it too?',
      answer:
        'Yes. Clubs can run registration, schedules and player development in Revanta SportSchool on the same calendar.',
    },
  ],
  articles: [
    {
      title: 'Stadium management systems explained',
      href: '/playbook/expertise/stadium-management-system',
    },
  ],
};

const sites: RevantaPageContent = {
  key: 'sites',
  seo: {
    title: 'Sports Club Website Platform & CMS | Revanta Sites',
    description:
      'A sports club website fed by your club data: news, fixtures and scores, rosters and player stats, sponsors and ticket links, no developer needed.',
    keywords: [
      'sports club website builder',
      'sports club website platform',
      'team website with schedules and rosters',
      'club website CMS',
      'academy website',
    ],
  },
  eyebrow: 'Revanta Sites',
  h1: 'A sports club website platform that updates itself from your club data',
  lead: 'Publish news, schedules, scores, rosters and player stats from the same system that runs the club. Update a score once and it changes everywhere.',
  heroImage: `${REVANTA_IMAGES}/sites-hero.webp`,
  heroAlt: 'A club website match center on desktop and mobile',
  audience: {
    heading: 'Built for',
    items: [
      'Professional and semi-pro clubs',
      'Academies and youth clubs',
      'Leagues and associations',
      'Arenas and event organisers',
    ],
  },
  problem: {
    heading: 'Stop retyping the same score in five places',
    before:
      'Schedules, scores and rosters are typed into page text by hand, a developer is needed for every new section, and each team or academy ends up with its own site from its own contractor.',
    after:
      'In Revanta Sites, games, players and stats are data, not text. The website assembles them itself, the press office publishes without a developer, and every team shares one platform and one fan profile with ticketing and loyalty.',
  },
  features: {
    heading: 'What the website runs on',
    items: [
      {
        title: 'News and media published without a developer',
        text: 'A news item with a gallery, category, tags and a link to a game. Photo and video galleries in the same place.',
      },
      {
        title: 'Match center: fixtures, scores, streams and ticket links',
        text: 'Calendar, score, venue and game status, with links to the stream and to tickets as separate fields.',
      },
      {
        title: 'Rosters, staff and season player statistics',
        text: 'Players, coaching staff and roster changes through the season.',
      },
      {
        title: 'Player stats',
        text: 'Season stats for every player, including separate goaltender numbers.',
      },
      {
        title: 'Club history',
        text: 'Eras, championships and achievements, edited like any other section.',
      },
      {
        title: 'Sponsors and banners',
        text: 'Ad placements, sponsor blocks and ticket calls to action.',
      },
    ],
  },
  facts: {
    heading: 'Revanta Sites at a glance',
    items: [
      'Schedules, scores, rosters and stats are data, not text.',
      'News with galleries, tags, scheduled publishing and links to games.',
      'One platform for the first team, the academy and other teams.',
      'The same fan profile as ticketing and loyalty.',
      'Rollout: content migration 1–2 weeks, design and build 2–4 weeks, newsroom training 3 days.',
    ],
  },
  faq: [
    {
      question: 'What is Revanta Sites?',
      answer:
        'Revanta Sites is a sports club website platform by The BrightByte. News, schedules, scores, rosters and stats are managed as data and published without developers.',
    },
    {
      question: 'Can one site cover the first team and the academy?',
      answer:
        'Yes. Content is tied to a club and a team, and permissions are split by section, so several teams run on one platform.',
    },
    {
      question: 'Do we need a developer to publish?',
      answer:
        'No. The press office publishes news, galleries and schedules from the admin panel.',
    },
    {
      question: 'How long does a new website take?',
      answer:
        'Content migration takes 1–2 weeks, design and build 2–4 weeks and newsroom training about 3 days.',
    },
  ],
};

const ecom: RevantaPageContent = {
  key: 'ecom',
  seo: {
    title: 'Merch Store Platform for Sports Clubs | Revanta e-com',
    description:
      'Sell club merch online with size and color variants, orders, match-day promotions and one customer record shared with tickets and fan loyalty.',
    keywords: [
      'club merchandise store platform',
      'team store software',
      'sports merchandise ecommerce',
      'club shop platform',
    ],
  },
  eyebrow: 'Revanta e-com',
  h1: 'A merch store platform for sports clubs that knows who your fans are',
  lead: 'Sell jerseys and gear online and at the club store, and see which buyers also come to games. The store shares one fan profile with tickets and loyalty.',
  heroImage: `${REVANTA_IMAGES}/ecom-hero.webp`,
  heroAlt: 'Club merchandise store on desktop and mobile',
  audience: {
    heading: 'Built for',
    items: [
      'Professional clubs',
      'Arenas and stadiums',
      'Academies',
      'Event organisers',
    ],
  },
  problem: {
    heading: 'Merch revenue without a blind spot',
    before:
      'The store runs on a separate engine, so the club cannot see that the person buying a jersey is also a season pass holder and a newsletter subscriber.',
    after:
      'In Revanta e-com, the buyer, the ticket holder and the subscriber are one record. Marketing brings fans back with a promotion built around a specific game.',
  },
  features: {
    heading: 'What the store covers',
    items: [
      {
        title: 'Catalog and variants',
        text: 'Categories, SKUs, price and sale price, labels, and size and color variants generated from a matrix.',
      },
      {
        title: 'Stock',
        text: 'Stock per variant and hiding a product from sale with one toggle.',
      },
      {
        title: 'Orders',
        text: 'Order list and order card with status, payment and delivery method in one window.',
      },
      {
        title: 'Delivery and pickup',
        text: 'Shipping options and click-and-collect at the club store.',
      },
      {
        title: 'Promotions',
        text: 'Discounts with start and end dates, store banners and collections built around a game.',
      },
      {
        title: 'One fan profile',
        text: 'Buyer, ticket holder and subscriber are the same record across Revanta.',
      },
    ],
  },
  scenarios: {
    heading: 'How it works for the merch team',
    items: [
      {
        title: 'A nested category tree',
        text: 'Categories with images, addresses and parents. Toggles control what shows in the header and footer.',
        video: 'ecom-categories',
      },
    ],
  },
  facts: {
    heading: 'Revanta e-com at a glance',
    items: [
      'Variants generated from a size and color matrix.',
      'Stock per variant, orders and statuses in one window.',
      'Click-and-collect at the club store.',
      'Promotions tied to a specific game.',
      'Shared fan profile with tickets and loyalty.',
    ],
  },
  faq: [
    {
      question: 'What is Revanta e-com?',
      answer:
        'Revanta e-com is a club merchandise store by The BrightByte that shares one fan profile with Revanta ticketing and loyalty.',
    },
    {
      question: 'Can fans pick up orders at the club store?',
      answer: 'Yes. Click-and-collect is built in, alongside shipping options.',
    },
    {
      question: 'Which payment and shipping providers are supported?',
      answer:
        'Payment and shipping providers are connected during the rollout to match your country and existing contracts.',
    },
  ],
};

export const REVANTA_CONTENT = {
  hub,
  sportschool,
  loyalty,
  venues,
  sites,
  ecom,
} satisfies Record<string, RevantaPageContent>;
