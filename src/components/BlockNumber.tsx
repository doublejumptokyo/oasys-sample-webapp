'use client';

import { useBlockNumber } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function BlockNumber() {
  const { data } = useBlockNumber({ watch: true });
  return (
    <MethodContainer
      title="Block Number"
      result={data?.toString()}
    ></MethodContainer>
  );
}
