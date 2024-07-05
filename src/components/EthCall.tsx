'use client';

import { useState } from 'react';

import { useWalletClient, useAccount } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function EthCall() {
  const { data: walletClient } = useWalletClient();
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const requestPersonalSign = async () => {
    if (!walletClient) {
      return;
    }
    setError('');

    const customRequest = {
      method: 'eth_call',
      params: [
        {
          from: null,
          to: '0x6b175474e89094c44da98b954eedeac495271d0f',
          data: '0x70a082310000000000000000000000006E0d01A76C3Cf4288372a29124A26D4353EE51BE',
        },
        'latest',
      ],
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
    <MethodContainer title="eth_call" result={result} error={error}>
      <div>
        <button
          className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
          onClick={requestPersonalSign}
        >
          Execute
        </button>
      </div>
    </MethodContainer>
  );
}
