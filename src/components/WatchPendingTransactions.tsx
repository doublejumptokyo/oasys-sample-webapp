'use client';

import { useState } from 'react';

import type { Hex } from 'viem';
import { useWatchPendingTransactions } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function WatchPendingTransactions() {
  const [hashes, setHashes] = useState<Hex[]>([]);
  useWatchPendingTransactions({
    onTransactions(transactions) {
      setHashes((x) => [...x, ...transactions]);
    },
  });

  return (
    <MethodContainer title="Watch Pending Transactions">
      <details className="mt-5">
        <summary>{hashes.length} hashes logged</summary>
        {hashes.reverse().join('\n')}
      </details>
    </MethodContainer>
  );
}
