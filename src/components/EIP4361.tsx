'use client';

import { useState } from 'react';

import { useWalletClient, useAccount } from 'wagmi';
import { ethers } from 'ethers';

import { MethodContainer } from './MethodContainer';

export function EIP4361() {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [error, setError] = useState('');
  const [signResult, setSignResult] = useState('');

  const requestPersonalSign = async () => {
    if (!walletClient) {
      return;
    }
    setError('');
    const message = `https://example.com wants you to sign in with your Ethereum account:
      0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
      
      I accept the ExampleOrg Terms of Service: https://example.com/tos
      
      URI: https://example.com/login
      Version: 1
      Chain ID: 1
      Nonce: 32891756
      Issued At: 2021-09-30T16:25:24Z
      Resources:
      - ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/
      - https://example.com/my-web2-claim.json`;

    // Prepare plain text to sign
    const hexString = Buffer.from(message, 'utf-8').toString('hex');

    const customRequest = {
      method: 'personal_sign',
      params: [`0x${hexString}`, address], // data to sign, address
    } as any;

    try {
      const result = (await walletClient.request(customRequest)) as string;
      setSignResult(result);
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <MethodContainer
      title="EIP4361 personal_sign"
      result={signResult}
      error={error}
    >
      <div className="flex flex-col mt-5">
        <button
          className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
          onClick={requestPersonalSign}
        >
          Execute Signature
        </button>
      </div>
    </MethodContainer>
  );
}
