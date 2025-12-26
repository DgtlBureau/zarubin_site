import author from '@/public/assets/images/main/author.webp';
import Image from 'next/image';
import Link from 'next/link';
import { Form } from './Form/Form';

export const ContactForm = () => {
  return (
    <div className='flex flex-col justify-between gap-[72px] desktop:flex-row'>
      <div className='flex flex-col justify-between gap-[40px]'>
        <h2 className='section-headings font-unbound font-black uppercase leading-[1.1] tablet:leading-[1.3]'>
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
      <div className='w-auto desktop:max-w-[710px]'>
        <Form />
      </div>
    </div>
  );
};
