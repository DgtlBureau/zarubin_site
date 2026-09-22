'use client';

import { cn } from '@/src/lib/utils';
import { sendEmail } from '@/src/utils/sendEmail';
import Link from 'next/link';
import { useState } from 'react';

// Short lead form: name, work email and two consents. Delivery is the same as
// the full ContactForm: an email via /api/send and a Telegram message via /api/telegram.

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  submitText?: string;
  titleAs?: 'h2' | 'h3';
  className?: string;
}

type Status =
  | { state: 'idle' }
  | { state: 'sending' }
  | { state: 'success' }
  | { state: 'error' };

const FIELD =
  'w-full rounded-none border-b border-white/25 bg-transparent pb-3 font-inter text-base text-white outline-none transition-colors placeholder:text-white/50 focus:border-white mobile-big:text-xl';

const CHECKBOX =
  'mt-[3px] h-[18px] w-[18px] shrink-0 cursor-pointer rounded-[4px] border border-white/60 bg-white/10 accent-white';

export const LeadForm = ({
  title = 'Fill in the form and we will get back to you',
  subtitle = 'Leave your name and email, and we will contact you to discuss the task.',
  submitText = 'Send',
  titleAs: TitleTag = 'h2',
  className,
}: LeadFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot, humans never see it
  const [privacy, setPrivacy] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (company) {
      setStatus({ state: 'success' });
      return;
    }
    setStatus({ state: 'sending' });

    try {
      await sendEmail(name, email);

      const message = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Newsletter: ${newsletter ? 'yes' : 'no'}`,
        `Page: ${window.location.pathname}`,
      ].join('\n');

      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error(`Telegram request failed: ${res.status}`);

      setName('');
      setEmail('');
      setPrivacy(true);
      setNewsletter(true);
      setStatus({ state: 'success' });
    } catch (error) {
      console.error('Lead form submission error:', error);
      setStatus({ state: 'error' });
    }
  };

  const sending = status.state === 'sending';

  return (
    <div
      id='contact-form'
      className={cn('w-full scroll-mt-[100px]', className)}
    >
      <TitleTag className='font-inter text-[27px] font-light leading-[1.25] text-white tablet:text-[36px] desktop:text-[45px] desktop:leading-[1.15]'>
        {title}
      </TitleTag>
      <p className='mt-[12px] font-inter text-[17px] leading-[1.5] text-white/70 tablet:text-[19px]'>
        {subtitle}
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-[32px] grid grid-cols-1 gap-x-[40px] gap-y-[28px] tablet:mt-[48px] tablet:grid-cols-2'
      >
        <div
          className='absolute left-[-9999px] top-auto h-px w-px overflow-hidden'
          aria-hidden='true'
        >
          <label htmlFor='lead-form-company'>Leave this field empty</label>
          <input
            id='lead-form-company'
            type='text'
            name='company'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            tabIndex={-1}
            autoComplete='off'
          />
        </div>

        <label className='sr-only' htmlFor='lead-form-name'>
          Full name
        </label>
        <input
          id='lead-form-name'
          type='text'
          name='name'
          autoComplete='name'
          placeholder='Full name *'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={FIELD}
          required
        />

        <label className='sr-only' htmlFor='lead-form-email'>
          Work email
        </label>
        <input
          id='lead-form-email'
          type='email'
          name='email'
          autoComplete='email'
          placeholder='Work email *'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={FIELD}
          required
        />

        <div className='flex flex-col gap-[18px] tablet:col-span-2'>
          <label className='flex w-fit items-start gap-[12px] font-inter text-[16px] text-white tablet:text-[17px]'>
            <input
              type='checkbox'
              checked={privacy}
              onChange={(e) => setPrivacy(e.target.checked)}
              className={CHECKBOX}
              required
            />
            <span>
              I agree to the{' '}
              <Link
                href='/policy'
                target='_blank'
                className='text-white/70 underline-offset-2 hover:text-white hover:underline'
              >
                processing of my personal data
              </Link>{' '}
              in accordance with the Privacy Policy
            </span>
          </label>
          <label className='flex w-fit items-start gap-[12px] font-inter text-[16px] text-white tablet:text-[17px]'>
            <input
              type='checkbox'
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className={CHECKBOX}
            />
            <span>
              I agree to receive{' '}
              <span className='text-white/70'>
                newsletters and other communications
              </span>{' '}
              from The BrightByte
            </span>
          </label>
        </div>

        <div className='flex flex-col gap-[14px] tablet:col-span-2 tablet:flex-row tablet:items-center'>
          <button
            type='submit'
            disabled={!privacy || sending}
            className='w-fit rounded-full border border-white/70 px-[40px] py-[14px] font-inter text-[16px] font-medium text-white transition-colors hover:bg-white hover:text-[#0c1f5a] disabled:cursor-not-allowed disabled:opacity-50'
          >
            {sending ? 'Sending…' : submitText}
          </button>
          <p aria-live='polite' className='font-inter text-[15px]'>
            {status.state === 'success' && (
              <span className='text-white'>
                Thank you. We will contact you shortly.
              </span>
            )}
            {status.state === 'error' && (
              <span className='text-[#ffb4a8]'>
                Could not send the form. Please email us at
                access@thebrightbyte.com.
              </span>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

/** The lead form on the navy gradient card. */
export const LeadFormCard = (props: LeadFormProps) => (
  <div
    className='relative w-full overflow-hidden rounded-[24px] shadow-[0_30px_80px_-50px_rgba(1,18,57,0.6)] desktop:mx-auto desktop:max-w-[1400px]'
    style={{
      background: 'linear-gradient(160deg,#12296b 0%,#0c1f5a 55%,#081640 100%)',
    }}
  >
    <div
      aria-hidden='true'
      className='pointer-events-none absolute inset-0'
      style={{
        background:
          'radial-gradient(45% 60% at 8% 30%, rgba(90,130,230,0.35), transparent 70%)',
      }}
    />
    <div className='relative px-[20px] py-[40px] mobile-big:px-[40px] tablet:px-[48px] tablet:py-[56px] desktop:px-[72px] desktop:py-[72px]'>
      <LeadForm {...props} />
    </div>
  </div>
);

/** The card as a full-width white page section. */
export const LeadFormSection = (props: LeadFormProps) => (
  <section className='w-full bg-white'>
    <div className='mx-auto w-full max-w-[1480px] px-[16px] py-[64px] tablet:px-[40px] tablet:py-[90px] desktop-light:py-[120px]'>
      <LeadFormCard {...props} />
    </div>
  </section>
);
