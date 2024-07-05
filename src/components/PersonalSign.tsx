'use client';

import { useState } from 'react';

import { useWalletClient, useAccount } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function PersonalSign() {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [message, setMessage] = useState('Test Message');
  const [error, setError] = useState('');
  const [signResult, setSignResult] = useState('');

  const requestPersonalSign = async () => {
    if (!walletClient) {
      return;
    }
    setError('');

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
    <MethodContainer title="personal_sign" result={signResult} error={error}>
      <div className="flex flex-col mt-5">
        <input
          name="message"
          placeholder="Message to sign"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

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
