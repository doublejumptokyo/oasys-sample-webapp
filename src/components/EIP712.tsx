'use client';

import { useEffect, useState } from 'react';

import { Address, recoverTypedDataAddress } from 'viem';
import { useSignTypedData, useAccount } from 'wagmi';
import { ethers } from 'ethers';

import { MethodContainer } from './MethodContainer';

const types = {
  EIP712Domain: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'version',
      type: 'string',
    },
    {
      name: 'chainId',
      type: 'uint256',
    },
    {
      name: 'verifyingContract',
      type: 'address',
    },
  ],
  OasysPassport: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'message',
      type: 'string',
    },
    {
      name: 'button',
      type: 'string',
    },
  ],
  MainStruct: [
    {
      name: 'otherProperty',
      type: 'string',
    },
    {
      name: 'oasysPassport',
      type: 'OasysPassport',
    },
  ],
} as const;

const message = {
  otherProperty: 'Dappsが決める他のプロパティー',
  oasysPassport: {
    title: 'NFTの購入',
    message: 'NFTを購入する',
    button: '購入',
  },
} as const;

export function EIP712() {
  const { data, error, signTypedData } = useSignTypedData();

  const [recoveredAddress, setRecoveredAddress] = useState<Address>();
  useEffect(() => {
    if (!data) return;
    (async () => {
      setRecoveredAddress(
        await recoverTypedDataAddress({
          types,
          message,
          primaryType: 'MainStruct',
          signature: data,
        }),
      );
    })();
  }, [data]);

  return (
    <MethodContainer title="EIP712 eth_signTypedData_v4" error={error?.message}>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={() =>
            signTypedData({
              types,
              primaryType: 'MainStruct',
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
