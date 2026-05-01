import { ISubmenu, Post } from '@/src/utils/types';
import { ExpertiseSubmenuArticles } from './ExpertiseSubmenuArticles/ExpertiseSubMenuArticles';
import { ExpertiseSubMenuList } from './ExpertiseSubmenuArticles/ExpertiseSubMenuList';

interface IExpertiseProps {
  expertiseSubMenu: ISubmenu[];
  insightsSubMenu: ISubmenu[];
  onClick: () => void;
  expertiseMetadata: Post[];
}

export const ExpertiseSubMenu = ({
  expertiseSubMenu,
  insightsSubMenu,
  onClick,
  expertiseMetadata,
}: IExpertiseProps) => {
  return (
    <div className='z-20 mx-auto my-0 flex w-full items-stretch gap-[40px] p-[40px]'>
      <div className='flex flex-col gap-[24px]'>
        <ExpertiseSubMenuList
          data={expertiseSubMenu}
          onClick={onClick}
          category='expertise'
        />
        <ExpertiseSubMenuList
          data={insightsSubMenu}
          onClick={onClick}
          category='insights'
        />
      </div>
      <div className='flex w-[720px] flex-col gap-[20px]'>
        <div className='mx-0 flex w-full px-0'>
          <ExpertiseSubmenuArticles
            data={expertiseMetadata}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};
