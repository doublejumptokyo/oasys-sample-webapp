'use client';

import { parseEther } from 'viem';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';

import { stringify } from '../utils/stringify';
import { MethodContainer } from './MethodContainer';

export function SendTransaction() {
  const { data, error, sendTransaction } = useSendTransaction();
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  return (
    <MethodContainer title="Send Transaction" error={error?.message}>
      <div>
        <form
          className="flex flex-col justify-center items-center gap-5 mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const address = formData.get('address') as `0x${string}`;
            const value = formData.get('value') as `${number}`;
            sendTransaction({
              to: address,
              value: parseEther(value),
            });
          }}
        >
          <input name="address" placeholder="address" />
          <input name="value" placeholder="value (ether)" />
          <button
            type="submit"
            className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
          >
            Send
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
