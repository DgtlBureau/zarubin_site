import { ContactForm as UnifiedContactForm } from '@/src/components/forms/ContactForm';
import author from '@/public/assets/images/main/author.png';
import Image from 'next/image';
import Link from 'next/link';

export const ContactForm = () => {
  return (
    <div className='flex flex-col justify-between gap-[72px] bg-white text-text-dark desktop:flex-row'>
      <div className='flex flex-col justify-between gap-[40px]'>
        <h2 className='section-headings font-unbound font-black leading-[1.1] tablet:leading-[1.3]'>
          We are Always <br />
          keep moving
        </h2>
        <div className='flex flex-col gap-[40px] desktop-big:flex-row desktop-big:items-center'>
          <div className='inline-flex items-center justify-start gap-6'>
            <Image
              src={author}
              width={120}
              height={120}
              alt='author'
              className='h-[119px] w-[119px] rounded-full border-2 border-blue-600'
            />
            <div className='flex max-w-full flex-col gap-1 laptop:max-w-[291px]'>
              <p className='font-proxima text-[22px] font-bold leading-9 text-slate-900'>
                Vitaly Z.
              </p>
              <span className='font-proxima text-[16px] font-normal leading-[29.77px] text-slate-900'>
                «The road arises under the steps of walking»
              </span>
              <div className='inline font-proxima text-[18px] font-bold leading-9 text-slate-900 laptop:hidden'>
                access@thebrightbyte.com
              </div>
            </div>
          </div>
          <Link
            href='mailto:access@thebrightbyte.com '
            className='hidden font-proxima text-[18px] font-bold leading-9 text-slate-900 laptop:inline'
          >
            access@thebrightbyte.com
          </Link>
        </div>
      </div>
      <div className='w-full shrink-0 desktop:w-[710px]'>
        <UnifiedContactForm
          variant='dark'
          showCV={true}
          showDetails={false}
          showPrivacyCheckbox={false}
          title='Fill out the form and click the blue button to get in touch with you!'
          submitText='Blue button'
        />
      </div>
    </div>
  );
};
