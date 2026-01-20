import { ArticleCard } from '@/src/ui-kit/ArticleCard/ArticleCard';
import { MenuItems } from '@/src/utils/enums';
import { Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { DateTime } from 'luxon';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IData {
  data: Post[];
  onClick: () => void;
}

export const ExpertiseSubmenuArticles = ({ data, onClick }: IData) => {
  const isMobile = useMediaQuery('<tablet');
  const isTablen = useMediaQuery('<laptop');

  const sortedData = data.sort(
    (a, b) =>
      DateTime.fromFormat(b.date, 'dd-MM-yyyy').toMillis() -
      DateTime.fromFormat(a.date, 'dd-MM-yyyy').toMillis(),
  );

  return (
    <div className='flex w-full flex-col gap-[16px]'>
      <div className='group flex items-center justify-between'>
        <p className='font-proxima text-[12px] font-semibold uppercase tracking-[0.08em] text-white/80'>
          The latest in {MenuItems.PLAYBOOK}
        </p>
      </div>
      <div className='mx-0 flex w-full px-0'>
        <Swiper
          spaceBetween={isMobile ? 16 : 24}
          slidesPerView={isMobile ? 1.2 : isTablen && !isMobile ? 1.5 : 2}
        >
          {sortedData.slice(0, 2).map((post, idx) => (
            <SwiperSlide key={idx} className='w-full'>
              <ArticleCard
                href={`/${MenuItems.PLAYBOOK.toLowerCase()}/${post.category?.toLowerCase()}/${post.slug}`}
                title={post.title}
                description={post.description}
                image={post.image}
                size='xs'
                showTagsOverlay={false}
                onClick={onClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
