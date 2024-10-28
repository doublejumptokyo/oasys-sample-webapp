'use client';

import { BaseError } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { error } = useConnect();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  return (
    <div>
      <div className="flex flex-col">
        {isConnected ? (
          <button
            className="border-solid border-2 border-red-500 p-1 rounded-md bg-red-400 font-bold m-5"
            onClick={() => disconnect()}
          >
            Disconnect from {connector?.name}
          </button>
        ) : (
          <button
            className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
            onClick={() => open()}
          >
            Connect Wallet
          </button>
        )}
      </div>
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
}
