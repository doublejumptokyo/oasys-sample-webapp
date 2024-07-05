'use client';

import { useState } from 'react';

import { useWalletClient } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function WalletGetPermission() {
  const { data: walletClient } = useWalletClient();
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const action = async () => {
    if (!walletClient) {
      return;
    }
    setError('');

    const customRequest = {
      method: 'wallet_getPermission',
      params: [],
    } as any;

    try {
      const result = (await walletClient.request(customRequest)) as string;
      setResult(result);
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <MethodContainer title="wallet_getPermission" result={result} error={error}>
      <div>
        <button
          className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
          onClick={action}
        >
          Execute
        </button>
      </div>
    </MethodContainer>
  );
}
