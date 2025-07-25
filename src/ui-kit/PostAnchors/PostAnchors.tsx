'use client';

import useMediaQuery from '@/src/utils/useMediaQuery';
import { AnchorList } from './AnchorList';

export interface IPostAnchorProps {
  data: {
    title: string;
    anchor: string;
  }[];
  mainAnchorData: {
    title: string;
    anchor: string;
  };
}

export const PostAnchors = ({ data, mainAnchorData }: IPostAnchorProps) => {
  const isDesctop = useMediaQuery('>=desktop');

  if (!isDesctop) {
    return null;
  }

  return (
    <div className='sticky top-[150px] z-30 mb-[50px] flex flex-col'>
      <AnchorList data={data} mainAnchorData={mainAnchorData} />
    </div>
  );
};
