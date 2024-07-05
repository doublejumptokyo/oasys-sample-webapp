'use client';

import { useAccount, useSwitchChain } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function NetworkSwitcher() {
  const { chain } = useAccount();
  const { chains, error, switchChain } = useSwitchChain();

  return (
    <MethodContainer title="wallet_switchEthereumChain" error={error?.message}>
      <div>Connected to {chain?.name ?? chain?.id}</div>
      {switchChain && (
        <div className="flex flex-col justify-center items-center">
          Switch to:{' '}
          {chains.map((chain) => (
            <button
              className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
              key={chain.id}
              onClick={() => switchChain({ chainId: chain.id })}
            >
              {chain.name}
            </button>
          ))}
        </div>
      )}
    </MethodContainer>
  );
}
