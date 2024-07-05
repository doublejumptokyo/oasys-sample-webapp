'use client';

import { useState } from 'react';

import { useSignMessage } from 'wagmi';

import { MethodContainer } from './MethodContainer';

export function EthSign() {
  const [message, setMessage] = useState('Test Message');
  const { data: signMessageData, error, signMessage } = useSignMessage();

  const requestEthSign = async () => {
    signMessage({ message });
  };

  return (
    <MethodContainer
      title="eth_sign"
      result={signMessageData}
      error={error?.message}
    >
      <div className="flex flex-col mt-5">
        <input
          name="message"
          placeholder="Message to sign"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="border-solid border-2 border-sky-500 p-1 rounded-md bg-blue-400 font-bold m-5"
          onClick={requestEthSign}
        >
          Execute Signature
        </button>
      </div>
    </MethodContainer>
  );
}
