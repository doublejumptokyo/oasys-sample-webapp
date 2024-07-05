'use client';

import { useState } from 'react';

import { useWalletClient } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function EthSendRawTransaction() {
  const { data: walletClient } = useWalletClient();
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const execute = async () => {
    if (!walletClient) {
      return;
    }
    setError('');

    const customRequest = {
      method: 'eth_sendRawTransaction',
      params: [
        '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675', // Pre-signed test tx
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
    <MethodContainer
      title="eth_sendRawTransaction"
      result={result}
      error={error}
    >
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
