import defaultImg from '@/public/assets/images/banner/default_insights.webp';
import { NextLinePreposition } from '@/src/components/NextLinePreposition/NextLinePreposition';
import { DownloadLink } from '@/src/ui-kit/DownloadLink/DownloadLink';
import { MenuItems } from '@/src/utils/enums';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  tag: string | undefined;
  description: string;
  downloadLink: string | undefined;
  slug: string;
  subCategory: string | undefined | null;
  image: string | undefined | null;
}

export const InsightsCard = ({
  tag,
  title,
  description,
  downloadLink,
  slug,
  subCategory,
  image,
}: Props) => {
  const tags = tag?.split(',');

  return (
    <Link
      href={`/${MenuItems.PLAYBOOK.toLowerCase()}/insights/${slug}`}
      className='flex h-full flex-col'
    >
      <div className='relative aspect-[16/9] w-full overflow-hidden'>
        {image ? (
          <Image
            src={image}
            alt={title}
            width={450}
            height={250}
            className='h-full w-full object-cover object-center'
            quality={80}
          />
        ) : (
          <Image
            src={defaultImg}
            alt={title}
            width={450}
            height={250}
            className='h-full w-full object-cover object-center'
            quality={80}
          />
        )}
      </div>
      <div className='flex h-full min-h-[359px] w-full flex-1 flex-col items-stretch rounded-b-[5px] bg-white px-[20px] py-[40px] tablet:px-[40px]'>
        {tags && (
          <div className='flex flex-wrap items-center gap-[12px]'>
            {tags.map((item, idx) => (
              <span
                key={idx}
                className='block w-fit rounded-[5px] bg-gray-200 p-[10px] font-proxima text-[21px] font-bold uppercase leading-none text-text-dark'
              >
                {item}
              </span>
            ))}
          </div>
        )}
        <NextLinePreposition
          tag='h3'
          text={title}
          className='mt-[25px] line-clamp-3 overflow-hidden font-unbound text-[22px] font-bold uppercase leading-[1] text-text-dark tablet:text-[24px] tablet:leading-[1.16]'
        />
        <NextLinePreposition
          tag='p'
          text={description}
          className='mt-[19px] line-clamp-3 overflow-hidden font-proxima text-[16px] leading-[1.25] text-text-dark tablet:text-[20px]'
        />
        {subCategory === 'Research' && downloadLink && (
          <div className='mt-[25px]'>
            <DownloadLink link={downloadLink} />
          </div>
        )}
      </div>
    </Link>
  );
};
