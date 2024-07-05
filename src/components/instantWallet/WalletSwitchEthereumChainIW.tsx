'use client';

import { customChains } from '@/config/chains';
import { useWalletContext } from '@/context/WalletProvider';

import { MethodContainer } from '../MethodContainer';

export function WalletSwitchEthereumChainIW() {
  const { currentChain, switchChain } = useWalletContext();

  return (
    <MethodContainer title="wallet_switchEthereumChain">
      <div className="flex flex-col gap-2 mt-4">
        <div>
          Connected to <b>{currentChain?.name}</b>
        </div>
        <div className="flex flex-col justify-center items-center">
          Switch to:{' '}
          {customChains.map((x: any) =>
            x.id === currentChain?.id ? null : (
              <li key={x.id} className="list-none">
                <button
                  className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
                  key={x.id}
                  onClick={() => switchChain?.(x.id)}
                >
                  {x.name}
                </button>
              </li>
            ),
          )}
        </div>
      </div>
    </MethodContainer>
  );
}
