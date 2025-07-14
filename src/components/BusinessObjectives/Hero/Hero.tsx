import { MenuItems } from '@/src/utils/enums';
import { Breadcrumb, Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';

const BREADCRUMBS: Breadcrumb[] = [
  { title: 'Main', link: '/' },
  { title: MenuItems.CASES },
];

export const Hero = () => {
  return (
    <div className='flex flex-col gap-[20px] break-words pb-[60px]'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <h1 className='z-[5] font-unbound text-[40px] font-bold uppercase leading-[1.1] tablet:text-[60px] desktop:text-[80px] desktop:font-black desktop-hard:text-[100px] desktop-hard:text-[100px]'>
        {MenuItems.CASES}
      </h1>
    </div>
  );
};
