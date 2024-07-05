'use client';

import { useState } from 'react';

import { useWalletContext } from '@/context/WalletProvider';

import { MethodContainer } from '../MethodContainer';

export function EthRequestAccountsIW() {
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
        method: 'eth_requestAccounts',
        params: [],
      });
      setResult(res);
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
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
