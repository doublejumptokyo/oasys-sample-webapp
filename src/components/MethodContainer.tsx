'use client';

import { ReactNode } from 'react';

type MethodContainerProps = {
  title: string;
  children?: ReactNode;
  error?: string;
  result?: string;
};

const flexCenter = 'flex flex-col justify-center items-center';

export function MethodContainer({
  title,
  error,
  result,
  children,
}: MethodContainerProps) {
  return (
    <div className={`${flexCenter}`}>
      <div className={`${flexCenter} font-bold text-xl`}>
        <span>{title}</span>
      </div>
      <div className={flexCenter}>{children}</div>
      <div
        className={`${flexCenter} max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl`}
      >
        {result && (
          <span
            className="text-green-300 inline-block w-full break-words"
            title={result}
          >
            {result}
          </span>
        )}
        {error && (
          <span className="text-red-300	inline-block w-full break-words">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
