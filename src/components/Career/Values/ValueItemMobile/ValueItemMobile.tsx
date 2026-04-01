export const ValueItemMobile = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className='flex flex-col gap-[20px]'>
      <h5 className='font-unbound text-[28px] font-bold uppercase'>{title}</h5>
      <div className='font-inter leading-[20px] text-text-dark'>
        {description.split('\n').map((line, index) => (
          <p className='text-[16px]' key={index}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};
