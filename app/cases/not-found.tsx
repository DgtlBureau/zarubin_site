import { DynamicSolutionNotFound } from '@/src/components/DynamicNotFound/DynamicSolutionNotFound';

const NotFoundPage = ({ slug }: { slug: string }) => {
  return (
    <main className='flex flex-col gap-[60px] overflow-hidden'>
      <DynamicSolutionNotFound slug={slug} />
    </main>
  );
};

export default NotFoundPage;
