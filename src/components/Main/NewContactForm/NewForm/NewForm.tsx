'use client';

import { sendEmail } from '@/src/utils/sendEmail';
import { InputMask } from '@react-input/mask';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';

export const NewForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      details: '',
    },
    onSubmit: async (values, { resetForm }) => {
      await sendEmail(values.name, values.email, values.phone, values.details);
      resetForm();

      const telegramResponse = await fetch(
        'https://api.telegram.org/bot6992822983:AAHWVJuwqeVl5kscHuZwcPx5W-IPXJ7mpkk/sendMessage',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: '199942509',
            text: `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nDetails: ${values.details}`,
          }),
        }
      ).then((r) => r.json());

      if (telegramResponse.ok) {
        resetForm();
        alert('Thank you! We will contact you soon');
      } else {
        console.error('Error sending message to Telegram:', telegramResponse);
      }
    },
  });

  return (
    <div
      id='contact-form'
      className='w-full scroll-mt-[100px] rounded-[12px] bg-gradient-to-br from-[#1e40af] to-[#6366f1] px-[20px] py-[24px] mobile-big:px-[30px] mobile-big:py-[30px] laptop-big:max-w-[1009px]'
    >
      <h3
        className='font-proxima text-[22px] font-bold leading-[1.25] text-white tablet:text-[26px] tablet:leading-[1.15] text-center'
      >
        Build Your Next Project with Expert Guidance
      </h3>
      <p
        className='mt-[12px] font-proxima text-[14px] font-normal leading-[1.4] text-white/80 tablet:text-[16px] tablet:leading-[1.4] text-center'
      >
        Our team helps ambitious companies implement scalable software solutions that drive business growth
      </p>
      <form
        className='mt-[20px] flex flex-col gap-[12px] overflow-hidden tablet:mt-[24px] tablet:gap-[16px] desktop:mt-[20px] desktop:gap-[14px]'
        onSubmit={formik.handleSubmit}
      >
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formik.values.name}
          required
          className='w-full resize-none rounded-[6px] border-[1px] border-white/30 bg-white/10 p-[8px_16px] font-proxima text-[14px] leading-[1.8] text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/20 tablet:leading-[1.8] desktop:leading-[1.7]'
          onChange={formik.handleChange}
        />
        <input
          type='email'
          name='email'
          value={formik.values.email}
          placeholder='E-mail'
          className='w-full resize-none rounded-[6px] border-[1px] border-white/30 bg-white/10 p-[8px_16px] font-proxima text-[14px] leading-[1.8] text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/20 tablet:leading-[1.8] desktop:leading-[1.7]'
          required
          onChange={formik.handleChange}
        />
        <InputMask
          type='tel'
          name='phone'
          mask='____________________'
          replacement={{
            _: /[0-9]/,
          }}
          value={formik.values.phone}
          placeholder='Phone'
          className='w-full resize-none rounded-[6px] border-[1px] border-white/30 bg-white/10 p-[8px_16px] font-proxima text-[14px] leading-[1.8] text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/20 tablet:leading-[1.8] desktop:leading-[1.7]'
          required
          onChange={formik.handleChange}
        />
        <textarea
          name='details'
          value={formik.values.details}
          placeholder='Tell us about your project'
          className='w-full resize-none rounded-[6px] border-[1px] border-white/30 bg-white/10 p-[8px_16px] font-proxima text-[14px] leading-[1.8] text-white placeholder-white/60 outline-none focus:border-white/60 focus:bg-white/20 tablet:leading-[1.8] desktop:leading-[1.7]'
          rows={1}
          onChange={formik.handleChange}
          required
        />
        <label className='flex w-fit items-center gap-[8px] font-proxima text-[14px] font-normal text-white/90'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className='peer hidden h-[16px] w-[16px] rounded-[2px] border-white accent-white'
          />
          <div
            className={`relative h-[16px] w-[16px] rounded-[4px] border border-[1px] border-white/60 ${isChecked ? 'bg-white' : 'bg-white/10'}`}
          >
            <span
              className={`absolute left-1/2 top-1/2 block translate-x-[-50%] translate-y-[-50%] text-[14px] font-bold text-[#1e40af] ${isChecked ? 'block' : 'hidden'}`}
            >
              &#10004;
            </span>
          </div>
          I agree with{' '}
          <Link href={'policy'} className='text-white underline hover:text-white/80' target='_blank'>
            the privacy policy
          </Link>
        </label>
        <button
          type='submit'
          disabled={!isChecked}
          className={`w-full transform rounded-[10px] px-[15px] py-[14px] text-[14px] font-semibold transition duration-200 ease-in-out tablet:text-[16px] desktop:text-[16px] flex items-center justify-center gap-2 ${isChecked ? 'bg-white text-[#1e3a5f] hover:bg-white/90' : 'bg-white/60 text-[#1e3a5f]/60 cursor-not-allowed'}`}
        >
          Schedule a Free Consultation
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
        <p className="text-center text-white/70 text-[13px] font-proxima mt-3">
          Free consultation. No commitment required.
        </p>
      </form>
    </div>
  );
};
