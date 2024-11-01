import { mainnet, oasys } from 'viem/chains';
import { AppKitNetwork } from '@reown/appkit/networks';

import { homeVerseTestnet } from './definitions/homeVerseTestnet.js';
import { oasysTestnet } from './definitions/oasysTestnet.js';
import { sandVerse } from './definitions/sandVerse.js';
import { sepolia } from './definitions/sepolia.js';

export { homeVerse } from './definitions/homeVerse.js';
export { homeVerseTestnet } from './definitions/homeVerseTestnet.js';
export { oasysTestnet } from './definitions/oasysTestnet.js';
export { sandVerse } from './definitions/sandVerse.js';
export { sepolia } from './definitions/sepolia.js';

export type CustomChainInfo = (typeof customChains)[number];

export const customChains: [AppKitNetwork, ...AppKitNetwork[]] = [
  oasys,
  mainnet,
  sandVerse,
  sepolia,
  oasysTestnet,
  homeVerseTestnet,
];

export const getChainInfo = (chainId: number) => {
  return customChains.find((chain) => {
    return chain.id === chainId;
  });
};
