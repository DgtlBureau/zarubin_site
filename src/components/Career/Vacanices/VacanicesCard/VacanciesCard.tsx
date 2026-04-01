import { VacanciesCardTriangle } from '@/src/components/svg/VacanciesCardTriangle';
import { LinkArrow } from '@/src/ui-kit/LinkArrow/LinkArrow';
interface Props {
  title: string;
  description: string;
  link: string;
  tags: string[];
  cardLink?: boolean;
}

export const VacanciesCard = ({
  title,
  description,
  link,
  tags,
  cardLink = true,
}: Props) => {
  return (
    <div className='relative flex h-full w-full flex-col rounded-[6px] bg-dark-blue p-[40px_20px] tablet:p-[40px_40px]'>
      <div className='z-10 flex h-full w-full flex-col justify-between'>
        <div className='flex items-center gap-[8px]'>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`flex h-[38px] items-center justify-center rounded-[5px] bg-white px-[10px] font-inter text-[21px] font-bold uppercase leading-[0.8] text-text-dark [&:nth-child(even)]:bg-main-gray [&:nth-child(even)]:text-white `}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className='flex flex-col gap-2.5'>
          <h3 className='mt-[58px] flex-1 font-inter text-[28px] font-bold leading-[1.14] tablet:mt-[46px] tablet:text-[36px] desktop:text-[40px] desktop-big:mt-[56px]'>
            {title}
          </h3>
          <div className='mb-[32px] mt-[10px] flex-1'>
            {description.split('\n').map((line, index) => (
              <p key={index} className='font-inter text-[20px] leading-[1.2]'>
                {line}
              </p>
            ))}
          </div>
          {cardLink && (
            <div className='h-fit w-fit'>
              <LinkArrow title='More' link={link} />
            </div>
          )}
        </div>
      </div>
      <div className='absolute right-4 top-4 w-[116px] tablet:w-[220px] desktop:w-[291px]'>
        <VacanciesCardTriangle />
      </div>
    </div>
  );
};
