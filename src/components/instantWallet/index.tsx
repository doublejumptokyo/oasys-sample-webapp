'use client';

import { useWalletContext } from '@/context/WalletProvider';

import { PersonalSignIW } from './PersonalSignIW';
import { EthAccountsIW } from './EthAccountsIW';
import { EthRequestAccountsIW } from './EthRequestAccountsIW';
import { WalletSwitchEthereumChainIW } from './WalletSwitchEthereumChainIW';
import { WalletAddEthereumChainIW } from './WalletAddEthereumChainIW';
import { EthCallIW } from './EthCallIW';
import { EthSendTransactionIW } from './EthSendTransactionIW';

export const InstantWallet = () => {
  const { instantWallet } = useWalletContext();

  if (!instantWallet) return null;

  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-10">
      <PersonalSignIW />
      <EthAccountsIW />
      <EthRequestAccountsIW />
      <WalletSwitchEthereumChainIW />
      <WalletAddEthereumChainIW />
      <EthCallIW />
      <EthSendTransactionIW />
    </div>
  );
};
