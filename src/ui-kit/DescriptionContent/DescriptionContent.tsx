interface Props {
  description: string;
  subDescription: string;
}

export const DescriptionContent = ({ description, subDescription }: Props) => {
  return (
    <div className='flex w-full flex-col gap-5'>
      <p className='font-inter-nova text-lg font-bold leading-[1.33] mobile:text-sm mobile-big:text-base tablet:text-lg laptop:text-2xl laptop-big:text-3xl desktop:text-4xl desktop:leading-tight'>
        {description}
      </p>
      <p className='font-inter-nova text-base text-main-disabled opacity-80 mobile:text-xs mobile-big:text-sm tablet:text-base laptop:text-lg laptop-big:text-xl desktop:text-2xl desktop:leading-[1.16]'>
        {subDescription}
      </p>
    </div>
  );
};
