import { MenuItems } from '@/src/utils/enums';
import { Breadcrumb, Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';

const BREADCRUMBS: Breadcrumb[] = [
  { title: 'Main', link: '/' },
  { title: MenuItems.CASES },
];

export const Hero = () => {
  return (
    <div className='flex flex-col gap-[20px] break-words'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <h1 className='page-headings z-[5] font-unbound font-bold uppercase leading-[1.1] desktop:font-black'>
        {MenuItems.CASES}
      </h1>
    </div>
  );
};
