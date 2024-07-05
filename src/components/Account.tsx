'use client';

import { useAccount, useEnsName } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function Account() {
  const { address } = useAccount();

  return (
    <MethodContainer title="eth_accounts" result={address}></MethodContainer>
  );
}
