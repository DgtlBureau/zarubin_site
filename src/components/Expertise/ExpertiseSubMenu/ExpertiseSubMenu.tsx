import { ISubmenu, Post } from '@/src/utils/types';
import { ExpertiseSubmenuArticles } from './ExpertiseSubmenuArticles/ExpertiseSubMenuArticles';
import { ExpertiseSubMenuList } from './ExpertiseSubmenuArticles/ExpertiseSubMenuList';

interface IExpertiseProps {
  expertiseSubMenu: ISubmenu[];
  onClick: () => void;
  expertiseMetadata: Post[];
}

export const ExpertiseSubMenu = ({
  expertiseSubMenu,
  onClick,
  expertiseMetadata,
}: IExpertiseProps) => {
  return (
    <div className='z-20 mx-auto my-0 flex w-full items-stretch gap-[40px] p-[40px]'>
      <ExpertiseSubMenuList data={expertiseSubMenu} onClick={onClick} />
      <div className='flex w-[630px] flex-col gap-[20px]'>
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
