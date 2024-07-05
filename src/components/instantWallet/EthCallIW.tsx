'use client';

import { useState } from 'react';

import { useWalletContext } from '@/context/WalletProvider';

import { MethodContainer } from '../MethodContainer';

export function EthCallIW() {
  const { instantWallet } = useWalletContext();
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const execute = async () => {
    if (!instantWallet) {
      return;
    }
    setError('');

    try {
      const res = await instantWallet.wallet.request({
        method: 'eth_call',
        params: [
          {
            from: null,
            to: '0x6b175474e89094c44da98b954eedeac495271d0f',
            data: '0x70a082310000000000000000000000006E0d01A76C3Cf4288372a29124A26D4353EE51BE',
          },
          'latest',
        ],
      });
      setResult(res);
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
          onClick={execute}
        >
          Execute
        </button>
      </div>
    </MethodContainer>
  );
}
