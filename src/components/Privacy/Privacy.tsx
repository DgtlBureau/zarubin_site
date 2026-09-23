import { BASE_URL } from '@/src/utils/alias';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Section } from '../shared/Section/Section';
import styles from './Privacy.module.css';

const COMPANY = 'The BrightByte Capital LLC';
const CONTACT_EMAIL = 'access@thebrightbyte.com';
const EFFECTIVE_DATE = 'September 22, 2026';

const Email = () => (
  <a className={styles.link} href={`mailto:${CONTACT_EMAIL}`}>
    {CONTACT_EMAIL}
  </a>
);

const Site = () => (
  <Link className={styles.link} href='/'>
    {BASE_URL}
  </Link>
);

type PolicySection = {
  title: string;
  paragraphs?: ReactNode[];
  items?: ReactNode[];
  after?: ReactNode[];
};

const sections: PolicySection[] = [
  {
    title: '1. Who we are',
    paragraphs: [
      <>
        This Privacy Policy explains how {COMPANY}, a Wyoming limited liability
        company (&quot;BrightByte&quot;, &quot;we&quot;, &quot;us&quot;,
        &quot;our&quot;), collects, uses and shares personal information when
        you visit <Site /> and its subpages, including the Revanta product pages
        (the &quot;Site&quot;), or contact us.
      </>,
      <>
        This policy covers the Site only. Personal data processed inside
        software we build or operate for clients is governed by the agreement
        with that client, where we act as a service provider (processor).
      </>,
    ],
  },
  {
    title: '2. Information we collect',
    paragraphs: ['Information you give us:'],
    items: [
      'Contact details you submit through forms, chat or email: name, email address, phone number, company, job title and messaging handles.',
      'The content of your message: project details, briefs, files and any other information you choose to share.',
      'Job application details you send us: résumé, portfolio links and related information.',
    ],
    after: [
      'Information collected automatically: pages visited, referring page and campaign (UTM) parameters, country, device and browser type, and actions such as submitting a form. We collect this with Umami, which does not use cookies and does not store IP addresses. If you accept cookies, Google Analytics also collects similar usage data.',
      'We do not knowingly collect sensitive personal information (such as government ID numbers, financial account details, health data or precise geolocation) through the Site. Please do not send it to us.',
    ],
  },
  {
    title: '3. How we use information',
    items: [
      'To respond to your inquiry, prepare proposals and provide the services you request.',
      'To send you information about our services, if you asked for it. You can opt out at any time.',
      'To evaluate job applications.',
      'To understand how the Site is used and improve its content and performance.',
      'To keep the Site secure, prevent abuse and comply with legal obligations.',
    ],
    after: ['We do not use your information for automated decisions that have legal or similarly significant effects on you.'],
  },
  {
    title: '4. Cookies and analytics',
    paragraphs: [
      'We use Umami for basic, cookieless traffic measurement; it does not set cookies or identify you across sites. When you first visit, we ask for your consent before loading cookie-based analytics. If you click Accept, we also load Google Analytics 4. If you click Decline, no analytics cookies are set. The Site stores your choice in your browser; you can reset it by clearing site data.',
      <>
        Google processes this data under its own terms. You can learn more at{' '}
        <a
          className={styles.link}
          href='https://policies.google.com/technologies/partner-sites'
          target='_blank'
          rel='noopener noreferrer'
        >
          policies.google.com/technologies/partner-sites
        </a>{' '}
        and opt out with the{' '}
        <a
          className={styles.link}
          href='https://tools.google.com/dlpage/gaoptout'
          target='_blank'
          rel='noopener noreferrer'
        >
          Google Analytics opt-out add-on
        </a>
        .
      </>,
    ],
  },
  {
    title: '5. How we share information',
    paragraphs: [
      'We do not sell your personal information and we do not share it for cross-context behavioral advertising. We share it only with:',
    ],
    items: [
      'Service providers that help us run the Site and our business: hosting (GitHub Pages and Cloudflare), analytics (Umami and Google Analytics), website chat (Re:plain), internal messaging used to route form submissions (Telegram) and email. They may use the data only to provide their services to us.',
      'Professional advisers, such as lawyers and accountants, under confidentiality obligations.',
      'Authorities or other parties when required by law, or to protect our rights, users or the public.',
      'A buyer or successor in a merger, acquisition or sale of assets, subject to this policy.',
    ],
  },
  {
    title: '6. Data retention',
    paragraphs: [
      'We keep inquiry and correspondence data for as long as needed to respond and maintain our business relationship, and generally no longer than 3 years after our last contact, unless a longer period is required by law or a contract. Job application data is kept for up to 2 years. Analytics data is retained according to our Google Analytics settings (14 months).',
    ],
  },
  {
    title: '7. Security',
    paragraphs: [
      'We use reasonable administrative, technical and organizational safeguards, including encryption in transit and access controls, to protect personal information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    title: '8. Your privacy rights',
    paragraphs: [
      'Depending on where you live, including California and other U.S. states with consumer privacy laws, and the EU, UK or Switzerland, you may have the right to:',
    ],
    items: [
      'know what personal information we hold about you and receive a copy;',
      'correct inaccurate information;',
      'delete your information;',
      'opt out of marketing communications, and of any sale or sharing of personal information (we do neither);',
      'object to or restrict certain processing, and withdraw consent at any time;',
      'not be discriminated against for exercising these rights.',
    ],
    after: [
      <>
        To make a request, email <Email /> with the subject &quot;Privacy
        request&quot;. We will verify your request and respond within 45 days.
        You may use an authorized agent. If we deny your request, you may appeal
        by replying to our decision. EU and UK residents may also complain to
        their local data protection authority.
      </>,
      'We honor Global Privacy Control (GPC) signals as an opt-out of sale and sharing. We do not respond to Do Not Track signals because there is no common standard for them.',
    ],
  },
  {
    title: '9. International visitors',
    paragraphs: [
      'We are based in the United States and our service providers may process data in the United States and other countries. Where EU or UK law applies, we rely on your consent, our legitimate interest in responding to business inquiries, or steps taken at your request before entering into a contract, and on appropriate safeguards such as Standard Contractual Clauses for transfers.',
    ],
  },
  {
    title: "10. Children's privacy",
    paragraphs: [
      'The Site is intended for business users and is not directed to children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact us and we will delete it.',
    ],
  },
  {
    title: '11. Third-party links',
    paragraphs: [
      'The Site may link to third-party websites. We are not responsible for their privacy practices; please review their policies.',
    ],
  },
  {
    title: '12. Changes to this policy',
    paragraphs: [
      <>
        We may update this policy from time to time. The current version is
        always available at{' '}
        <Link className={styles.link} href='/policy'>
          {`${BASE_URL}/policy`}
        </Link>
        , with the effective date shown below. Material changes will be
        highlighted on the Site.
      </>,
    ],
  },
  {
    title: '13. Contact us',
    paragraphs: [
      <>
        {COMPANY}, Wyoming, United States. Email: <Email />
      </>,
    ],
  },
];

export const Privacy = () => {
  return (
    <Section light>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.description}>Effective date: {EFFECTIVE_DATE}</p>
        <ul className={styles.list}>
          {sections.map(({ title, paragraphs, items, after }) => (
            <li key={title} className={styles.item}>
              <h2 className={styles.listTitle}>{title}</h2>
              {paragraphs?.map((text, i) => (
                <p key={i} className={styles.description}>
                  {text}
                </p>
              ))}
              {items && (
                <ul className={styles.subList}>
                  {items.map((text, i) => (
                    <li key={i} className={styles.item}>
                      <p className={styles.description}>– {text}</p>
                    </li>
                  ))}
                </ul>
              )}
              {after?.map((text, i) => (
                <p key={i} className={styles.description}>
                  {text}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
