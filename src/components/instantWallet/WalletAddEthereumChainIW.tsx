'use client';

import { useState } from 'react';

import { useWalletContext } from '@/context/WalletProvider';

import { MethodContainer } from '../MethodContainer';

export function WalletAddEthereumChainIW() {
  const { instantWallet } = useWalletContext();
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const execute = async () => {
    if (!instantWallet) {
      return;
    }
    setError('');

    try {
      await instantWallet.wallet.request({
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
      });
      setResult('Gnosis Chain added');
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
          onClick={execute}
        >
          Execute
        </button>
      </div>
    </MethodContainer>
  );
}
