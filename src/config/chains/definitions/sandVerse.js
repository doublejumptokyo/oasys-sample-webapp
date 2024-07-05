import { defineChain } from 'viem';

export const sandVerse = /*#__PURE__*/ defineChain({
  id: 20197,
  name: 'SAND Verse',
  network: 'SAND Verse',
  nativeCurrency: { name: 'SAND Verse', symbol: 'OAS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.sandverse.oasys.games'],
    },
    public: {
      http: ['https://rpc.sandverse.oasys.games'],
    },
  },
  blockExplorers: {
    default: {
      name: 'SAND Verse Explorer',
      url: 'https://scan.sandverse.oasys.games/',
    },
  },
});
