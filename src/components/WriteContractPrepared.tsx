'use client';

import { useState } from 'react';

import { BaseError } from 'viem';
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { wagmiContractConfig } from './contracts';
import { useDebounce } from '../hooks/useDebounce';
import { stringify } from '../utils/stringify';
import { MethodContainer } from './MethodContainer';

export function WriteContractPrepared() {
  const [tokenId, setTokenId] = useState('');
  const debouncedTokenId = useDebounce(tokenId);

  const { data: simulateData } = useSimulateContract({
    ...wagmiContractConfig,
    functionName: 'mint',
    args: [BigInt(debouncedTokenId)],
  });

  const { writeContract, data, error, isError } = useWriteContract();
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  return (
    <MethodContainer title="Write Contract (Prepared)" error={error?.message}>
      <div className="flex flex-col justify-center items-center gap-5 mt-5">
        <h3>Mint a wagmi</h3>
        <form
          className="flex flex-col justify-center items-center gap-5 mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            writeContract({
              ...wagmiContractConfig,
              functionName: 'mint',
              args: [BigInt(debouncedTokenId)],
            });
          }}
        >
          <input
            placeholder="token id"
            onChange={(e) => setTokenId(e.target.value)}
          />
          <button
            type="submit"
            disabled={!Boolean(simulateData?.request)}
            className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
          >
            Mint
          </button>
        </form>

        {isPending && <div>Transaction pending...</div>}
        {isSuccess && (
          <div className="flex flex-col justify-center items-center max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl gap-5">
            <div className="text-green-300 inline-block w-full break-words">
              Transaction Hash: {data}
            </div>
            <div className="text-green-300 inline-block w-full break-words">
              Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
            </div>
          </div>
        )}
        {isError && <div>{(error as BaseError)?.shortMessage}</div>}
      </div>
    </MethodContainer>
  );
}
