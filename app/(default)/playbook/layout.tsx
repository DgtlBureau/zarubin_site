import { Section } from '@/src/components/shared/Section/Section';

export default function PlaybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section
      id='playbook'
      light
      className='relative z-0 px-0 tablet:px-0 desktop:p-0 desktop:px-0'
    >
      {children}
    </Section>
  );
}
