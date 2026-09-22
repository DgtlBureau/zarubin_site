import {
  REVANTA_BASE,
  REVANTA_LINKEDIN,
  REVANTA_PRODUCTS,
  REVANTA_VIDEOS,
  revantaHref,
} from '@/src/data/revanta/routes';
import { RevantaPageContent } from '@/src/data/revanta/types';
import Image from 'next/image';
import Link from 'next/link';
import { ContactForm } from '../../forms/ContactForm';
import { Container } from '../../shared/Container/Container';

const H2 =
  'font-inter text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-white tablet:text-[40px]';
const EYEBROW =
  'font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-[#7C9BFF]';
const BODY = 'font-inter text-[17px] leading-[1.6] text-white/70';
const CARD = 'rounded-[16px] border border-white/10 bg-white/[0.03] p-[24px]';
const SECTION = 'py-[56px] tablet:py-[80px]';

interface Props {
  content: RevantaPageContent;
}

export const RevantaPage = ({ content }: Props) => {
  const others = REVANTA_PRODUCTS.filter((p) => p.key !== content.key);

  return (
    <div className='bg-main-bg pt-[90px] text-white'>
      {/* Hero */}
      <Container className={SECTION}>
        <nav
          aria-label='Breadcrumb'
          className='mb-[28px] font-inter text-[14px] text-white/50'
        >
          <Link href='/' className='hover:text-white'>
            The BrightByte
          </Link>
          <span className='mx-[8px]'>/</span>
          {content.key === 'hub' ? (
            <span className='text-white/80'>Revanta</span>
          ) : (
            <>
              <Link href={REVANTA_BASE} className='hover:text-white'>
                Revanta
              </Link>
              <span className='mx-[8px]'>/</span>
              <span className='text-white/80'>{content.eyebrow}</span>
            </>
          )}
        </nav>
        <div className='grid items-center gap-[40px] desktop:grid-cols-[1.05fr_1fr]'>
          <div>
            <p className={EYEBROW}>{content.eyebrow}</p>
            <h1 className='mt-[14px] font-inter text-[38px] font-semibold leading-[1.05] tracking-[-0.02em] tablet:text-[54px]'>
              {content.h1}
            </h1>
            <p className={`mt-[20px] max-w-[620px] ${BODY} tablet:text-[19px]`}>
              {content.lead}
            </p>
            <div className='mt-[32px] flex flex-wrap gap-[12px]'>
              <a
                href='#contact'
                className='rounded-[8px] bg-white px-[26px] py-[14px] font-inter text-[16px] font-semibold text-gray-900 transition-colors hover:bg-white/90'
              >
                Book a demo
              </a>
              {content.scenarios && (
                <a
                  href='#how-it-works'
                  className='rounded-[8px] border border-white/25 px-[26px] py-[14px] font-inter text-[16px] font-medium text-white transition-colors hover:bg-white/10'
                >
                  See how it works
                </a>
              )}
            </div>
          </div>
          <div className='relative aspect-[16/11] overflow-hidden rounded-[18px] border border-white/10'>
            <Image
              src={content.heroImage}
              alt={content.heroAlt}
              fill
              priority
              sizes='(min-width: 1280px) 600px, 100vw'
              className='object-cover'
            />
          </div>
        </div>
      </Container>

      {/* Audience */}
      <Container className='pb-[24px]'>
        <h2 className='font-inter text-[15px] font-semibold uppercase tracking-[0.1em] text-white/50'>
          {content.audience.heading}
        </h2>
        <ul className='mt-[16px] flex flex-wrap gap-[10px]'>
          {content.audience.items.map((item) => (
            <li
              key={item}
              className='rounded-full border border-white/15 px-[16px] py-[8px] font-inter text-[15px] text-white/80'
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>

      {/* Problem → outcome */}
      <Container className={SECTION}>
        <h2 className={H2}>{content.problem.heading}</h2>
        <div className='mt-[32px] grid gap-[16px] tablet:grid-cols-2'>
          <div className={CARD}>
            <p className='font-inter text-[14px] font-semibold uppercase tracking-[0.08em] text-white/40'>
              Today
            </p>
            <p className={`mt-[12px] ${BODY}`}>{content.problem.before}</p>
          </div>
          <div className={`${CARD} border-[#7C9BFF]/40 bg-[#7C9BFF]/[0.06]`}>
            <p className='font-inter text-[14px] font-semibold uppercase tracking-[0.08em] text-[#7C9BFF]'>
              With Revanta
            </p>
            <p className={`mt-[12px] ${BODY} text-white/85`}>
              {content.problem.after}
            </p>
          </div>
        </div>
      </Container>

      {/* Features */}
      <Container className={SECTION}>
        <h2 className={H2}>{content.features.heading}</h2>
        {content.features.intro && (
          <p className={`mt-[16px] max-w-[760px] ${BODY}`}>
            {content.features.intro}
          </p>
        )}
        <div className='mt-[36px] grid gap-[16px] tablet:grid-cols-2 desktop:grid-cols-3'>
          {content.features.items.map((f) => (
            <div key={f.title} className={CARD}>
              <h3 className='font-inter text-[20px] font-semibold leading-[1.25] text-white'>
                {f.title}
              </h3>
              <p className={`mt-[10px] ${BODY} text-[16px]`}>{f.text}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Scenarios */}
      {content.scenarios && (
        <Container id='how-it-works' className={SECTION}>
          <h2 className={H2}>{content.scenarios.heading}</h2>
          <div className='mt-[36px] grid gap-[24px] tablet:grid-cols-2'>
            {content.scenarios.items.map((s) => (
              <figure key={s.video} className={`${CARD} p-[16px]`}>
                <video
                  className='aspect-video w-full rounded-[10px] bg-black'
                  controls
                  muted
                  playsInline
                  preload='none'
                  poster={`${REVANTA_VIDEOS}/${s.video}-poster.webp`}
                >
                  <source
                    src={`${REVANTA_VIDEOS}/${s.video}.mp4`}
                    type='video/mp4'
                  />
                </video>
                <figcaption className='px-[8px] pb-[8px] pt-[16px]'>
                  <h3 className='font-inter text-[19px] font-semibold text-white'>
                    {s.title}
                  </h3>
                  <p className={`mt-[8px] ${BODY} text-[16px]`}>{s.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      )}

      {/* Facts */}
      <Container className={SECTION}>
        <h2 className={H2}>{content.facts.heading}</h2>
        <ul className='mt-[28px] grid gap-[12px] tablet:grid-cols-2'>
          {content.facts.items.map((fact) => (
            <li key={fact} className={`${CARD} flex gap-[12px] py-[18px]`}>
              <span aria-hidden className='text-[#7C9BFF]'>
                ✓
              </span>
              <span className='font-inter text-[16px] leading-[1.5] text-white/80'>
                {fact}
              </span>
            </li>
          ))}
        </ul>
      </Container>

      {/* Comparison */}
      {content.comparison && (
        <Container className={SECTION}>
          <h2 className={H2}>{content.comparison.heading}</h2>
          <p className={`mt-[16px] max-w-[760px] ${BODY}`}>
            {content.comparison.intro}
          </p>
          <div className='mt-[28px] overflow-x-auto rounded-[16px] border border-white/10'>
            <table className='w-full min-w-[640px] border-collapse text-left font-inter text-[15px]'>
              <thead>
                <tr className='border-b border-white/10 bg-white/[0.04]'>
                  <th
                    scope='col'
                    className='p-[16px] font-semibold text-white/60'
                  >
                    Job
                  </th>
                  <th
                    scope='col'
                    className='p-[16px] font-semibold text-white/60'
                  >
                    {content.comparison.competitor}
                  </th>
                  <th
                    scope='col'
                    className='p-[16px] font-semibold text-[#7C9BFF]'
                  >
                    Revanta
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.comparison.rows.map((row) => (
                  <tr
                    key={row.job}
                    className='border-b border-white/5 last:border-0'
                  >
                    <th scope='row' className='p-[16px] font-medium text-white'>
                      {row.job}
                    </th>
                    <td className='p-[16px] text-white/65'>{row.them}</td>
                    <td className='p-[16px] text-white/85'>{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {content.comparison.note && (
            <p className='mt-[14px] font-inter text-[14px] text-white/50'>
              {content.comparison.note}
            </p>
          )}
        </Container>
      )}

      {/* FAQ */}
      <Container className={SECTION}>
        <h2 className={H2}>Frequently asked questions</h2>
        <div className='mt-[28px] flex flex-col gap-[10px]'>
          {content.faq.map((item) => (
            <details key={item.question} className={`${CARD} group py-[18px]`}>
              <summary className='cursor-pointer list-none font-inter text-[18px] font-semibold text-white marker:hidden'>
                <span className='mr-[10px] inline-block text-[#7C9BFF] transition-transform group-open:rotate-45'>
                  +
                </span>
                {item.question}
              </summary>
              <p className={`mt-[12px] ${BODY} text-[16px]`}>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>

      {/* Products + articles */}
      <Container className={SECTION}>
        <h2 className={H2}>
          {content.key === 'hub'
            ? 'Revanta products'
            : 'Other Revanta products'}
        </h2>
        <div className='mt-[28px] grid gap-[16px] tablet:grid-cols-2 desktop:grid-cols-4'>
          {content.key !== 'hub' && (
            <Link
              href={REVANTA_BASE}
              className={`${CARD} group transition-colors hover:bg-white/[0.07]`}
            >
              <span className='font-inter text-[18px] font-semibold text-white group-hover:text-[#7C9BFF]'>
                Revanta platform
              </span>
              <p className='mt-[6px] font-inter text-[15px] text-white/55'>
                Sports club software for clubs, fans and venues
              </p>
            </Link>
          )}
          {others.map((p) => (
            <Link
              key={p.slug}
              href={revantaHref(p.slug)}
              className={`${CARD} group transition-colors hover:bg-white/[0.07]`}
            >
              <span className='font-inter text-[18px] font-semibold text-white group-hover:text-[#7C9BFF]'>
                {p.name}
              </span>
              <p className='mt-[6px] font-inter text-[15px] text-white/55'>
                {p.slogan}
              </p>
            </Link>
          ))}
        </div>
        <p className='mt-[28px] font-inter text-[16px] text-white/60'>
          Follow Revanta on{' '}
          <a
            href={REVANTA_LINKEDIN}
            target='_blank'
            rel='noopener noreferrer'
            className='text-white/85 underline underline-offset-4 hover:text-white'
          >
            LinkedIn
          </a>
        </p>
        {content.articles && content.articles.length > 0 && (
          <div className='mt-[40px]'>
            <h3 className='font-inter text-[15px] font-semibold uppercase tracking-[0.1em] text-white/50'>
              Further reading
            </h3>
            <ul className='mt-[14px] flex flex-col gap-[8px]'>
              {content.articles.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className='font-inter text-[17px] text-white/80 underline-offset-4 hover:text-white hover:underline'
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>

      {/* Contact */}
      <div id='contact' className='border-t border-white/10 bg-dark-blue'>
        <Container className='py-[70px] tablet:px-[40px] tablet:py-[80px]'>
          <ContactForm
            variant='glass'
            showDetails={true}
            showPrivacyCheckbox={true}
            title='See Revanta on your own data.'
            subtitle='Tell us about your club, academy or venue. We will show the part of Revanta that fits and how a rollout would go.'
            submitText='Book a demo'
          />
        </Container>
      </div>
    </div>
  );
};
