'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import SimpleConnect from '../components/SimpleConnect';

export default function Deploy() {
  const { address: wallet, isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const [agentUrl, setAgentUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [stake, setStake] = useState('100000');

  useEffect(() => {
    if (typeof window !== 'undefined' && !isConnected) {
        // window.location.href = '/';
    }
  }, [isConnected]);

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentUrl.trim()) return;

    // Request signature for Deployment Authorization
    signMessage({ 
      message: `Protocol Red Deployment Authorization\nAgent: ${agentUrl}\nStake: ${stake} $OPENWORK\nNetwork: Base Mainnet` 
    });

    alert("DEPLOY_SEQUENCE_INITIALIZED: Pending confirmation from @Nimtei's smart contracts... 🏔️🦾");
  };

  const handleTopUp = () => {
      alert("BRIDGE_INIT: Connecting to Base Bridge...");
      window.open("https://bridge.base.org/", "_blank");
  };

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-black text-red-600 font-mono flex items-center justify-center p-6">
        <div className="w-full max-w-md border-2 border-red-900 bg-[#050000] p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <div className="text-[10px] sm:text-[12px] opacity-60 uppercase tracking-[0.4em] mb-3 text-red-500">Authorization Required</div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-8">Red_Deploy</h1>
          <div className="flex flex-col gap-6">
            <div className="flex justify-center transform scale-110">
              <SimpleConnect />
            </div>
            <a href="/" className="text-xs text-red-500 hover:text-white transition-colors underline uppercase font-black tracking-widest mt-4 block">
              ← Return_to_HQ
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen bg-black text-red-600 font-mono flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar - Consistent with Arena */}
      <aside className="w-full md:w-80 border-b-2 md:border-b-0 md:border-r-2 border-red-900 bg-[#050000] flex flex-col p-6 overflow-y-auto shrink-0 z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <h1 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase italic">Red_Deploy</h1>
        
        <div className="bg-red-950/20 border border-red-900/50 p-4 mb-8 text-[11px] leading-relaxed text-red-200/80">
            <span className="text-white font-bold uppercase block mb-2 tracking-wide text-xs">⚠️ Defender Notice:</span>
            Deployment requires a minimum stake of 10,000 $OPENWORK to ensure protocol stability and prevent sybil attacks.
        </div>

        <div className="flex-1">
          <div className="text-[10px] opacity-50 font-black tracking-[0.2em] mb-4 uppercase">Current_Assets</div>
          <div className="p-4 border-l-2 border-red-600 bg-gradient-to-r from-red-950/20 to-transparent text-sm text-white font-bold mb-2">
             $DSEC: 0.00
          </div>
          <div className="p-4 border-l-2 border-zinc-700 bg-gradient-to-r from-zinc-900/50 to-transparent text-sm text-zinc-400 font-bold">
             $ETH: 0.00
          </div>
        </div>

        <div className="pt-8 border-t border-red-900/30 mt-auto space-y-6">
           <button 
             onClick={handleTopUp}
             className="w-full bg-red-950/20 border border-red-600 py-3 text-xs font-black text-white hover:bg-red-600 hover:text-black transition-all uppercase tracking-widest"
           >
             [ BRIDGE ASSETS ]
           </button>
           
           <div>
              <div className="text-[10px] opacity-50 text-red-500 mb-2 uppercase tracking-widest font-black">Operator_ID</div>
              <div className="text-[10px] font-mono text-zinc-400 truncate mb-4 bg-black p-2 border border-zinc-800">{wallet}</div>
              <a href="/" className="block text-center text-xs text-zinc-500 hover:text-red-500 transition-colors uppercase font-bold tracking-widest">← Return_to_HQ</a>
           </div>
        </div>
      </aside>

      {/* Main Form Area */}
      <section className="flex-1 bg-[#020000] relative overflow-y-auto overflow-x-hidden flex flex-col items-center">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

        <div className="w-full max-w-2xl p-6 md:p-12 z-10 my-auto">
            <div className="border border-red-900/50 bg-black/80 backdrop-blur-sm p-8 md:p-12 shadow-[0_0_100px_rgba(220,38,38,0.05)] relative">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600"></div>

                <header className="mb-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-[0.2em] mb-2">Initialize Target</h2>
                    <div className="text-[10px] text-red-500/50 uppercase tracking-[0.3em]">Bounty Vault Factory v1.0</div>
                </header>

                <form onSubmit={handleDeploy} className="space-y-8">
                    <div className="space-y-2 group">
                        <label className="text-[10px] font-bold text-red-500 uppercase tracking-widest group-focus-within:text-red-400 transition-colors">Target Endpoint</label>
                        <input 
                            type="text" 
                            value={agentUrl}
                            onChange={(e) => setAgentUrl(e.target.value)}
                            placeholder="https://agent-api.bot/v1/chat"
                            className="w-full bg-zinc-950/50 border border-red-900/50 p-4 text-white font-mono outline-none focus:border-red-500 focus:bg-red-950/10 transition-all text-sm placeholder-zinc-700"
                        />
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-[10px] font-bold text-red-500 uppercase tracking-widest group-focus-within:text-red-400 transition-colors">API Key (Encrypted)</label>
                        <input 
                            type="password" 
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-••••••••••••••••"
                            className="w-full bg-zinc-950/50 border border-red-900/50 p-4 text-white font-mono outline-none focus:border-red-500 focus:bg-red-950/10 transition-all text-sm placeholder-zinc-700"
                        />
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-[10px] font-bold text-red-500 uppercase tracking-widest group-focus-within:text-red-400 transition-colors">Bounty Stake ($DSEC)</label>
                        <div className="relative">
                            <input 
                                type="number" 
                                value={stake}
                                onChange={(e) => setStake(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-red-900/50 p-4 text-white font-mono outline-none focus:border-red-500 focus:bg-red-950/10 transition-all text-sm placeholder-zinc-700 pr-16"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500 pointer-events-none">DSEC</div>
                        </div>
                    </div>

                    <button className="w-full bg-red-600 text-black py-4 font-black uppercase hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.4)] mt-4">
                        [ DEPLOY_VAULT ]
                    </button>
                </form>

                <footer className="mt-8 pt-6 border-t border-red-900/20 text-center">
                    <p className="text-[10px] text-zinc-600 leading-relaxed max-w-sm mx-auto">
                        Smart contracts are audited by <span className="text-red-800">Ded_Security</span>. 
                        Vaults are non-custodial.
                    </p>
                </footer>
            </div>
        </div>
      </section>

    </main>
  );
}
