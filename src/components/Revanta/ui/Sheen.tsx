/**
 * Light streak across an image on hover. Parent needs `group` and
 * `overflow-hidden`; the image itself is not transformed.
 */
export const Sheen = () => (
  <span
    aria-hidden
    className='pointer-events-none absolute -inset-x-[60%] -inset-y-[40%] -translate-x-[70%] bg-[linear-gradient(105deg,transparent_42%,rgba(255,255,255,0.30)_50%,transparent_58%)] group-hover:animate-sheen motion-reduce:group-hover:animate-none'
  />
);
