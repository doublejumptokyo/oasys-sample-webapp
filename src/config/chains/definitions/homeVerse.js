import { defineChain } from 'viem';

export const homeVerse = /*#__PURE__*/ defineChain({
  id: 19011,
  name: 'HOME verse',
  network: 'HOME verse',
  nativeCurrency: { name: 'HOME verse', symbol: 'OAS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.mainnet.oasys.games'],
    },
    public: {
      http: ['https://rpc.mainnet.oasys.games'],
    },
  },
  blockExplorers: {
    default: {
      name: 'OasysScan',
      url: 'https://scan.oasys.games',
    },
  },
});
