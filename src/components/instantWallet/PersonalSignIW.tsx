'use client';

import { useState } from 'react';

import { useWalletContext } from '@/context/WalletProvider';

import { MethodContainer } from '../MethodContainer';

export function PersonalSignIW() {
  const { instantWallet } = useWalletContext();

  const [message, setMessage] = useState('Test Message');
  const [error, setError] = useState('');
  const [signResult, setSignResult] = useState('');

  const requestPersonalSign = async () => {
    if (!instantWallet) {
      return;
    }
    setError('');

    // Prepare plain text to sign
    const hexString = Buffer.from(message, 'utf-8').toString('hex');

    try {
      const res = await instantWallet.wallet.request({
        method: 'personal_sign',
        params: [`0x${hexString}`, instantWallet.wallet.getAddress()],
      });
      setSignResult(res);
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
