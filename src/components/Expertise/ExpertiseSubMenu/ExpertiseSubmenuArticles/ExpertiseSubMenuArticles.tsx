import { Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import { DateTime } from 'luxon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ExpertiseMenuCard } from '../../ExpertiseMenuCard/ExpertiseMenuCard';
import { MenuItems } from '@/src/utils/enums';

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
    <div className='flex w-full flex-col gap-[20px]'>
      <div className='group flex items-center justify-between'>
        <p className='font-unbound text-[20px] font-bold uppercase leading-[1.4] text-white'>
          The latest in {MenuItems.PLAYBOOK}
        </p>
      </div>
      <div className='mx-0 flex w-full px-0'>
        <Swiper
          spaceBetween={isMobile ? 20 : 40}
          slidesPerView={isMobile ? 1.2 : isTablen && !isMobile ? 1.5 : 2}
        >
          {sortedData.slice(0, 2).map((post, idx) => (
            <SwiperSlide key={idx} className='w-full'>
              <ExpertiseMenuCard
                title={post.title}
                description={post.description}
                tag={post.tag}
                slug={post.slug}
                category={post.category}
                subCategory={post.subCategory}
                image={post.image}
                onClick={onClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
