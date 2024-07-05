'use client';

import { useAccount } from 'wagmi';

export enum PassportSupport {
  NOTAPPLICABLE,
  SUPPORTED,
  UNSUPPORTED,
}

export function Connected({
  children,
  passportSupport = PassportSupport.NOTAPPLICABLE,
}: {
  children: React.ReactNode;
  passportSupport: PassportSupport;
}) {
  const { isConnected } = useAccount();

  if (!isConnected) return null;
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-10">
      {passportSupport === PassportSupport.SUPPORTED && (
        <h2 className="text-xl font-extrabold text-teal-400">
          Supported by Oasys Passport
        </h2>
      )}
      {passportSupport === PassportSupport.UNSUPPORTED && (
        <h2 className="text-xl font-extrabold text-red-400">
          Not Supported by Oasys Passport
        </h2>
      )}

      <div className="flex flex-col justify-center items-center gap-10">
        {children}
      </div>
    </div>
  );
}
