import { NextLinePreposition } from '../../NextLinePreposition/NextLinePreposition';

export const Insights = () => {
  return (
    <div className='flex flex-col gap-[20px] tablet:gap-[40px] desktop:gap-[60px]'>
      <div className='desktop:px-[80px]'>
        <h2 className='font-unbound text-[32px] font-bold uppercase leading-[1.1] tablet:text-[50px] tablet:leading-[1.3] desktop:text-[55px] desktop:leading-[1.1] desktop-light:text-[60px] desktop-hard:text-[70px]'>
          <NextLinePreposition
            tag='span'
            text='We are a team of experienced professionals'
            className=''
          />{' '}
          <NextLinePreposition
            tag='span'
            text='charged with results'
            className='text-stroke'
          />
        </h2>
      </div>
      <div className='bg-main-blue p-[40px_20px] desktop:p-[60px_80px]'>
        <ul className='flex flex-col gap-[40px] desktop:flex-row desktop:gap-[49px]'>
          <li className='flex flex-1 flex-col gap-[12px]'>
            <h3 className='whitespace-nowrap font-unbound text-[44px] font-bold uppercase leading-[1.1] tablet:text-[50px]'>
              2 years
            </h3>
            <p className='font-inter text-[20px] leading-[1.2]'>
              create mobile applications and web services for cutting-edge
              companies
            </p>
          </li>
          <li className='flex flex-1 flex-col gap-[12px]'>
            <h3 className='whitespace-nowrap font-unbound text-[44px] font-bold uppercase leading-[1.1] tablet:text-[50px]'>
              25+
            </h3>
            <p className='font-inter text-[20px] leading-[1.2]'>
              implemented digital projects that attracted new users
            </p>
          </li>
          <li className='flex flex-1 flex-col gap-[12px]'>
            <h3 className='whitespace-nowrap font-unbound text-[44px] font-bold uppercase leading-[1.1] tablet:text-[50px]'>
              20+ people
            </h3>
            <p className='font-inter text-[20px] leading-[1.2]'>
              work on tasks
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
