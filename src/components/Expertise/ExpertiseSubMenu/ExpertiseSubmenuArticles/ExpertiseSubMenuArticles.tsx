import { ArticleCard } from '@/src/ui-kit/ArticleCard/ArticleCard';
import { MenuItems } from '@/src/utils/enums';
import { Post } from '@/src/utils/types';
import { DateTime } from 'luxon';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IData {
  data: Post[];
  onClick: () => void;
}

const swiperBreakpoints = {
  0: { slidesPerView: 1.2, spaceBetween: 16 },
  768: { slidesPerView: 1.5, spaceBetween: 24 },
  1200: { slidesPerView: 2, spaceBetween: 24 },
};

export const ExpertiseSubmenuArticles = ({ data, onClick }: IData) => {
  const sortedData = data.sort(
    (a, b) =>
      DateTime.fromFormat(b.date, 'dd-MM-yyyy').toMillis() -
      DateTime.fromFormat(a.date, 'dd-MM-yyyy').toMillis(),
  );

  return (
    <div className='flex w-full flex-col gap-[16px]'>
      <div className='group flex items-center justify-between'>
        <p className='font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-white/80'>
          The latest in {MenuItems.PLAYBOOK}
        </p>
      </div>
      <div className='mx-0 flex w-full px-0'>
        <Swiper
          spaceBetween={24}
          slidesPerView={2}
          breakpoints={swiperBreakpoints}
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
