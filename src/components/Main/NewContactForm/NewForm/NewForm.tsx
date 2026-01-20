'use client';

import { NextLinePreposition } from '@/src/components/NextLinePreposition/NextLinePreposition';
import { sendEmail } from '@/src/utils/sendEmail';
import { sendTelegram } from '@/src/utils/sendTelegram';
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

      const telegramSuccess = await sendTelegram(
        `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nDetails: ${values.details}`
      );

      if (telegramSuccess) {
        resetForm();
        alert('Thank you! We will contact you soon');
      } else {
        console.error('Error sending message to Telegram');
      }
    },
  });

  return (
    <div
      id='contact-form'
      className='w-full scroll-mt-[100px] rounded-[12px] bg-main-bg px-[20px] py-[24px] mobile-big:px-[30px] mobile-big:py-[30px] laptop-big:max-w-[1009px]'
    >
      <NextLinePreposition
        tag='h3'
        text='We are always glad to have new partners and ambitious tasks'
        className='font-unbound text-[18px] font-semibold uppercase leading-[1.25] text-white tablet:text-[20px] tablet:leading-[1.15]'
      />
      <NextLinePreposition
        tag='p'
        text='Fill out the form and click the blue button to get in touch with you!'
        className='mt-[12px] font-proxima text-[14px] font-semibold leading-[1.2] text-light-gray tablet:text-[16px] tablet:leading-[1.2] desktop:leading-[1]'
      />
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
          className='w-full resize-none rounded-[6px] border-[1px] border-white/20 bg-white/20 p-[8px_16px] font-proxima text-[14px] leading-[1.8] text-white placeholder-gray-placeholder outline-none focus:border-main-orange tablet:leading-[1.8] desktop:leading-[1.7]'
          onChange={formik.handleChange}
        />
        <input
          type='email'
          name='email'
          value={formik.values.email}
          placeholder='E-mail'
          className='w-full resize-none rounded-[6px] border-[1px] border-white/20 bg-white/20 p-[8px_16px] font-proxima text-[14px] leading-[1.8] text-white placeholder-gray-placeholder outline-none focus:border-main-orange tablet:leading-[1.8] desktop:leading-[1.7]'
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
          className='w-full resize-none rounded-[6px] border-[1px] border-white/20 bg-white/20 p-[8px_16px] font-proxima text-[14px] leading-[1.8] text-white placeholder-gray-placeholder outline-none focus:border-main-orange tablet:leading-[1.8] desktop:leading-[1.7]'
          required
          onChange={formik.handleChange}
        />
        <textarea
          name='details'
          value={formik.values.details}
          placeholder='Request'
          className='w-full resize-none rounded-[6px] border-[1px] border-white/20 bg-white/20 p-[8px_16px] font-proxima text-[14px] leading-[1.8] text-white placeholder-gray-placeholder outline-none focus:border-main-orange tablet:leading-[1.8] desktop:leading-[1.7]'
          rows={1}
          onChange={formik.handleChange}
          required
        />
        <label className='flex w-fit items-center gap-[8px] font-proxima text-[14px] font-bold text-white'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className='peer hidden h-[16px] w-[16px] rounded-[2px] border-white accent-main-orange'
          />
          <div
            className={`relative h-[16px] w-[16px] rounded-[4px] border border-[1px] border-white ${isChecked ? 'bg-main-orange' : ''}`}
          >
            <span
              className={`absolute left-1/2 top-1/2 block translate-x-[-50%] translate-y-[-50%] text-[14px] font-bold text-text-dark ${isChecked ? 'block' : 'hidden'}`}
            >
              &#10004;
            </span>
          </div>
          I agree with{' '}
          <Link href={'policy'} className='text-main-orange' target='_blank'>
            the privacy policy
          </Link>
        </label>
        <button
          type='submit'
          disabled={!isChecked}
          className={`w-full transform rounded-[6px] px-[15px] py-[12px] text-[14px] font-bold text-text-dark transition duration-200 ease-in-out tablet:text-[16px] desktop:text-[16px] ${isChecked ? 'bg-main-orange hover:scale-[0.99] hover:bg-main-orange-hover' : 'bg-main-orange/60'}`}
        >
          Send the request
        </button>
      </form>
    </div>
  );
};
