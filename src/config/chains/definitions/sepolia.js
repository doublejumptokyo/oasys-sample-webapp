import { defineChain } from 'viem';

export const sepolia = /*#__PURE__*/ defineChain({
  id: 11155111,
  name: 'Sepolia',
  network: 'Sepolia',
  nativeCurrency: { name: 'Sepolia', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.org'],
    },
    public: {
      http: ['https://rpc.sepolia.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Sepolia Testnet Explorer',
      url: 'https://sepolia.etherscan.io/',
    },
  },
});
