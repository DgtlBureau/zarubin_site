export const CaseTag = ({ tag }: { tag: string }) => {
  return (
    <div className='rounded-full bg-gradient-to-r from-sky-500/50 to-red-600/50 p-[2px] shadow-[0_0_12px_rgba(59,130,246,0.5)]'>
      <span className='block rounded-full px-[10px] py-[5px] font-unbound text-[12px] font-semibold uppercase tracking-wide text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]'>
        {tag}
      </span>
    </div>
  );
};
