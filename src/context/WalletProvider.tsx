import { createContext, useCallback, useContext, useState } from 'react';

import { InstantWallet } from 'instant-wallet/src/main';
import { ethers } from 'ethers';

import { CustomChainInfo, getChainInfo, sandVerse } from '@/config/chains';

type WalletContextType = {
  currentWalletType: WalletType | undefined;
  instantWallet: InstantWallet | undefined;
  provider: ethers.BrowserProvider | undefined;
  currentChain: CustomChainInfo | undefined;
  loginInstantWallet: undefined | (() => void);
  disconnectInstantWallet: undefined | (() => void);
  wipeInstantWallet: undefined | (() => void);
  switchChain: undefined | ((chainHex: number) => void);
};

export enum WalletType {
  None,
  InstantWallet,
  WalletConnect,
}

// Initialize as undefined
export const WalletContext = createContext<WalletContextType>({
  currentWalletType: undefined,
  instantWallet: undefined,
  provider: undefined,
  currentChain: undefined,
  loginInstantWallet: undefined,
  disconnectInstantWallet: undefined,
  wipeInstantWallet: undefined,
  switchChain: undefined,
});

export function useWalletContext() {
  return useContext(WalletContext);
}

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentWalletType, setCurrentWalletType] = useState(WalletType.None);
  const [instantWallet, setInstantWallet] = useState<InstantWallet>();
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [currentChain, setCurrentChain] = useState<CustomChainInfo>();

  const loginInstantWallet = useCallback(() => {
    // Use SandVerse as the default chain
    try {
      const iw = new InstantWallet(ethers.toBeHex(sandVerse.id));
      setInstantWallet(iw);
      setCurrentWalletType(WalletType.InstantWallet);
      console.log(`Instant Wallet ${iw.wallet.getAddress()} Connected: `, iw);

      const provider = new ethers.BrowserProvider(
        iw.getEIP1193Provider(),
        sandVerse.id,
      );
      setProvider(provider);
      console.log('Ethers Provider Connected: ', provider);

      setCurrentChain(getChainInfo(sandVerse.id));
    } catch (e) {
      console.log("Couldn't connect Instant Wallet");
    }
  }, []);

  // Completely clear instant wallet
  const wipeInstantWallet = () => {
    if (!instantWallet) {
      return;
    }

    instantWallet.wipe();
    disconnectInstantWallet();
  };

  // Keep instant wallet in local storage and only disconnect
  const disconnectInstantWallet = () => {
    if (!instantWallet) {
      return;
    }

    setInstantWallet(undefined);
    setCurrentWalletType(WalletType.None);
  };

  const switchChain = async (chainId: number) => {
    if (!instantWallet) {
      return;
    }

    const chainHex = ethers.toBeHex(chainId);

    try {
      await instantWallet.wallet.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainHex }],
      });

      // Recreate provider with proper chain
      const provider = new ethers.BrowserProvider(
        instantWallet.getEIP1193Provider(),
        chainId,
      );
      setProvider(provider);

      setCurrentChain(getChainInfo(chainId));
    } catch (e) {
      console.log(
        'Switching Chains failed; Please try again with a different chain.',
      );
    }
  };

  return (
    <WalletContext.Provider
      value={{
        currentWalletType,
        instantWallet,
        provider,
        currentChain,
        loginInstantWallet,
        disconnectInstantWallet,
        wipeInstantWallet,
        switchChain,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
