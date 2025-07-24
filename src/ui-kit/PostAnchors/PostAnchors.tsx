'use client';

import useMediaQuery from '@/src/utils/useMediaQuery';
import { AnchorList } from './AnchorList';
import { GoBackLink } from '../GoBackLink/GoBackLink';

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
    <div className='sticky top-[75px] z-30 h-fit'>
      <AnchorList data={data} mainAnchorData={mainAnchorData} />
      <GoBackLink />
    </div>
  );
};
