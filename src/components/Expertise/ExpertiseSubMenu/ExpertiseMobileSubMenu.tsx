import Link from 'next/link';

interface IExpertiseProps {
  expertiseSubMenu: Submenu[];
  onMenuClose: () => void;
  dark?: boolean;
}

interface Submenu {
  name: string;
  folderItems: { nameItem: string; link: string }[];
}

const formatMenuItem = (menuItem: string) => {
  const newMenuItem = menuItem
    .split('_')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
  return newMenuItem;
};

export const ExpertiseMobileSubMenu = ({
  dark = true,
  expertiseSubMenu,
  onMenuClose,
}: IExpertiseProps) => {
  const finalLink = (str: string) => {
    const splitStr = str.split('.');
    return splitStr[0];
  };

  return (
    <div className='mx-[auto] flex w-full flex-col justify-around border-b-[1px] border-gray-800 py-[10px] pl-[20px]'>
      {expertiseSubMenu.map((item) => (
        <div key={item.name} className={dark ? 'text-white' : 'text-main-bg'}>
          <p className='flex whitespace-nowrap font-unbound text-[16px] font-bold uppercase'>
            {formatMenuItem(item.name)}
          </p>
          <ul className='gap-10px mt-[5px] flex flex-col'>
            {item.folderItems.map((el) => (
              <li
                key={el.nameItem}
                className={`inline-block w-[200px] font-inter leading-[1.87]`}
              >
                <Link
                  onClick={onMenuClose}
                  className='relative border-b-[2px] border-solid border-transparent py-[5px] font-inter text-[16px] hover:border-main-blue'
                  href={`/expertise/${finalLink(el.nameItem)}`}
                >
                  {formatMenuItem(finalLink(el.nameItem))}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
