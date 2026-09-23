/** Primary white pill CTA; anchors to the demo form at #contact. */
export const CtaButton = ({ label = 'Book a demo' }: { label?: string }) => (
  <a
    href='#contact'
    data-umami-event='book-demo'
    data-umami-event-place='hero'
    className='group inline-flex w-fit items-center gap-[10px] rounded-full bg-white px-[28px] py-[14px] font-inter text-[16px] font-medium text-revanta-ink transition-all duration-200 hover:bg-revanta-accent hover:text-white tablet:px-[32px] tablet:text-[17px]'
  >
    {label}
    <svg
      width='15'
      height='15'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className='transition-transform duration-300 group-hover:translate-x-[3px] motion-reduce:transition-none'
    >
      <path d='M5 12h14' />
      <path d='m12 5 7 7-7 7' />
    </svg>
  </a>
);
