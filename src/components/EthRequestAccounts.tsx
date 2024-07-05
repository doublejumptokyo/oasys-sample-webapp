'use client';

import { useState } from 'react';

import { useWalletClient, useAccount } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function EthRequestAccounts() {
  const { data: walletClient } = useWalletClient();
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const execute = async () => {
    if (!walletClient) {
      return;
    }
    setError('');

    const customRequest = {
      method: 'eth_requestAccounts',
    } as const;

    try {
      const result = (await walletClient.request(customRequest)) as string;
      setResult(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
        console.error(e.message);
      }
    }
  };

  return (
    <MethodContainer title="eth_requestAccounts" result={result} error={error}>
      <div>
        <button
          className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
          onClick={execute}
        >
          Execute
        </button>
      </div>
    </MethodContainer>
  );
}
