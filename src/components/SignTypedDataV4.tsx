'use client';

import { useEffect, useState } from 'react';

import { Address, recoverTypedDataAddress } from 'viem';
import { useSignTypedData } from 'wagmi';

import { MethodContainer } from './MethodContainer';

const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const;

const message = {
  from: {
    name: 'Cow',
    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  },
  to: {
    name: 'Bob',
    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  },
  contents: 'Hello, Bob!',
} as const;

export function SignTypedDataV4() {
  const { data, error, signTypedData } = useSignTypedData();

  const [recoveredAddress, setRecoveredAddress] = useState<Address>();
  useEffect(() => {
    if (!data) return;
    (async () => {
      setRecoveredAddress(
        await recoverTypedDataAddress({
          types,
          message,
          primaryType: 'Mail',
          signature: data,
        }),
      );
    })();
  }, [data]);

  return (
    <MethodContainer title="eth_signTypedData_v4" error={error?.message}>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={() =>
            signTypedData({
              types,
              primaryType: 'Mail',
              message,
            })
          }
          className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
        >
          {'Execute Signature'}
        </button>

        {data && (
          <div className="flex flex-col justify-center items-center max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl gap-5">
            <div className="text-green-300 inline-block w-full break-words">
              Signature: {data}
            </div>
            <div className="text-green-300 inline-block w-full break-words">
              Recovered address {recoveredAddress}
            </div>
          </div>
        )}
      </div>
    </MethodContainer>
  );
}
