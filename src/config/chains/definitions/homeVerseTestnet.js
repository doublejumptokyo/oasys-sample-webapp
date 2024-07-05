import { defineChain } from 'viem';

export const homeVerseTestnet = /*#__PURE__*/ defineChain({
  id: 40875,
  name: 'HOME verse Testnet',
  network: 'HOME verse Testnet',
  nativeCurrency: { name: 'HOME verse Testnet', symbol: 'OAS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.oasys.homeverse.games'],
    },
    public: {
      http: ['https://rpc.testnet.oasys.homeverse.games'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HOME verse Testnet Explorer',
      url: 'https://explorer.testnet.oasys.homeverse.games/',
    },
  },
});
