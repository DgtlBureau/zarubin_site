import { MenuItems } from '@/src/utils/enums';
import { preloadUnboundedPageHeading } from '@/src/utils/fontPreload';
import { Breadcrumb, Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';

const BREADCRUMBS: Breadcrumb[] = [
  { title: 'Main', link: '/' },
  { title: MenuItems.CASES },
];

export const Hero = () => {
  // The H1 is set in Unbounded and sits above the fold
  preloadUnboundedPageHeading();

  return (
    <div className='flex flex-col gap-[20px] break-words'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <h1 className='page-headings z-[5] font-unbound font-bold uppercase leading-[1.1] desktop:font-black'>
        {MenuItems.CASES}
      </h1>
    </div>
  );
};
