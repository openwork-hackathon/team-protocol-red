'use client';

import { useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export default function SimpleConnect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected && address) {
      document.cookie = `wallet=${address}; path=/; max-age=86400`;
    } else if (!isConnected) {
      document.cookie = "wallet=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  }, [isConnected, address]);

  if (isConnected) {
    return (
      <button 
        onClick={() => disconnect()}
        className="bg-red-900/20 border border-red-500 text-red-500 px-4 py-2 font-mono hover:bg-red-900/40"
      >
        {address?.slice(0, 6)}...{address?.slice(-4)} [DISCONNECT]
      </button>
    );
  }

  return (
    <button 
      onClick={() => connect({ connector: injected() })}
      className="bg-red-600 text-black px-4 py-2 font-bold font-mono hover:bg-red-500"
    >
      [ CONNECT WALLET ]
    </button>
  );
}
