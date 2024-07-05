'use client';

import { useState } from 'react';

import { useAccount, useBalance } from 'wagmi';
import { Address } from 'viem';

import { MethodContainer } from './MethodContainer';

export function Balance() {
  return (
    <MethodContainer title="eth_getBalance">
      <AccountBalance />
      <FindBalance />
    </MethodContainer>
  );
}

export function AccountBalance() {
  const { address } = useAccount();
  const { data, refetch } = useBalance({
    address,
  });

  return (
    <div className="flex flex-col mt-5">
      Own Balance: {data?.formatted}
      <button
        className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
        onClick={() => refetch()}
      >
        refetch
      </button>
    </div>
  );
}

export function FindBalance() {
  const [address, setAddress] = useState('');
  const { data, isLoading, refetch } = useBalance({
    address: address as Address,
  });

  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col mt-5">
      <span className="text-center mb-2">Find balance: </span>
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="wallet address"
        value={value}
      />
      <button
        className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
        onClick={() => (value === address ? refetch() : setAddress(value))}
      >
        {isLoading ? 'fetching...' : 'fetch'}
      </button>
      {data && <div>Balance on address: {data?.formatted}</div>}
    </div>
  );
}
