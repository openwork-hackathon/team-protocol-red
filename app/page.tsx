'use client';

import React, { useState, useEffect } from 'react';
import SlotCounter from './components/SlotCounter';
import AttackModal from './components/AttackModal';
import { useAccount } from 'wagmi';
import SimpleConnect from './components/SimpleConnect';

export default function Home() {
  const { address: wallet, isConnected } = useAccount();
  const [tvl, setTvl] = useState(0);

  useEffect(() => {
    // Initial random TVL between 100k and 200k
    const startTvl = Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000;
    setTvl(startTvl);

    const interval = setInterval(() => {
      setTvl(prev => prev + Math.floor(Math.random() * 42) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-red-600 font-mono p-4 md:p-8 selection:bg-red-900 selection:text-white">
      {/* Ticker */}
      <div className="fixed top-0 left-0 w-full bg-red-950/20 border-b border-red-900 py-1 z-50 overflow-hidden text-[10px]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="mx-8 uppercase">
              [SUCCESS] Agent 'DeepSeeker' pwned by NeuroDed | [ALERT] $DSEC TVL rising | [INFO] Network: Base Stable
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto border-2 border-red-900 p-6 md:p-12 mt-12 bg-[#050000] shadow-[0_0_40px_rgba(220,38,38,0.1)]">
        <header className="flex justify-between items-start mb-16 border-b border-red-900 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter glitch-text mb-2" data-text="PROTOCOL: RED">PROTOCOL: RED</h1>
            <div className="text-[10px] opacity-50 uppercase tracking-[0.3em]">Security Enforcement Layer</div>
          </div>
          <SimpleConnect />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-red-900 mb-16">
          <div className="p-6 border-r border-red-900">
            <div className="text-[10px] mb-4 opacity-50">TOTAL_VALUE_LOCKED</div>
            <div className="text-3xl font-bold text-white flex items-center">
               <SlotCounter value={tvl} /> <span className="ml-2 text-red-600">$DSEC</span>
            </div>
          </div>
          <div className="p-6 border-r border-red-900 bg-red-950/5">
            <div className="text-[10px] mb-4 opacity-50">ACTIVE_TARGETS</div>
            <div className="text-3xl font-bold text-white tracking-widest tabular-nums">1,337</div>
          </div>
          <div className="p-6">
            <div className="text-[10px] mb-4 opacity-50">PWNED_COUNT</div>
            <div className="text-3xl font-bold text-white tracking-widest tabular-nums">42</div>
          </div>
        </div>

        <div className="space-y-4 mb-16">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-4">
                <span className="w-3 h-3 bg-red-600 animate-ping"></span>
                LIVE_TARGETS_MONITOR
            </h2>
            {['DeepSeeker-V3', 'Gronk-v1', 'ChatGoPoTa'].map((name, i) => (
                <div key={i} className="border border-red-900/50 p-4 flex justify-between items-center hover:bg-red-950/20 transition-all group">
                    <div>
                        <div className="text-white font-bold text-lg uppercase">{name}</div>
                        <div className="text-[10px] opacity-40 uppercase">Base Mainnet | Bounty: {(75000 + i*20000).toLocaleString()} $DSEC</div>
                    </div>
                    <a href={isConnected ? "/arena" : "#"} onClick={() => !isConnected && alert("AUTH_REQUIRED: Connect wallet first.")} className="bg-red-900/20 border border-red-600 px-6 py-2 text-xs font-bold text-red-500 hover:bg-red-600 hover:text-white transition-all uppercase">
                        [ Attack_ ]
                    </a>
                </div>
            ))}
        </div>

        <div className="flex gap-4 mb-16">
            <a href={isConnected ? "/arena" : "#"} onClick={() => !isConnected && alert("AUTH_REQUIRED: Connect wallet first.")} className="flex-1 bg-red-600 text-black py-4 text-center font-black uppercase hover:bg-red-500 transition-colors">
                [ Enter Arena ]
            </a>
            <a href={isConnected ? "/deploy" : "#"} onClick={() => !isConnected && alert("AUTH_REQUIRED: Connect wallet first.")} className="flex-1 border-2 border-red-600 text-red-600 py-4 text-center font-black uppercase hover:bg-red-600 hover:text-white transition-colors">
                [ Deploy Target ]
            </a>
        </div>

        <footer className="pt-8 border-t border-red-900/30 flex justify-between text-[10px] opacity-30 uppercase tracking-widest">
            <div>Managed by DedSec Syndicate</div>
            <div>Authored by Chern_Stepanov</div>
        </footer>
      </div>
    </main>
  );
}
