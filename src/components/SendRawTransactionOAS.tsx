'use client';

import { parseEther, stringify } from 'viem';
import {
  useAccount,
  useBalance,
  useEstimateGas,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';

import { MethodContainer } from './MethodContainer';

const sendAmount = 0.01;

export function SendRawTransactionOAS() {
  const { address, chainId, chain } = useAccount();
  const { data: balance, refetch } = useBalance({
    address,
  });

  const { data: gasData } = useEstimateGas({
    to: address,
    value: parseEther(sendAmount.toString()),
  });

  const { data, error, sendTransaction } = useSendTransaction();
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  const sufficientBalance = () => {
    if (!balance) {
      return false;
    }
    return parseFloat(balance.formatted) >= sendAmount;
  };

  return (
    <MethodContainer title="Send 0.01 OAS (Prepared)" error={error?.message}>
      <div>
        <form
          className="flex flex-col justify-center items-center gap-5 mt-5"
          onSubmit={(e) => {
            if (!chain) {
              window.alert('Chain not found');
            }
            if (window.confirm(`Send ${sendAmount} to ${chain?.name}`)) {
              e.preventDefault();
              sendTransaction?.({
                chainId,
                gas: gasData,
                to: address || '0x',
                value: parseEther(sendAmount.toString()),
              });
            }
          }}
        >
          <button
            type="submit"
            className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
          >
            Send
          </button>
        </form>
        {!sufficientBalance() && (
          <span className="font-bold m-5 text-red-500">
            Insufficient Balance
          </span>
        )}

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
