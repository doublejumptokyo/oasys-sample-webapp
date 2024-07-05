'use client';

import { useState } from 'react';

import { useWalletContext } from '@/context/WalletProvider';

import { MethodContainer } from '../MethodContainer';

export function EthAccountsIW() {
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
        method: 'eth_accounts',
        params: [],
      });
      setResult(res);
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <MethodContainer title="eth_accounts" result={result} error={error}>
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
