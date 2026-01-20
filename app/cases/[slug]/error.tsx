'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h2 className="mb-4 font-inter text-xl font-semibold text-text-dark">
        Something went wrong
      </h2>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-text-dark px-6 py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        Try again
      </button>
    </div>
  );
}
