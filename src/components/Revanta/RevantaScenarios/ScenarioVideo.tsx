'use client';

import { useEffect, useRef, useState } from 'react';

/** Start loading slightly before the clip reaches the viewport. */
const PRELOAD_MARGIN = '200px';
const VISIBLE_RATIO = 0.25;

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: PRELOAD_MARGIN, threshold: VISIBLE_RATIO },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

type Props = {
  video: string;
  poster: string;
  title: string;
  /** CSS aspect-ratio of the recording. */
  aspect?: string;
};

/**
 * Admin-panel recording in a browser frame. The source is attached only when
 * the clip scrolls into view, and it plays only while visible, so a page with
 * eight scenarios does not download or decode them all at once.
 */
export const ScenarioVideo = ({
  video,
  poster,
  title,
  aspect = '1904 / 936',
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(rootRef);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !inView || v.getAttribute('src')) return;
    v.src = video;
    v.load();
  }, [inView, video]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <div
      ref={rootRef}
      className='relative overflow-hidden rounded-[16px] border border-revanta-ink/[0.08] bg-white shadow-[0_44px_100px_-50px_rgba(1,18,57,0.55)]'
    >
      <div className='flex h-[40px] items-center gap-[7px] border-b border-revanta-ink/[0.08] bg-[#f4f5f8] px-[16px]'>
        <span className='h-[10px] w-[10px] rounded-full bg-[#ff5f57]' />
        <span className='h-[10px] w-[10px] rounded-full bg-[#febc2e]' />
        <span className='h-[10px] w-[10px] rounded-full bg-[#28c840]' />
        <span className='ml-[10px] truncate font-inter text-[12px] text-revanta-ink/45'>
          Revanta admin panel
        </span>
      </div>
      <div
        className='relative overflow-hidden bg-white'
        style={{ aspectRatio: aspect }}
      >
        <video
          ref={videoRef}
          className='absolute inset-0 h-full w-full object-cover'
          muted
          loop
          playsInline
          preload='none'
          poster={poster}
          aria-label={title}
        />
      </div>
    </div>
  );
};
