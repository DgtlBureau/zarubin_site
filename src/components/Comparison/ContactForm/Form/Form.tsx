'use client';

import { DropzoneIcon } from '@/src/components/svg/DropzoneIcon';
import { sendEmail } from '@/src/utils/sendEmail';
import { sendTelegram, sendTelegramDocument } from '@/src/utils/sendTelegram';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Form.module.css';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  cv: File | null;
};

export const Form = () => {
  const formik = useFormik<Inputs>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      cv: null,
    },
    onSubmit: async (values, { resetForm }) => {
      await sendEmail(values.name, values.email, values.phone, '');
      resetForm();

      const caption = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}`;

      let telegramSuccess: boolean;
      if (values.cv) {
        telegramSuccess = await sendTelegramDocument(values.cv, caption);
      } else {
        telegramSuccess = await sendTelegram(caption);
      }

      if (telegramSuccess) {
        resetForm();
        alert('Thank you! We will contact you soon');
      } else {
        console.error('Error sending to Telegram');
      }
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    formik.setFieldValue('cv', acceptedFiles[0]);
  }, [formik]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div id='contact-form' className={styles.formWrapper}>
      <h3 className={styles.title}>
        Fill out the form and click the blue button to get in touch with you!
      </h3>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label className={styles.label}>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formik.values.name}
            required
            className='w-full resize-none border-b border-blue-600 bg-transparent pb-2 font-proxima text-base text-white placeholder-gray-500 placeholder-opacity-50 outline-none focus:bg-blue-950 mobile-big:text-2xl'
            onChange={formik.handleChange}
          />
        </label>
        <label className={styles.label}>
          <input
            type='email'
            name='email'
            value={formik.values.email}
            placeholder='E-mail'
            className='w-full resize-none border-b border-blue-600 bg-transparent pb-2 font-proxima text-base text-white placeholder-gray-500 placeholder-opacity-50 outline-none focus:bg-blue-950 mobile-big:text-2xl'
            required
            onChange={formik.handleChange}
          />
        </label>
        <label className={styles.label}>
          <input
            type='tel'
            name='phone'
            value={formik.values.phone}
            placeholder='Phone'
            className='w-full resize-none border-b border-blue-600 bg-transparent pb-2 font-proxima text-base text-white placeholder-gray-500 placeholder-opacity-50 outline-none focus:bg-blue-950 mobile-big:text-2xl'
            required
            onChange={formik.handleChange}
          />
        </label>
        <div
          className={classNames(
            'rounded-[5px] border-[1px] border-dashed px-[20px] py-[40px]',
            isDragActive ? 'border-white' : 'border-main-blue-hover',
          )}
          {...getRootProps()}
        >
          <div className='flex items-center justify-between'>
            <label
              className={`${formik.values.cv?.name ? 'text-white ' : 'text-gray-500 opacity-50'} font-proxima text-base mobile-big:text-2xl`}
            >
              {formik.values.cv?.name || 'Drop your CV'}
            </label>
            <DropzoneIcon />
          </div>
          <input {...getInputProps()} />
        </div>
        <button type='submit' className={`${styles.formBtn} font-proxima`}>
          Blue button
        </button>
      </form>
    </div>
  );
};
