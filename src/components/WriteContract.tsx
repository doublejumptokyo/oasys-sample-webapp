'use client';

import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { wagmiContractConfig } from './contracts';
import { stringify } from '../utils/stringify';
import { MethodContainer } from './MethodContainer';

export function WriteContract() {
  const { writeContract, data, error } = useWriteContract();
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  return (
    <MethodContainer title="Write Contract" error={error?.message}>
      <div className="flex flex-col justify-center items-center gap-5 mt-5">
        <h3>Mint a wagmi</h3>
        <form
          className="flex flex-col justify-center items-center gap-5 mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const tokenId = formData.get('tokenId') as string;
            writeContract({
              ...wagmiContractConfig,
              functionName: 'mint',
              args: [BigInt(tokenId)],
            });
          }}
        >
          <input name="tokenId" placeholder="token id" />
          <button
            type="submit"
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
      </div>
    </MethodContainer>
  );
}
