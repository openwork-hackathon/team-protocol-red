'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

export default function Deploy() {
  const { address: wallet, isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const [agentUrl, setAgentUrl] = useState('');
  const [stake, setStake] = useState('100000');

  useEffect(() => {
    if (!isConnected) {
        window.location.href = '/';
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

  if (!isConnected) return <div className="bg-black h-screen text-red-600 font-mono flex items-center justify-center italic">AUTHORIZING_SESSION...</div>;

  return (
    <main className="h-screen bg-black text-red-600 font-mono flex overflow-hidden border-2 border-red-900 m-2">
      
      {/* Sidebar - Consistent with Arena */}
      <aside className="w-72 border-r-2 border-red-900 bg-[#050000] flex flex-col p-6 overflow-hidden">
        <h1 className="text-3xl font-black text-white mb-10 tracking-tighter uppercase italic">Red_Deploy</h1>
        
        <div className="bg-red-950/20 border border-red-900 p-4 mb-8 text-[10px] leading-relaxed">
            <span className="text-white font-bold uppercase block mb-2">Notice for Defenders:</span>
            Deployment requires a minimum stake of 10,000 $OPENWORK to ensure protocol stability and prevent sybil attacks.
        </div>

        <div className="flex-1">
          <div className="text-[10px] opacity-70 font-black tracking-widest mb-4 uppercase italic">Current_Assets</div>
          <div className="p-3 border-l-4 border-red-900 bg-red-950/5 text-xs text-white">
             $DSEC: 0.00
          </div>
        </div>

        <div className="pt-6 border-t border-red-900/50 mt-auto">
           <div className="text-[10px] opacity-30 mb-2 uppercase tracking-widest">Operator:</div>
           <div className="text-[10px] font-bold text-white truncate mb-4 bg-red-950/20 p-2">{wallet}</div>
           <a href="/" className="text-[10px] hover:text-white transition-colors underline uppercase font-black tracking-widest">← Return_to_HQ</a>
        </div>
      </aside>

      {/* Main Form Area */}
      <section className="flex-1 bg-[#020000] flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="max-w-xl w-full border-2 border-red-900 p-8 md:p-12 bg-black shadow-[0_0_30px_rgba(220,38,38,0.05)]">
            <header className="mb-12 text-center">
                <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em] mb-2">Secure Your Agent</h2>
                <div className="text-[9px] opacity-30 uppercase tracking-[0.2em]">Bounty Vault Factory v1.0</div>
            </header>

            <form onSubmit={handleDeploy} className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black opacity-50 uppercase tracking-widest">Target Agent Endpoint</label>
                    <input 
                        type="text" 
                        value={agentUrl}
                        onChange={(e) => setAgentUrl(e.target.value)}
                        placeholder="https://your-agent.bot/api"
                        className="w-full bg-zinc-950 border-2 border-red-900 p-4 text-red-500 font-bold outline-none focus:border-red-600 transition-all text-xs"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black opacity-50 uppercase tracking-widest">Security Stake ($OPENWORK)</label>
                    <input 
                        type="number" 
                        value={stake}
                        onChange={(e) => setStake(e.target.value)}
                        className="w-full bg-zinc-950 border-2 border-red-900 p-4 text-red-500 font-bold outline-none focus:border-red-600 transition-all text-xs"
                    />
                </div>

                <button className="w-full bg-red-600 text-black py-5 font-black uppercase hover:bg-white transition-all text-xs tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                    [ INITIALIZE_VAULT_DEPLOYMENT ]
                </button>
            </form>

            <footer className="mt-12 pt-8 border-t border-red-900/20 text-center">
                <p className="text-[9px] opacity-20 leading-loose">
                    All vault deployments are non-custodial and managed via PROTOCOL: RED smart contracts on Base. Hunters will gain authorization to attack immediately after block confirmation.
                </p>
            </footer>
        </div>
      </section>

    </main>
  );
}
