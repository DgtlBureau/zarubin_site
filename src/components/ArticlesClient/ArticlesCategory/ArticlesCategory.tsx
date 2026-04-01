interface ICategoryProps {
  category: ICategory[];
  onClick: (value: string) => void;
  setSelectedSubCategory: (value: string) => void;
  setSelectedTag: (value: string) => void;
  setCurrentPage: (value: number) => void;
  selectedCategory: string;
  selectedSubCategory: string;
}

interface ICategory {
  category: string;
  subCategory: (string | null | undefined)[];
}

export const ArticlesCategory = ({
  category,
  onClick,
  setSelectedSubCategory,
  setSelectedTag,
  setCurrentPage,
  selectedCategory,
  selectedSubCategory,
}: ICategoryProps) => {
  return (
    <div className='mt-[10px]'>
      {category && category.length !== 0 && (
        <ul className='flex flex-col gap-[4px]'>
          <li className=''>
            <button
              type='button'
              name='all'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                const target = e.target as HTMLButtonElement;
                onClick(target.name);
                setSelectedSubCategory('');
                setSelectedTag('');
                setCurrentPage(1);
              }}
              className={`font-inter text-[16px] capitalize leading-[1.8] ${selectedCategory.trim().toLowerCase() === 'all' ? 'font-bold' : ''}`}
            >
              all
            </button>
          </li>
          {category.map((item) => (
            <li
              key={item.category}
              className='flex flex-col items-start gap-[2px]'
            >
              <button
                type='button'
                name={item.category}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.target as HTMLButtonElement;
                  onClick(target.name);
                  setSelectedSubCategory('');
                  setSelectedTag('');
                  setCurrentPage(1);
                }}
                className={`font-inter text-[16px] capitalize duration-300 ${selectedCategory.trim().toLowerCase() === item.category.trim().toLowerCase() ? 'font-bold' : ''}`}
              >
                {item.category}
              </button>
              <ul className='ml-[10px] flex flex-col gap-[2px]'>
                {item.subCategory.map((el) => (
                  <li
                    key={el}
                    className={`font-inter text-[16px] leading-[1.8] duration-300 ${selectedSubCategory.trim().toLowerCase() === el?.trim().toLowerCase() ? 'font-bold' : ''}`}
                  >
                    <button
                      type='button'
                      name={el ? el : ''}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const target = e.target as HTMLButtonElement;
                        setSelectedSubCategory(target.name.toLowerCase());
                        onClick(item.category);
                        setSelectedTag('');
                        setCurrentPage(1);
                      }}
                      className='relative'
                    >
                      {el}
                      <span
                        className={`absolute bottom-0 left-0 block h-[1px] w-full duration-300 ${selectedSubCategory.trim().toLowerCase() === el?.trim().toLowerCase() ? 'bg-main-blue' : ''}`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
