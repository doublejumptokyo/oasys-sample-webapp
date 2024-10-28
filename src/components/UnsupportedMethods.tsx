'use client';

import { Connected, PassportSupport } from './Connected';
import { EthCall } from './EthCall';
import { EthRequestAccounts } from './EthRequestAccounts';
import { EthSendRawTransaction } from './EthSendRawTransaction';
import { EthSignTransaction } from './EthSignTransaction';
import { useSupportedState } from './SupportedSwitcher';
import { WalletAddEthereumChain } from './WalletAddEthereumChain';
import { WalletGetPermission } from './WalletGetPermission';
import { WalletGetPermissions } from './WalletGetPermissions';
import { WalletRegisterOnboarding } from './WalletRegisterOnboarding';
import { WalletScanQRCode } from './WalletScanQRCode';
import { WalletWatchAsset } from './WalletWatchAsset';
import { WriteContract } from './WriteContract';
import { WriteContractPrepared } from './WriteContractPrepared';

export const UnsupportedMethods = () => {
  const supportedSelection = useSupportedState();

  if (supportedSelection !== PassportSupport.UNSUPPORTED) return null;

  return (
    <Connected passportSupport={PassportSupport.UNSUPPORTED}>
      <EthRequestAccounts />
      <EthCall />
      <EthSendRawTransaction />
      <EthSignTransaction />
      <WalletWatchAsset />
      <WalletScanQRCode />
      <WalletRegisterOnboarding />
      <WalletGetPermission />
      <WalletGetPermissions />
      <WalletAddEthereumChain />
      <WriteContract />
      <WriteContractPrepared />
    </Connected>
  );
};
