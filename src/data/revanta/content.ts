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
      'sports management software',
      'sports registration software',
      'youth sports software',
      'sports CRM software',
      'sports complex management software',
      'ice rink management software',
      'fan engagement platform for sports teams',
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
      'Hockey clubs and academies',
      'Volleyball, soccer and baseball clubs',
      'Leagues and associations',
      'Junior, minor league and college teams',
      'Ice rinks and arenas',
      'Sports complexes and rec centers',
    ],
    tabs: [
      { tab: 'Clubs and academies', product: 'sportschool' },
      { tab: 'Spectator clubs', product: 'loyalty' },
      { tab: 'Rinks and facilities', product: 'venues' },
      { tab: 'Club website', product: 'sites' },
      { tab: 'Merch store', product: 'ecom' },
    ],
  },
  problem: {
    heading: 'One system for registration, tickets and bookings',
    before:
      'Registration sits in one tool, schedules in a group chat, tickets with a third-party seller and fan emails in a newsletter service. Nobody can see the same person across them, every report is assembled by hand, and the gaps are patched with workarounds.',
    after:
      'Players, parents, fans and renters live in one base that staff, coaches and the board all work from. Registration, schedules, tickets, loyalty and bookings write into the same profile, so segments, campaigns and reports come out of data you already collect.',
  },
  features: {
    heading: 'Pick the module your organization needs',
    intro:
      'Revanta is modular. Start with the job that hurts most and add the rest on the same fan and member base.',
    items: [
      {
        title: 'Sports academy and club management: Revanta SportSchool',
        icon: 'dumbbell',
        text: 'Registration and fee collection, tryouts and team building, practice and game schedules, field allocation, player development and family communication.',
      },
      {
        title: 'Ticketing, season passes and fan loyalty: Revanta Loyalty',
        icon: 'award',
        text: 'Tickets and season passes, a fan profile with attendance history, points and tiers, promo codes and vouchers, segments and push or email campaigns.',
      },
      {
        title: 'Rink and sports facility management: Revanta Venues',
        icon: 'building',
        text: 'Season and event schedules, facility rentals confirmed in one place, public sessions sold online with QR entry, and reports on the hours your venue sits empty.',
      },
      {
        title: 'Sports club website: Revanta Sites',
        icon: 'newspaper',
        text: 'News, schedules, rosters and stats published from the same system, so the score is updated once.',
      },
      {
        title: 'Club merch store: Revanta e-com',
        icon: 'shirt',
        text: 'A club store that sees who buys jerseys and who comes to games.',
      },
      {
        title: 'Segments and campaigns',
        icon: 'target',
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
        tag: 'Segments',
        icon: 'users',
        steps: [
          'Users → Customers',
          'The Audience segments panel',
          'Agrees to receive mailings: yes',
          'Number of orders: more than 4',
          'Apply and save the segment',
        ],
      },
      {
        title: 'An email to one segment',
        text: 'Pick the subject, body and a saved segment as recipients. The campaign takes a couple of minutes and needs no developers.',
        video: 'email-segment',
        tag: 'Campaigns',
        icon: 'mail',
        steps: [
          'Mailings → Email → Add mailing',
          'Subject and the email body',
          'Recipients: by filter preset',
          'The saved more-than-3-orders segment',
          'Create the mailing',
        ],
      },
      {
        title: 'A ready chain from the template library',
        text: 'Missed game, birthday, expiring points, welcome to the program: start from a ready template.',
        video: 'chains-template',
        tag: 'Chains',
        icon: 'workflow',
        steps: [
          'Trigger chains → From template',
          'The catalog of ready scenarios',
          'The Team win template',
          'Chain steps: pause, email, button',
          'The chain is assembled: switch it on',
        ],
      },
      {
        title: 'A trigger that fires on its own',
        text: 'When a fan moves up a loyalty tier, the chain sends the email and push without anyone touching it.',
        video: 'chains',
        tag: 'Automation',
        icon: 'zap',
        steps: [
          'Trigger chains → Create chain',
          'Trigger event: loyalty tier raised',
          'Audience: the more-than-3-orders segment',
          'Add a step: a templated email',
          'Sending time and the chain goal',
          'Save: the chain is in the list',
        ],
      },
    ],
  },
  benefits: {
    heading: 'Benefits',
    items: [
      {
        title: 'Personalization',
        text: 'Segments, offers and messages follow what each fan actually does.',
      },
      {
        title: 'Operations',
        text: 'Registration, schedules, sales and bookings are tracked in one system, so managers see the club’s operations in reports.',
      },
      {
        title: 'Result',
        text: 'Revenue and retention decisions rest on attendance and purchase data the club already collects.',
      },
    ],
  },
  facts: {
    heading: 'Revanta at a glance',
    icons: ['building', 'layers', 'user', 'mobile', 'shield', 'calendar'],
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
        'Revanta is sports club software by The BrightByte. It covers registration and schedules for clubs and academies, ticketing and fan loyalty for spectator clubs, and bookings and public sessions for rinks and arenas, all on one member and fan base.',
    },
    {
      question:
        'What is the difference between club, team and facility software?',
      answer:
        'Team apps handle one roster’s schedule and chat. Club software runs many teams: registration, fees, tryouts, field time and player development. Facility software sells time on the ice or court to outside customers. Revanta covers club and facility work in one system, with SportSchool for the club and Venues for the facility.',
    },
    {
      question: 'Which sports does Revanta support?',
      answer:
        'Revanta was built with hockey clubs, academies and rinks, and works for any team sport with practices, games and age groups, including volleyball, soccer, basketball, baseball and softball.',
    },
    {
      question: 'Do I have to buy the whole platform?',
      answer:
        'No. Revanta is modular. Most organizations start with one module, such as registration or ticketing, and add others later without moving data.',
    },
    {
      question: 'Can we move from TeamSnap, SportsEngine or spreadsheets?',
      answer:
        'Yes. Players, teams, plans and history are moved into Revanta during the rollout: data collection takes 5–10 days and setup about 2 days, and work starts in the current season.',
    },
    {
      question: 'Can Revanta work with the systems we already use?',
      answer:
        'Yes, through data export and connections built during the rollout. We do not claim ready-made plug-ins for every US ticketing or POS system; if you need one, we build it as part of the project.',
    },
    {
      question: 'How is Revanta priced?',
      answer:
        'Pricing depends on the modules and the size of your organization. Book a demo and we will send a quote.',
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
    title: 'Youth Sports Registration & Club Software | Revanta',
    description:
      'Run registration and fees, tryouts, team formation, practice and game schedules, field allocation and player development for your club or academy.',
    keywords: [
      'youth sports registration software',
      'sports registration software',
      'youth sports club management software',
      'tryout evaluation software',
      'hockey tryout software',
      'volleyball tryout software',
      'hockey practice plan software',
      'volleyball club management software',
      'soccer club management software',
      'sports academy management software',
      'player development software',
    ],
  },
  eyebrow: 'Revanta SportSchool',
  h1: 'Youth sports club and academy software, from registration and tryouts to player development',
  lead: 'Revanta SportSchool keeps sign-ups, teams, schedules and every player’s progress in one place for directors, coaches and families, so nobody rebuilds the season in spreadsheets every year.',
  heroImage: `${REVANTA_IMAGES}/sportschool-hero.webp`,
  heroAlt: 'Youth hockey players on the ice at an academy practice',
  audience: {
    heading: 'Built for',
    items: [
      'Youth hockey clubs and academies',
      'Volleyball clubs',
      'Soccer clubs',
      'Travel baseball and softball teams',
      'Leagues and associations',
      'Club directors and coaching staff',
    ],
    image: `${REVANTA_IMAGES}/sportschool-audience.webp`,
  },
  problem: {
    heading: 'Club operations in one system',
    before:
      'Registration comes in through forms and payment links, schedules are built by hand in group chats, attendance and training load live in a coach’s notebook, and fitness tests are written down twice a year. Every report is a workaround, and team decisions are made by eye.',
    after:
      'Revanta SportSchool moves the whole cycle into one system: from registration and fees to the season plan, field time, attendance and a player card with test results. Directors see the club as a whole, families see their child’s progress, and your coaching method stays with the club.',
  },
  features: {
    heading: 'Everything a club director runs in a season',
    items: [
      {
        title: 'Youth sports registration and fee collection',
        icon: 'clipboard',
        text: 'Sign-ups and season fees land in the same system your coaches work in, so the office does not export lists or chase checks.',
      },
      {
        title: 'Tryout evaluation and team formation',
        icon: 'users',
        text: 'Tryout scores become team rosters in one pass, and families get their offers the same day.',
      },
      {
        title: 'Practice and game scheduling',
        icon: 'calendar',
        text: 'Build the season plan once. Practices, games and ice time follow from it, in one calendar for coaches and families.',
      },
      {
        title: 'Field and rink allocation',
        icon: 'map',
        text: 'See ice, field and gym use across every team and coach, and place sessions with no double-booked fields.',
      },
      {
        title: 'Player development: practice plans, drills and testing',
        icon: 'trend',
        text: 'A player’s whole history, from the first tryout to this season’s test results, stays with the club when a coach moves on.',
      },
      {
        title: 'In-house leagues and tournaments',
        icon: 'trophy',
        text: 'Run your in-house league on the same rosters and fields your club already uses.',
      },
      {
        title: 'Finance and reporting',
        icon: 'wallet',
        text: 'Fees, payments and season reports come from the data your staff already entered.',
      },
      {
        title: 'Player documents and compliance',
        icon: 'file',
        text: 'Every waiver and player document is attached to the player’s card.',
      },
      {
        title: 'Family communication',
        icon: 'message',
        text: 'Parents get attendance notices, schedule updates and emails for their child’s team or age group from the system.',
      },
    ],
  },
  scenarios: {
    heading: 'How it works for coaches and directors',
    items: [
      {
        title: 'The annual training plan',
        text: 'Ice, dryland, strength and theory hours by month, games and testing sessions. The actual pulls in from the schedule.',
        video: 'sportschool-calendar-plan',
        tag: 'Season plan',
        icon: 'calendar',
        steps: [
          'Season plan → pick a team',
          'Hours by month: ice, dryland, strength, theory',
          'Games, testing and training period',
          'Save the plan',
          'Submit for approval',
        ],
      },
      {
        title: 'Plan approval by the club director',
        text: 'The coach submits the plan, the director approves it or returns it for changes. Approved plans are locked.',
        video: 'sportschool-plan-approve',
        tag: 'Approval',
        icon: 'clipboard',
        steps: [
          'Season plan → Pending approval',
          'Open the team plan',
          'Review hours, periods and notes',
          'Approve or return for rework',
        ],
      },
      {
        title: 'A drill with a diagram on the rink',
        text: 'Draw passes, shots and player positions right on the board and save the drill to the club library.',
        video: 'sportschool-exercise-new',
        tag: 'Drills',
        icon: 'map',
        steps: [
          'Documents → Drills → New drill',
          'Title and category',
          'Diagram on the board: arrow to the net, circle',
          'Description: setup and duration',
          'Add: the drill is in the library',
        ],
      },
      {
        title: 'Practice plans from the drill library',
        text: 'Assemble a practice from ready drills with minutes and stations, and reuse it for any team.',
        video: 'sportschool-training-plan',
        tag: 'Practice plans',
        icon: 'layers',
        steps: [
          'Documents → Practice plans',
          'Edit the plan',
          'Add a drill from the catalog',
          'Note: venue and duration',
        ],
      },
      {
        title: 'Attendance in a few taps',
        text: 'Present, sick, excused or absent for every player, saved automatically, with a summary across the club.',
        video: 'sportschool-attendance',
        tag: 'Attendance',
        icon: 'users',
        steps: [
          'Practices & games → club summary',
          'Filter by team and status',
          'Open a practice',
          'Mark attendance per player',
          'The list shows the updated count',
        ],
      },
      {
        title: 'Prospects from season stats',
        text: 'Star a promising player from season stats and see attendance history and fitness tests on one card.',
        video: 'sportschool-prospect',
        tag: 'Prospects',
        icon: 'trend',
        steps: [
          'Players → season stats by team',
          'Star the player as a prospect',
          'The Prospects section',
          'The card: stats, attendance, fitness tests',
        ],
      },
      {
        title: 'A game card with score, video and lineup',
        text: 'Open a game from the schedule to see venue, score, game video, the lineup with stats and attendance in one place.',
        video: 'sportschool-event-card',
        tag: 'Schedule',
        icon: 'calendar',
        steps: [
          'Schedule → pick a game',
          'Date, time and venue',
          'Open event details',
          'Score and game video',
          'Lineup, stats and attendance',
        ],
      },
    ],
  },
  facts: {
    heading: 'What you start measuring',
    items: [
      'Training attendance by player, team and club for any period.',
      'Roster retention: how many selected players stay to the end of the season.',
      'Player progress: the share of players who improved between testing rounds.',
      'Plan versus actual training load across the club and each team.',
      'Ice, field and gym utilization: the share of slots taken.',
      'Rollout: data collection 5–10 days, setup 2 days, staff training 2 weeks, starting mid-season.',
    ],
  },
  comparison: {
    heading: 'Revanta SportSchool vs PlayMetrics',
    competitor: 'PlayMetrics',
    intro:
      'PlayMetrics is a strong club management platform for youth soccer and multi-sport clubs. Here is how the two compare on the jobs a club director runs.',
    rows: [
      {
        job: 'Fitness testing with season-over-season comparison',
        them: 'Not shown on public product pages',
        us: 'Run testing mode, results on the player card',
        edge: 'us',
      },
      {
        job: 'Plan versus actual training load',
        them: 'Not shown on public product pages',
        us: 'By ice, dryland, strength and theory hours, club-wide',
        edge: 'us',
      },
      {
        job: 'Prospects list built from season stats',
        them: 'Not shown on public product pages',
        us: 'Attendance, stats and test history on one card',
        edge: 'us',
      },
      {
        job: 'Season plan',
        them: 'Season builder with phases and weekly goals',
        us: 'Hours by month per load type, submitted for director approval',
        edge: 'us',
      },
      {
        job: 'Practice plans and drill library',
        them: 'Yes',
        us: 'Yes, with drill diagrams drawn on a rink or field board',
        edge: 'us',
      },
      { job: 'Registration and fees', them: 'Yes', us: 'Yes' },
      { job: 'Tryouts and team formation', them: 'Yes', us: 'Yes' },
      { job: 'Field, rink and gym allocation', them: 'Yes', us: 'Yes' },
      { job: 'Player evaluations', them: 'Yes', us: 'Yes' },
      {
        job: 'Tickets, merch and fan loyalty on the same base',
        them: 'Not shown on public product pages',
        us: 'Yes, on the rest of the Revanta platform',
        edge: 'us',
      },
    ],
    note: 'Based on public product information as of September 2026.',
  },
  faq: [
    {
      question: 'What is Revanta SportSchool?',
      answer:
        'Revanta SportSchool is sports academy and club management software by The BrightByte. It covers registration and fees, tryouts and team formation, practice and game schedules, field and rink allocation, player development, player documents and family communication.',
    },
    {
      question: 'What is the best software for a hockey club or academy?',
      answer:
        'Look for one system that handles registration and fees, tryouts and tiering, ice time across shared rinks and player development. Revanta SportSchool was built with hockey academies: coaches draw drills on a rink diagram, plan ice, dryland and theory hours by month, and record fitness tests for every player.',
    },
    {
      question: 'Does it work for volleyball, soccer or baseball clubs?',
      answer:
        'Yes. The same registration, tryouts, schedules, court or field allocation and player cards work for any team sport with age groups and seasons. Drill diagrams support both rinks and fields.',
    },
    {
      question: 'How can a club run tryouts and team formation in one system?',
      answer:
        'Evaluations are recorded during tryouts, rosters are built from the scores, and families get their offers from the same system that later takes their registration and fees.',
    },
    {
      question: 'Can a club track player development as well as schedules?',
      answer:
        'Yes. Each player has a card with attendance, testing results, game stats and coach ratings, with season-over-season comparison and a prospects list for the coaching staff.',
    },
    {
      question:
        'How do we switch from TeamSnap, SportsEngine or spreadsheets mid-season?',
      answer:
        'The rollout starts with the current season: data collection takes 5–10 days, setup 2 days and staff training about 2 weeks. Practices and registration do not stop.',
    },
    {
      question: 'Can we run in-house leagues and tournaments?',
      answer:
        'Yes. In-house leagues and tournaments use the same teams, schedules and venues as the rest of the club.',
    },
    {
      question: 'How do parents stay informed?',
      answer:
        'Parents get attendance notifications, schedule updates and emails for their child’s team or age group from the system, so changes do not depend on a group chat.',
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
      'sports CRM software',
      'season ticket management software',
      'sports ticketing software',
      'fan loyalty programs in sports',
      'fan engagement platform for sports teams',
      'fan loyalty program software',
      'minor league fan loyalty',
      'fan data platform',
    ],
  },
  eyebrow: 'Revanta Loyalty',
  h1: 'Sports CRM with ticketing, season passes and a fan loyalty program',
  lead: 'When a third-party service sells your tickets, the fan data stays with that service. Revanta Loyalty sells tickets in your own system and shows who comes, who buys and who stopped coming.',
  heroImage: `${REVANTA_IMAGES}/loyalty-hero.webp`,
  heroAlt: 'Fans in the stands at a hockey game',
  audience: {
    heading: 'Built for',
    items: [
      'Junior and minor league hockey teams',
      'Professional and semi-pro clubs',
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
        icon: 'ticket',
        text: 'Every buyer lands in the club’s own base, so the club owns the fan relationship from the first sale.',
      },
      {
        title: 'One fan profile with full attendance and purchase history',
        icon: 'user',
        text: 'Every ticket, visit and reward lands on one profile. Know who came to every home game and who quietly stopped: a season-ticket holder who skipped three games shows up in a list before renewal time.',
      },
      {
        title: 'Points, tiers, challenges and streaks',
        icon: 'award',
        text: 'Reward the behaviors that matter: showing up, renewing, buying merch. Points for attendance, tiers that move with each game, and challenges the club builds itself, such as a reward for five home games.',
      },
      {
        title: 'Promo codes, gift cards and vouchers',
        icon: 'gift',
        text: 'Issued and redeemed in the same system that holds the fan’s profile.',
      },
      {
        title: 'Segments and personal offers',
        icon: 'target',
        text: 'Build a segment of lapsed season-pass holders in a minute and send them a personal offer.',
      },
      {
        title: 'Push notifications and email',
        icon: 'mail',
        text: 'Game-day reminders and win-streak offers go out by push and email without anyone pressing send.',
      },
      {
        title: 'Your fan data, exportable any time',
        icon: 'download',
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
        tag: 'Tiers',
        icon: 'award',
        steps: [
          'Loyalty → Loyalty program setup',
          'The Statuses tab',
          'Edit the Silver tier',
          'Earning percentage: 7% → 8%',
          'Save: the table is updated',
        ],
      },
      {
        title: 'Conditions for moving up a tier',
        text: 'Ten home games, merch purchases or a season pass: pick the condition from a list and set the threshold.',
        video: 'loyalty-rules',
        tag: 'Tiers',
        icon: 'award',
        steps: [
          'The Transition conditions tab',
          'Add entry',
          'Status: Silver',
          'Condition type: game attendance',
          'Value: ten home games',
          'Save: the rule is in the list',
        ],
      },
      {
        title: 'Achievements with their own rules',
        text: 'Build an achievement for attendance, purchases or registration and set the reward in points.',
        video: 'achievements',
        tag: 'Achievements',
        icon: 'trophy',
        steps: [
          'Loyalty → Achievements',
          'New achievement',
          'Add an earning condition',
          'Home game attendance, from N',
          'Reward in loyalty points',
          'Save: the card is live',
        ],
      },
      {
        title: 'The whole fan in one profile',
        text: 'Contacts, points, progress to the next tier, rewards and orders on one card.',
        video: 'customer-profile',
        tag: 'Fan profile',
        icon: 'user',
        steps: [
          'Users → Customers',
          'Open a customer card',
          'Loyalty program: points and tier progress',
          'Points history',
          'Achievements and orders',
        ],
      },
      {
        title: 'From a dashboard chart to a segment',
        text: 'Click a column on the chart and land in the customer list with that filter applied.',
        video: 'dashboard-segment',
        tag: 'Analytics',
        icon: 'chart',
        steps: [
          'Dashboard: the breakdown charts',
          'Click a column on the chart',
          'The customer list opens',
          'Segment applied from the dashboard',
          'Work with it or reset it',
        ],
      },
      {
        title: 'A segment exported to Excel',
        text: 'A ready list for a report, a sponsor or a call round, exported from a saved segment.',
        video: 'export-segment',
        tag: 'Export',
        icon: 'download',
        steps: [
          'Users → Filtering',
          'Saved segments',
          'Apply the segment',
          'Export: the job is queued',
          'The Export section: download the file',
        ],
      },
    ],
  },
  facts: {
    heading: 'Revanta Loyalty at a glance',
    items: [
      'Tickets, season passes, loyalty and campaigns on one fan profile.',
      'Points, tiers, challenges and streaks configured by the club, without developers.',
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
      'FanMaker is an established fan loyalty platform for NFL, NBA, NHL, MLB and college programs. Here is how the two compare on the jobs a club runs around its fans.',
    rows: [
      {
        job: 'Selling tickets and season passes',
        them: 'Through integrations with ticketing systems',
        us: 'Built in',
        edge: 'us',
      },
      {
        job: 'Email campaigns alongside push',
        them: 'Yes',
        us: 'Yes, email and push from the same segment',
      },
      {
        job: 'Trigger chains from a template library',
        them: 'Not shown on public product pages',
        us: 'Missed game, birthday, expiring points, welcome, tier raised',
        edge: 'us',
      },
      {
        job: 'Fan data exported by the club',
        them: 'Yes, transactions flow into the club’s data warehouse',
        us: 'Yes, any saved segment to Excel',
      },
      {
        job: 'Tier rules edited without developers',
        them: 'Not shown on public product pages',
        us: 'Earning rates and transition conditions in the admin panel',
        edge: 'us',
      },
      { job: 'Fan profile and attendance history', them: 'Yes', us: 'Yes' },
      { job: 'Points, tiers and achievements', them: 'Yes', us: 'Yes' },
      { job: 'Promo codes, gift cards, vouchers', them: 'Yes', us: 'Yes' },
      { job: 'Segments and personal offers', them: 'Yes', us: 'Yes' },
      { job: 'Push notifications', them: 'Yes', us: 'Yes' },
      {
        job: 'Mobile wallet with a stored balance',
        them: 'Yes',
        us: 'No, custom development if needed',
        edge: 'them',
      },
      {
        job: 'Card-linked rewards for sponsor purchases',
        them: 'Yes',
        us: 'No, custom development if needed',
        edge: 'them',
      },
      {
        job: 'Ready integrations with US ticketing and POS systems',
        them: 'Yes',
        us: 'Built per project',
        edge: 'them',
      },
      {
        job: 'Club, facility and website on the same base',
        them: 'Not shown on public product pages',
        us: 'Yes, on the rest of the Revanta platform',
        edge: 'us',
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
      question: 'Do we keep our fan data?',
      answer:
        'Yes. Tickets and season passes are sold in the club’s own system, so every buyer lands in the club’s base, and any segment or the full base can be exported at any time.',
    },
    {
      question: 'Can Revanta handle season tickets and renewals?',
      answer:
        'Yes. Season passes are sold in Revanta, and the attendance history shows which holders skipped games, so marketing can reach them before renewal time.',
    },
    {
      question: 'How do fans earn points in a team loyalty program?',
      answer:
        'The club sets the rules: points for home-game attendance, merch and ticket purchases, tiers that move with each game, and achievements for streaks. Earning rates and tier conditions change in the admin panel without developers.',
    },
    {
      question:
        'Is there a loyalty platform for junior and minor league hockey teams?',
      answer:
        'Yes. Revanta Loyalty suits junior, minor league and college teams that sell home-game tickets themselves: tickets, season passes, loyalty and merch run in one system, so a small team does not need integrations to start a program.',
    },
    {
      question: 'Does Revanta integrate with Ticketmaster or our POS?',
      answer:
        'Not out of the box. Revanta sells tickets and season passes itself. If you keep another ticketing or POS system, we build that connection as part of the rollout.',
    },
    {
      question: 'Is there a mobile wallet or card-linked rewards?',
      answer:
        'Not today. Revanta does not offer a mobile wallet with a balance or card-linked sponsor rewards. If you need them, we can scope them as custom development.',
    },
    {
      question: 'Is this a sportsbook CRM?',
      answer: 'No. Revanta Loyalty is built for sports clubs and their fans.',
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
    title: 'Ice Rink & Sports Facility Management Software | Revanta',
    description:
      'Sell public skate sessions with QR tickets, confirm ice and court rentals, run memberships and leagues, and see which hours sit empty at your rink.',
    keywords: [
      'ice rink management software',
      'ice rink scheduling software',
      'arena management software',
      'sports complex management software',
      'sports facility management software',
      'facility rental software',
      'facility reservation software',
      'public skate and stick and puck booking',
    ],
  },
  eyebrow: 'Revanta Venues',
  h1: 'Ice rink and sports facility management software that fills empty hours',
  lead: 'Rentals booked in email threads and public skate sold at the door leave ice empty on weekdays. Revanta Venues puts sessions, rentals and members on one calendar, so the hours you already own start earning.',
  heroImage: `${REVANTA_IMAGES}/arena.webp`,
  heroAlt: 'An indoor arena with fans in the stands',
  audience: {
    heading: 'Built for',
    items: [
      'Ice rinks and hockey arenas',
      'Multi-sheet ice facilities',
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
      'Revanta Venues puts every booking, class, league and session on one calendar. Renters confirm online, the public buys session tickets with a QR code, and the utilization report shows where the gaps are, so staff sell more hours and spend less time on the phone.',
  },
  features: {
    heading: 'What a venue runs in Revanta',
    items: [
      {
        title: 'One calendar for seasons, classes and events',
        icon: 'calendar',
        text: 'The front desk and the league director see the same ice.',
      },
      {
        title: 'Facility rentals: request, book and confirm',
        icon: 'clipboard',
        text: 'Renters send a request, and staff book and confirm it in the system.',
      },
      {
        title: 'Customer registration and memberships',
        icon: 'users',
        text: 'Members register once and keep one profile across every program at your facility.',
      },
      {
        title: 'Leagues at your venue',
        icon: 'trophy',
        text: 'Build adult and youth leagues on your own ice or courts.',
      },
      {
        title: 'Public skate sessions with time slots and QR tickets',
        icon: 'ticket',
        text: 'Skaters see how many spots are left, pay online and walk in with a QR ticket.',
      },
      {
        title: 'QR check-in at the door',
        icon: 'qr',
        text: 'Scan the QR at the door and know exactly who is on the ice.',
      },
      {
        title: 'The right offer at the right moment',
        icon: 'mail',
        text: 'Send the new Tuesday slot only to the stick-and-puck regulars.',
      },
      {
        title: 'Utilization, revenue and idle-hours reports',
        icon: 'chart',
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
      'Hour-by-hour utilization and revenue reporting: which hours earn and which sit empty.',
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
      {
        job: 'Public sessions sold online with a time grid and capacity',
        them: 'Not shown on public product pages',
        us: 'Yes, remaining spots visible to the skater',
        edge: 'us',
      },
      {
        job: 'QR ticket and scanning at the entrance',
        them: 'Not shown on public product pages',
        us: 'Yes',
        edge: 'us',
      },
      {
        job: 'Idle hours report, hour by hour',
        them: 'Not shown on public product pages',
        us: 'Yes, which weekday hours sit empty',
        edge: 'us',
      },
      { job: 'Season, class and event scheduling', them: 'Yes', us: 'Yes' },
      {
        job: 'Facility booking and rental confirmation',
        them: 'Yes',
        us: 'Yes',
      },
      { job: 'Customer registration and memberships', them: 'Yes', us: 'Yes' },
      { job: 'League building', them: 'Yes', us: 'Yes' },
      { job: 'Segments and email', them: 'Yes', us: 'Yes' },
      { job: 'Revenue and utilization reporting', them: 'Yes', us: 'Yes' },
      {
        job: 'Tickets, fan loyalty and club management on the same base',
        them: 'Not shown on public product pages',
        us: 'Yes, on the rest of the Revanta platform',
        edge: 'us',
      },
    ],
    note: 'Based on public product information as of September 2026.',
  },
  faq: [
    {
      question: 'What is ice rink management software?',
      answer:
        'It is software that runs a rink’s calendar and sales: ice rentals, public skate and stick and puck sessions, memberships, leagues and reports. Revanta Venues does this for ice rinks, arenas and sports complexes.',
    },
    {
      question: 'Can skaters book public skate or stick and puck online?',
      answer:
        'Yes. Sessions are sold on a time grid with remaining capacity, online payment and a QR ticket that is scanned at the entrance.',
    },
    {
      question: 'How do we fill empty ice time?',
      answer:
        'The utilization report breaks down each hour, so you can see which weekday slots sit empty, then program them as public sessions or offer them to renters and email the right group of customers.',
    },
    {
      question: 'Can renters book ice or court time online?',
      answer:
        'Yes. Renters send requests and receive confirmations in the system.',
    },
    {
      question: 'Does it handle several sheets of ice or courts?',
      answer:
        'Yes. Seasons, classes, rentals, leagues and events for the whole facility sit on one calendar, so the front desk and the league director see the same schedule.',
    },
    {
      question: 'Can the clubs that train at our rink use it too?',
      answer:
        'Yes. Clubs can run registration, schedules and player development in Revanta SportSchool on the same calendar.',
    },
    {
      question: 'How long does it take to switch rink software?',
      answer:
        'A standard setup takes about two weeks, and work starts in the current season without closing bookings.',
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
    title: 'Sports Club Website Builder with Live Data | Revanta Sites',
    description:
      'A sports club website fed by your club data: news, schedules and scores, rosters and player stats, sponsors and ticket links, no developer needed.',
    keywords: [
      'sports club website builder',
      'youth sports website builder',
      'sports team website',
      'sports club website design',
      'club website with schedules and rosters',
    ],
  },
  eyebrow: 'Revanta Sites',
  h1: 'A sports club website builder that updates itself from your club data',
  lead: 'Publish news, schedules, scores, rosters and player stats from the same system that runs the club. Update a score once and it changes everywhere.',
  heroImage: `${REVANTA_IMAGES}/sites-hero.webp`,
  heroAlt: 'A club website game center on desktop and mobile',
  audience: {
    heading: 'Built for',
    items: [
      'Professional and semi-pro clubs',
      'Academies and youth clubs',
      'Leagues and associations',
      'Arenas and event organizers',
    ],
    image: `${REVANTA_IMAGES}/sites-audience.webp`,
  },
  problem: {
    heading: 'Update each score in one place',
    before:
      'Schedules, scores and rosters are typed into page text by hand, a developer is needed for every new section, and each team or academy ends up with its own site from its own contractor.',
    after:
      'In Revanta Sites, games, players and stats are stored as data. The website assembles them itself, the comms team publishes without a developer, and every team shares one platform and one fan profile with ticketing and loyalty.',
  },
  features: {
    heading: 'What the website runs on',
    items: [
      {
        title: 'News and media published without a developer',
        icon: 'newspaper',
        text: 'A news item with a gallery, category, tags and a link to a game. Photo and video galleries in the same place.',
      },
      {
        title: 'Game center: schedule, scores, streams and ticket links',
        icon: 'calendar',
        text: 'Calendar, score, venue and game status, with links to the stream and to tickets as separate fields.',
      },
      {
        title: 'Rosters, staff and season player statistics',
        icon: 'users',
        text: 'Players, coaching staff and roster changes through the season.',
      },
      {
        title: 'Player stats',
        icon: 'chart',
        text: 'Season stats for every player, including separate goaltender numbers.',
      },
      {
        title: 'Club history',
        icon: 'history',
        text: 'Eras, championships and achievements, edited like any other section.',
      },
      {
        title: 'Sponsors and banners',
        icon: 'megaphone',
        text: 'Ad placements, sponsor blocks and ticket calls to action.',
      },
    ],
  },
  scenarios: {
    heading: 'How it works in the admin panel',
    items: [
      {
        title: 'Roster pulled from the league registry',
        text: 'The roster is not typed in by hand: players come from the league registry with one button, and a repeat run updates the official fields without touching club data.',
        video: 'sites-khl',
        tag: 'Roster',
        icon: 'users',
        steps: [
          'Site → Players',
          'Sync with the league',
          'The roster is pulled from the registry',
          'Extend the card with club data',
          'A repeat run updates the official fields',
        ],
      },
    ],
  },
  facts: {
    heading: 'Revanta Sites at a glance',
    items: [
      'Schedules, scores, rosters and stats are stored as data.',
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
      question:
        'How do schedules and teams show on the club website automatically?',
      answer:
        'Games, rosters and stats live in Revanta as data, and the website pages read them directly. A score updated once shows everywhere.',
    },
    {
      question: 'Should we use Wix or a sports-specific website builder?',
      answer:
        'A general builder is fine for a static page. A club with several teams, schedules, rosters and sponsors saves work with a sports platform that stores that content as data.',
    },
    {
      question: 'Can one site cover several teams and the academy?',
      answer:
        'Yes. Content is tied to a club and a team, and permissions are split by section, so several teams run on one platform.',
    },
    {
      question: 'How do we promote sponsors on the club website?',
      answer:
        'Revanta Sites has ad placements and sponsor blocks that the club manages from the admin panel.',
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
      'Sell club merch online with size and color variants, orders, game-day promotions and one customer record shared with tickets and fan loyalty.',
    keywords: [
      'club merchandise store platform',
      'team store software',
      'sports merchandise ecommerce',
      'club shop platform',
    ],
  },
  eyebrow: 'Revanta e-com',
  h1: 'A merch store platform for sports clubs that knows who your fans are',
  lead: 'Sell jerseys and gear online and at the club store, and stop guessing who the buyer is: the store shares one fan profile with tickets and loyalty, so a jersey sale and a season ticket belong to the same person.',
  heroImage: `${REVANTA_IMAGES}/ecom-hero.webp`,
  heroAlt: 'Club merchandise store on desktop and mobile',
  audience: {
    heading: 'Built for',
    items: [
      'Professional clubs',
      'Arenas and stadiums',
      'Academies',
      'Event organizers',
    ],
  },
  problem: {
    heading: 'Merch sales linked to the fan profile',
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
        icon: 'tag',
        text: 'Categories, SKUs, price and sale price, labels, and size and color variants generated from a matrix.',
      },
      {
        title: 'Stock',
        icon: 'package',
        text: 'Stock per variant and hiding a product from sale with one toggle.',
      },
      {
        title: 'Orders',
        icon: 'clipboard',
        text: 'Order list and order card with status, payment and delivery method in one window.',
      },
      {
        title: 'Delivery and pickup',
        icon: 'truck',
        text: 'Shipping options and click-and-collect at the club store.',
      },
      {
        title: 'Promotions',
        icon: 'gift',
        text: 'Discounts with start and end dates, store banners and collections built around a game.',
      },
      {
        title: 'One fan profile',
        icon: 'user',
        text: 'Buyer, ticket holder and subscriber are the same record across Revanta.',
      },
    ],
  },
  scenarios: {
    heading: 'How it works for the merch team',
    items: [
      {
        title: 'A new product with a size matrix',
        text: 'A position is created once: the basics, SKU and VAT rate, category and images. Sizes and colours are not entered one by one — variants are generated from a matrix, each with its own price and stock.',
        video: 'ecom-product',
        tag: 'Catalog',
        icon: 'tag',
        steps: [
          'Store → Products → New product',
          'Name, SKU, description, VAT rate',
          'Category, Bestseller or Sale label, images',
          'Product variants: generated from a matrix',
          'Price, old price and stock per variant',
        ],
      },
      {
        title: 'From an order to a shipment',
        text: 'A summary by status and revenue for the period on top, the orders below: customer, delivery method, total and date. The status changes straight from the list.',
        video: 'ecom-delivery',
        tag: 'Delivery',
        icon: 'truck',
        steps: [
          'Store → Orders',
          'Summary by status and revenue for the period',
          'Filter by status, delivery and dates',
          'Open an order — contents, customer, payment',
          'Change status straight from the list',
        ],
      },
      {
        title: 'Orders with filters by status and delivery',
        text: 'Total orders, revenue and average check on top; below the list with filters by status, product type, delivery method and promo code.',
        video: 'ecom-orders',
        tag: 'Orders',
        icon: 'clipboard',
        steps: [
          'Store → Orders',
          'Summary: orders, revenue, average check',
          'Filter by status and product type',
          'Filter by delivery method and promo code',
          'Open an order from the list',
        ],
      },
      {
        title: 'A nested category tree',
        text: 'Categories with images, addresses and parents. Toggles control what shows in the header and footer.',
        video: 'ecom-categories',
        tag: 'Categories',
        icon: 'layers',
        steps: [
          'Store → Categories',
          'Add a category or edit an existing one',
          'Image, name, address, parent category',
          'Active flag',
          'Shown in the header and footer, set by toggles',
        ],
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
