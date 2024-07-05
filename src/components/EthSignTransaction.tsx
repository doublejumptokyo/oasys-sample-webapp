'use client';

import { useState } from 'react';

import { useWalletClient, useAccount } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function EthSignTransaction() {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [error, setError] = useState('');
  const [signResult, setSignResult] = useState('');

  const requestEthSignTransaction = async () => {
    if (!walletClient) {
      return;
    }
    setError('');

    // Shortcut to get hex amount without library
    const amount = '0x' + (0.1 * 1e18).toString(16);

    const customRequest = {
      method: 'eth_signTransaction',
      params: [address, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', amount], // from, to, value
    } as any;

    try {
      const result = (await walletClient.request(customRequest)) as string;
      setSignResult(result);
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <MethodContainer
      title="eth_signTransaction"
      result={signResult}
      error={error}
    >
      <div>
        <button
          className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
          onClick={requestEthSignTransaction}
        >
          Execute Signature
        </button>
      </div>
    </MethodContainer>
  );
}
