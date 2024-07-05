'use client';

import { useState } from 'react';

import { useWalletClient } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function WalletAddEthereumChain() {
  const { data: walletClient } = useWalletClient();
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const action = async () => {
    if (!walletClient) {
      return;
    }
    setError('');

    const customRequest = {
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x64',
          chainName: 'Gnosis',
          rpcUrls: ['https://rpc.ankr.com/gnosis'],
          iconUrls: [
            'https://xdaichain.com/fake/example/url/xdai.svg',
            'https://xdaichain.com/fake/example/url/xdai.png',
          ],
          nativeCurrency: {
            name: 'xDAI',
            symbol: 'xDAI',
            decimals: 18,
          },
          blockExplorerUrls: ['https://blockscout.com/poa/xdai/'],
        },
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
      title="wallet_addEthereumChain"
      result={result}
      error={error}
    >
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
