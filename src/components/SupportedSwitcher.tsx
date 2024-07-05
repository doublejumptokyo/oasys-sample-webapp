'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

import { useAccount } from 'wagmi';

import { PassportSupport } from './Connected';

export const SupportedContext = createContext<PassportSupport>(
  PassportSupport.SUPPORTED,
);

export const useSupportedState = () => {
  return useContext(SupportedContext);
};

export const SupportedSwitcher = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useAccount();
  const [supportedSelection, setSupportedSelection] = useState(
    PassportSupport.SUPPORTED,
  );

  const clickSupported = (newSupported: PassportSupport) => {
    setSupportedSelection(newSupported);
  };

  if (!isConnected) return null;

  return (
    <SupportedContext.Provider value={supportedSelection}>
      <div className="flex flex-wrap justify-center">
        <button
          className={`border-solid border-2 p-1 rounded-md font-bold m-5 ${
            supportedSelection !== PassportSupport.SUPPORTED
              ? 'bg-gray-300 text-gray-500'
              : 'bg-blue-400 text-white'
          }`}
          onClick={() => clickSupported(PassportSupport.SUPPORTED)}
        >
          Supported Methods
        </button>
        <button
          className={`border-solid border-2 p-1 rounded-md font-bold m-5 ${
            supportedSelection !== PassportSupport.UNSUPPORTED
              ? 'bg-gray-300 text-gray-500'
              : 'bg-blue-400 text-white'
          }`}
          onClick={() => clickSupported(PassportSupport.UNSUPPORTED)}
        >
          Unsupported Methods
        </button>
      </div>
      {children}
    </SupportedContext.Provider>
  );
};
