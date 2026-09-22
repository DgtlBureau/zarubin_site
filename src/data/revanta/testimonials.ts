// Club logos for the Revanta marquee and translated client testimonials.
// Source: the Russian originals on digitalburo.tech (FeedbackData ids 11, 12, 7, 8, 9).

const CLIENTS = '/assets/images/revanta/clients';

export interface RevantaClientLogo {
  name: string;
  mark: string;
  url?: string;
}

export const REVANTA_CLIENT_LOGOS: RevantaClientLogo[] = [
  {
    name: 'HC Norilsk',
    mark: `${CLIENTS}/norilsk-mark.webp`,
    url: 'https://hcnorilsk.com',
  },
  {
    name: 'Norilsk Futsal Club',
    mark: `${CLIENTS}/mfk-norilsk-mark.webp`,
    url: 'https://fcnorilsk.com',
  },
  {
    name: 'HC Avangard',
    mark: `${CLIENTS}/avangard-mark.webp`,
    url: 'https://www.hawk.ru',
  },
  {
    name: 'Shanghai Dragons',
    mark: `${CLIENTS}/shanghai-dragons.webp`,
    url: 'https://hc-dragons.com',
  },
  {
    name: 'HC Torpedo',
    mark: `${CLIENTS}/torpedo-mark.webp`,
    url: 'https://hctorpedo.ru',
  },
  {
    name: 'HC Admiral',
    mark: `${CLIENTS}/admiral-mark.webp`,
    url: 'https://hcadmiral.pro',
  },
  {
    name: 'BC Tver',
    mark: `${CLIENTS}/tver.webp`,
    url: 'https://tverbasket.ru/basketball-club-tver/',
  },
  {
    name: 'FC Dynamo Moscow',
    mark: `${CLIENTS}/dinamo-mark.webp`,
    url: 'https://fcdynamo.ru',
  },
];

export interface RevantaTestimonial {
  name: string;
  role: string;
  logo: string;
  quote: string;
}

export const REVANTA_TESTIMONIALS: RevantaTestimonial[] = [
  {
    name: 'Kirill Tsai',
    role: 'Head of Marketing, Norilsk Sports Club',
    logo: `${CLIENTS}/norilsk-mark.webp`,
    quote:
      'We have worked with The BrightByte since the club’s first days. The team proposed one backend for the websites of our hockey and futsal clubs, and today a single staff member runs both sites, even with a large volume of updates. We are now moving to their sports CRM. For us they have become a technology partner.',
  },
  {
    name: 'Alexander Sarkisov',
    role: 'Commercial Director, HC Admiral',
    logo: `${CLIENTS}/admiral-mark.webp`,
    quote:
      'This is our second season with The BrightByte. In the first year the company fully earned our trust: they improved the club’s digital platforms quickly and on their own initiative. The team’s expertise, how fast they handle requests and their wish to help the club grow are what we value in a long-term partnership.',
  },
  {
    name: 'Sergey Yakushevsky',
    role: 'Commercial Director, HC Traktor',
    logo: `${CLIENTS}/tractor-mark.webp`,
    quote:
      'Our market is very conservative, and it is great to see young, energetic people like Vitaliy and his team come into it and shake things up. Their solution helped us automate our processes and gave us fresh ideas on how to grow the brand and engage fans.',
  },
  {
    name: 'Konstantin Klyushev',
    role: 'Commercial Director, HC Avangard',
    logo: `${CLIENTS}/avangard-mark.webp`,
    quote:
      'Vitaliy always takes a proactive position. He helped the company a great deal in moving from offline to online, and he brought expertise from other industries into sport and made the most of it.',
  },
  {
    name: 'Vitaliy Pozdnev',
    role: 'IT Director, FC Dynamo Moscow',
    logo: `${CLIENTS}/dinamo-mark.webp`,
    quote:
      'We are developing a hockey club project, handling design and support. When I hand a task to Vitaliy’s team, I am fully confident in the result. The team is genuinely engaged and brings its own view to the work. Many contractors need a detailed specification; Vitaliy’s team runs the project on its own and defines its scope itself.',
  },
];
