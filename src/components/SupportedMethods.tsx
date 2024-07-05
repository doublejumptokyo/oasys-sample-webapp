'use client';

import { Account } from './Account';
import { Balance } from './Balance';
import { BlockNumber } from './BlockNumber';
import { Connected, PassportSupport } from './Connected';
import { EIP4361 } from './EIP4361';
import { EIP712 } from './EIP712';
import { EthSign } from './EthSign';
import { EthSignTransaction } from './EthSignTransaction';
import { NetworkSwitcher } from './NetworkSwitcher';
import { PersonalSign } from './PersonalSign';
import { SendRawTransactionOAS } from './SendRawTransactionOAS';
import { SendTransaction } from './SendTransaction';
import { SignTypedDataV4 } from './SignTypedDataV4';
import { useSupportedState } from './SupportedSwitcher';
import { WatchContractEvents } from './WatchContractEvents';
import { WatchPendingTransactions } from './WatchPendingTransactions';

export const SupportedMethods = () => {
  const supportedSelection = useSupportedState();

  if (supportedSelection !== PassportSupport.SUPPORTED) return null;

  return (
    <Connected passportSupport={PassportSupport.SUPPORTED}>
      <NetworkSwitcher />
      <Account />
      <Balance />
      <BlockNumber />
      <PersonalSign />
      <EthSign />
      <EthSignTransaction />
      <SignTypedDataV4 />
      <SendTransaction />
      <WatchContractEvents />
      <WatchPendingTransactions />
      <EIP4361 />
      <EIP712 />
      <SendRawTransactionOAS />
    </Connected>
  );
};
