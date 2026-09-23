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
    mark: `${CLIENTS}/mfk-norilsk.webp`,
    url: 'https://fcnorilsk.com',
  },
  {
    name: 'HC Avangard',
    mark: `${CLIENTS}/avangard-2026.svg`,
    url: 'https://www.hawk.ru',
  },
  {
    name: 'Shanghai Dragons',
    mark: `${CLIENTS}/shanghai-dragons-2026.webp`,
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
    name: 'FC Dynamo Moscow',
    mark: `${CLIENTS}/dinamo-mark.webp`,
    url: 'https://fcdynamo.ru',
  },
];

export interface RevantaTestimonial {
  name: string;
  role: string;
  /** Club or company mark; omitted when the only available logo has Cyrillic text. */
  logo?: string;
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
    logo: `${CLIENTS}/avangard-2026.svg`,
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
  {
    name: 'John Cushma',
    role: 'Founder, 21sports',
    logo: `${CLIENTS}/sports.webp`,
    quote:
      'We are working with The BrightByte on a sports publication website with a relatively simple tech stack and several integrations. Previous developers kept delivering an incomplete product full of bugs and did not respond when we pointed out issues. The BrightByte team has shown a high level of professionalism, a clear business process and a systematic approach at every stage. I highly recommend working with them.',
  },
  {
    name: 'Elena Andreeva',
    role: 'Chief Product Manager, Go',
    quote:
      'The team at The BrightByte helped us turn an idea into a finished product. They gave professional help at every stage and were set on getting results.',
  },
  {
    name: 'Russel Giambrone',
    role: 'Founder, TIG1 Strategies',
    logo: `${CLIENTS}/tig1.webp`,
    quote:
      'We hired The BrightByte to build PersoniWay, an AI assistant for field technicians. I was impressed with how quickly they understood our domain and got things moving. The scope was clear, the execution fast and my own involvement minimal. They worked independently, asked smart questions when needed and delivered consistently, without bloated timelines or budgets. It is rare to find a team that is both technically sharp and business-savvy. I highly recommend them.',
  },
  {
    name: 'Josh Austin',
    role: 'Director, Green Way Texas AC',
    logo: `${CLIENTS}/gw.webp`,
    quote:
      'Working with The BrightByte was a turning point for us. They built an AI assistant around our HVAC service workflows, and we cut response time in half and improved accuracy in the field. The team was reliable, sharp and proactive.',
  },
  {
    name: 'Vasiliy Vasiliev',
    role: 'CEO, IGFT',
    logo: `${CLIENTS}/oazis-pro-mark.webp`,
    quote:
      'We have worked with The BrightByte for two years, and in that time our project has grown a lot. The team pays close attention to detail: they write thorough API documentation, describe every new feature in a separate document and keep suggesting improvements. They also help us skip work we do not need when our plans go beyond what is necessary.',
  },
  {
    name: 'Alexey Sokolov',
    role: 'Founder, Grid Capital',
    logo: `${CLIENTS}/gc.webp`,
    quote:
      'Vitaliy and his team found us a technical director and audited the project in three weeks. For startups, a quick response and fast decisions matter a lot.',
  },
  {
    name: 'Dmitriy Kibkalo',
    role: 'Founder, orbita.vc venture fund',
    logo: `${CLIENTS}/orbita-dark.webp`,
    quote:
      'Vitaliy is a very driven entrepreneur and CTO. He has the breadth of experience startups need to make effective decisions quickly.',
  },
];
