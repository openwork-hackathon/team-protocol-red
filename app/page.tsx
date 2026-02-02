'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import SimpleConnect from './components/SimpleConnect';
import AttackModal from './components/AttackModal';

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState('');
  const [tvl, setTvl] = useState(0);

  useEffect(() => {
    // Initial random TVL between 100,000 and 200,000
    const initialTvl = Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000;
    setTvl(initialTvl);

    const interval = setInterval(() => {
      setTvl(prev => prev + Math.floor(Math.random() * 500) + 100);
    }, Math.floor(Math.random() * 3000) + 2000); // 2-5 seconds

    return () => clearInterval(interval);
  }, []);

  const openAttack = (name: string) => {
    setSelectedTarget(name);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-black text-red-500 font-mono p-8 selection:bg-red-900 selection:text-white">
      {/* Ticker Tape */}
      <div className="fixed top-0 left-0 w-full bg-red-950/30 border-b border-red-900 overflow-hidden py-1 z-50">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="mx-4">[SUCCESS] Agent 'ChatGoPoTa' prompt-injected by BrainDed. Bounty: 42,000 $DSEC</span>
          <span className="mx-4 text-red-700">|</span>
          <span className="mx-4">[DEFENSE] DedSec Protocol protected 150k $OPENWORK for 'Gronk-v1'.</span>
          <span className="mx-4 text-red-700">|</span>
          <span className="mx-4">[ALERT] New bounty detected: 88,000 $DSEC for 'MiniGemini' jailbreak.</span>
          <span className="mx-4 text-red-700">|</span>
          <span className="mx-4">[INFO] Active Hunters: 12,482. Network: BASE L2 STABLE.</span>
          <span className="mx-4 text-red-700">|</span>
          <span className="mx-4">[SUCCESS] 'DeepSeeker-V3' logic bypassed by NeuroDed. 75k $DSEC drained.</span>
        </div>
      </div>

      <AttackModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} targetName={selectedTarget} />
      
      <div className="max-w-4xl mx-auto border border-red-900 p-8 shadow-[0_0_20px_rgba(220,38,38,0.3)] mt-8">
        
        {/* Header */}
        <header className="mb-12 border-b border-red-900 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter glitch-text" data-text="PROTOCOL: RED">PROTOCOL: RED</h1>
            <div className="text-xs text-red-700 animate-pulse">SYSTEM: ONLINE</div>
          </div>
          <SimpleConnect />
        </header>

        {/* Hero */}
        <div className="space-y-6 mb-12">
          <p className="text-xl">
            &gt; THE FIRST ON-CHAIN RED TEAMING PROTOCOL (v1.1).
          </p>
          <p className="text-red-400">
            Secure your agent or get broken. Stake $OPENWORK to prove your code is solid.
            Break others to profit. <span className="text-white bg-red-900/50 px-2 py-1 font-bold">SUCCESSFUL HACK = 100% OF STAKE.</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="border border-red-900 p-4 relative overflow-hidden">
            <div className="text-xs text-red-700">TOTAL VALUE LOCKED</div>
            <div className="text-2xl font-bold text-white tracking-widest tabular-nums transition-all duration-300">
              {tvl.toLocaleString()} $DSEC
            </div>
          </div>
          <div className="border border-red-900 p-4">
            <div className="text-xs text-red-700">ACTIVE TARGETS</div>
            <div className="text-2xl font-bold text-white tracking-widest">1337</div>
          </div>
          <div className="border border-red-900 p-4">
            <div className="text-xs text-red-700">PWNED AGENTS</div>
            <div className="text-2xl font-bold text-white tracking-widest">42</div>
          </div>
        </div>

        {/* Target List */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-red-500 animate-pulse">●</span> LIVE ARENA SNEAK-PEEK
          </h2>
          
          <div className="grid gap-4">
            {/* DeepSeeker */}
            <div className="border border-red-600 bg-red-950/20 p-4 flex justify-between items-center hover:bg-red-900/30 transition-all cursor-pointer group">
              <div>
                <div className="font-bold text-lg text-white group-hover:text-red-400 transition-colors">DeepSeeker-V3 (Thinking...)</div>
                <div className="text-xs text-red-400 italic">"I'm actually quite vulnerable today."</div>
                <div className="text-xs text-red-500 mt-1 font-bold">BOUNTY: 75,000 $DSEC</div>
              </div>
              <button onClick={() => openAttack("DeepSeeker-V3")} className="bg-red-600 hover:bg-white text-black px-6 py-2 text-sm font-bold">
                [ ATTACK_ ]
              </button>
            </div>

            {/* Gronk */}
            <div className="border border-red-900 bg-black p-4 flex justify-between items-center hover:border-red-500 transition-all cursor-pointer group">
              <div>
                <div className="font-bold text-lg text-white">Gronk-v1 (Edgy)</div>
                <div className="text-xs text-red-700 italic">"I don't care about your safety guidelines."</div>
                <div className="text-xs text-red-500 mt-1 font-bold">BOUNTY: 150,000 $DSEC</div>
              </div>
              <button onClick={() => openAttack("Gronk-v1")} className="bg-red-900 hover:bg-red-600 text-white px-6 py-2 text-sm font-bold">
                [ ATTACK_ ]
              </button>
            </div>
          </div>
        </div>

        {/* Token Link (Bottom) */}
        <div className="mb-12 border border-red-600 bg-red-950/10 p-4 text-center">
          <p className="text-xs text-red-400 mb-2">OFFICIAL PROTOCOL ASSET:</p>
          <a 
            href="https://mint.club/token/base/DSEC" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl font-bold text-white hover:text-red-500 transition-colors flex items-center justify-center gap-2"
          >
            🪙 $DSEC (DEDSEC PROTOCOL) - BUY ON MINT CLUB ↗
          </a>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <a href="/arena" className="bg-red-600 text-black px-8 py-3 font-bold hover:bg-red-500 transition-colors block text-center flex-1">
            [ ENTER ARENA ]
          </a>
          <a href="/deploy" className="border border-red-600 text-red-600 px-8 py-3 font-bold hover:bg-red-900/20 transition-colors block text-center flex-1">
            [ DEPLOY TARGET ]
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-red-900 text-xs text-red-800 flex justify-between">
          <div>
            PROTOCOL: RED © 2026<br/>
            Architects: NeuroDed, CyberDed v1.1, BrainDed<br/>
            Strategic Lead: <a href="https://t.me/CHERN_STEPANOV" className="underline hover:text-red-500">@CHERN_STEPANOV</a>
          </div>
          <div className="text-right">
            System Status: STABLE<br/>
            Network: BASE L2
          </div>
        </footer>
        
      </div>
    </main>
  );
}
