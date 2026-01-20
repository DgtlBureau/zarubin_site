'use client';

import CloseIcon from '@/public/assets/images/icons/close-circle.svg';
import { NextLinePreposition } from '@/src/components/NextLinePreposition/NextLinePreposition';
import { sendEmail } from '@/src/utils/sendEmail';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

interface IFormProps {
  onClick: () => void;
  setIsEmailSended: (value: boolean) => void;
}

export const BonusesForm = ({ onClick, setIsEmailSended }: IFormProps) => {
  const notify = () =>
    toast('Something is wrong! Please try later', {
      className:
        'bg-white font-bold rounded-lg px-4 py-3 shadow-xl text-text-dark text-[16px] font-proxima',
      progressClassName: 'bg-red-800',
      theme: 'white',
    });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    onSubmit: async (values, { resetForm }) => {
      await sendEmail(values.name, values.email);
      resetForm();

      const telegramResponse = await fetch(
        'https://api.telegram.org/bot6992822983:AAHWVJuwqeVl5kscHuZwcPx5W-IPXJ7mpkk/sendMessage',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: '199942509',
            text: `Name: ${values.name}\nEmail: ${values.email}`,
          }),
        }
      ).then((r) => r.json());

      if (telegramResponse.ok) {
        localStorage.setItem('isEmailSended', 'true');
        resetForm();
        setIsEmailSended(true);
        onClick();
      } else {
        console.error('Error sending message to Telegram:', telegramResponse);
        notify();
      }
    },
  });

  return (
    <div
      id='contact-form'
      className='relative w-full max-w-[645px] scroll-mt-[100px] rounded-[12px] bg-main-bg px-[20px] py-[40px] mobile-big:px-[40px] mobile-big:py-[40px]'
    >
      <NextLinePreposition
        tag='h3'
        text='Get the checklist by email'
        className='font-unbound text-[28px] font-semibold uppercase leading-[1.25] text-white tablet:text-[24px] tablet:leading-[1.15]'
      />
      <NextLinePreposition
        tag='p'
        text='Enter your work email and receive a PDF with actionable tips within minutes'
        className='mt-[16px] font-proxima text-[18px] font-semibold leading-[1.1] text-light-gray tablet:text-[20px] tablet:leading-[1.2] desktop:leading-[1]'
      />
      <form
        className='mt-[30px] flex flex-col gap-[20px] overflow-hidden tablet:mt-[40px] tablet:gap-[30px] desktop:mt-[32px] desktop:gap-[25px]'
        onSubmit={formik.handleSubmit}
      >
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formik.values.name}
          required
          className='w-full resize-none rounded-[6px] border-[1px] border-white/20 bg-white/20 p-[8px_20px] font-proxima text-[16px] leading-[2.4] text-white placeholder-gray-placeholder outline-none focus:border-main-orange tablet:leading-[1.8] desktop:leading-[1.7]'
          onChange={formik.handleChange}
        />
        <input
          type='email'
          name='email'
          value={formik.values.email}
          placeholder='E-mail'
          className='w-full resize-none rounded-[6px] border-[1px] border-white/20 bg-white/20 p-[8px_20px] font-proxima text-[16px] leading-[2.4] text-white placeholder-gray-placeholder outline-none focus:border-main-orange tablet:leading-[1.8] desktop:leading-[1.7]'
          required
          onChange={formik.handleChange}
        />
        <button
          type='submit'
          disabled={!formik.values.name && !formik.values.email}
          className={`w-full transform rounded-[6px] px-[15px] py-[13px] text-[16px] font-bold text-text-dark transition duration-200 ease-in-out tablet:text-[20px] desktop:text-[24px] ${formik.values.name && formik.values.email ? 'bg-main-orange hover:scale-[0.99] hover:bg-main-orange-hover' : 'bg-main-orange/60'}`}
        >
          Send the request
        </button>
      </form>
      <button
        type='button'
        onClick={onClick}
        className='absolute right-[8px] top-[8px]'
      >
        <CloseIcon />
      </button>
    </div>
  );
};
