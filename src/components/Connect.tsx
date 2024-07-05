'use client';

import { BaseError } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useSession } from 'next-auth/react';

import { WalletType, useWalletContext } from '@/context/WalletProvider';

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { error } = useConnect();
  const { disconnect } = useDisconnect();
  const {
    currentWalletType,
    instantWallet,
    provider,
    loginInstantWallet,
    disconnectInstantWallet,
    wipeInstantWallet,
  } = useWalletContext();
  const { open } = useWeb3Modal();
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex flex-col">
        {isConnected && (
          <button
            className="border-solid border-2 border-red-500 p-1 rounded-md bg-red-400 font-bold m-5"
            onClick={() => disconnect()}
          >
            Disconnect from {connector?.name}
          </button>
        )}

        {isConnected && session && (
          <p>SIWE session: {JSON.stringify(session)}</p>
        )}

        {!isConnected && currentWalletType == WalletType.None && (
          <>
            <button
              className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
              onClick={() => open()}
            >
              Web3Modal
            </button>
          </>
        )}

        {/* Instant Wallet */}
        {currentWalletType == WalletType.None && !isConnected && (
          <button
            className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
            onClick={() => loginInstantWallet?.()}
          >
            Instant Play
          </button>
        )}
        {!!instantWallet && (
          <>
            <button
              className="border-solid border-2 border-red-500 p-1 rounded-md bg-red-400 font-bold m-5"
              onClick={() => disconnectInstantWallet?.()}
            >
              Disconnect Instant Wallet
            </button>
            <button
              className="border-solid border-2 border-red-500 p-1 rounded-md bg-red-400 font-bold m-5"
              onClick={() => wipeInstantWallet?.()}
            >
              Wipe Instant Wallet
            </button>
          </>
        )}
      </div>

      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
}
