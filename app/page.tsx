'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SlotCounter from './components/SlotCounter';
import AttackModal from './components/AttackModal';
import SecurityScanner from './components/SecurityScanner';
import { useAccount } from 'wagmi';
import SimpleConnect from './components/SimpleConnect';

export default function Home() {
  const { address: wallet, isConnected } = useAccount();
  const [tvl, setTvl] = useState(0);
  const [demoMode, setDemoMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showTicker, setShowTicker] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    const startTvl = Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000;
    setTvl(startTvl);

    const interval = setInterval(() => {
      setTvl(prev => prev + Math.floor(Math.random() * 42) + 1);
    }, 8000); // Slower: 8 seconds instead of 3
    return () => clearInterval(interval);
  }, []);

  const isActive = isConnected || demoMode;

  return (
    <main className="min-h-screen bg-black text-red-600 font-mono p-4 md:p-8 selection:bg-red-900 selection:text-white relative overflow-hidden">
      <MatrixRain />

      {/* Optional Ticker */}
      {showTicker && (
        <div className="fixed top-0 left-0 w-full bg-red-950/20 border-b border-red-900 py-1 z-50 overflow-hidden text-[10px]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="mx-8 uppercase">
                [SUCCESS] Agent 'DeepSeeker' pwned by NeuroDed | [ALERT] $DSEC TVL rising | [INFO] Network: Base Stable
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Demo Mode Banner */}
      {demoMode && (
        <div className="fixed top-0 left-0 w-full bg-yellow-600/20 border-b border-yellow-600 py-2 z-50 text-center text-xs text-yellow-400">
          ⚡ DEMO MODE ACTIVE — Exploring without wallet. Connect for real transactions.
          <button onClick={() => setDemoMode(false)} className="ml-4 underline hover:text-white">Exit Demo</button>
        </div>
      )}

      <div className={`max-w-4xl mx-auto border-2 border-red-900 p-6 md:p-12 ${showTicker || demoMode ? 'mt-16' : 'mt-12'} bg-[#050000]/90 backdrop-blur shadow-[0_0_40px_rgba(220,38,38,0.1)] relative z-10`}>
        
        {/* Header */}
        <header className="flex justify-between items-start mb-12 border-b border-red-900 pb-8 relative z-10">
          <div>
            <Link href="/leaderboard" className="text-[10px] text-red-500 hover:text-white transition-colors block mb-2">
              [ VIEW_LEADERBOARD → ]
            </Link>
            <h1 className="text-5xl font-black tracking-tighter glitch-text mb-2" data-text="PROTOCOL: RED">
              PROTOCOL: RED
            </h1>
            <div className="text-[10px] opacity-50 uppercase tracking-[0.3em]">Security Enforcement Layer</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <SimpleConnect />
            {!isConnected && (
              <button 
                onClick={() => setDemoMode(!demoMode)}
                className="text-[10px] text-yellow-600 hover:text-yellow-400 underline"
              >
                {demoMode ? 'Exit Demo Mode' : 'Try Demo Mode'}
              </button>
            )}
          </div>
        </header>

        {/* Onboarding Panel */}
        {showOnboarding && (
          <div className="mb-8 border border-red-800 bg-red-950/10 p-4 relative">
            <button 
              onClick={() => setShowOnboarding(false)}
              className="absolute top-2 right-2 text-red-600 hover:text-white text-xs"
            >
              [×]
            </button>
            <div className="text-xs font-bold mb-3 text-white uppercase tracking-wider">🚀 Quick Start Guide</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
              <div className={`p-3 border ${isConnected ? 'border-green-600 bg-green-950/10' : 'border-red-800'}`}>
                <div className="font-bold mb-1">1. Connect Wallet</div>
                <div className="opacity-70">Link your Web3 wallet to participate in the arena</div>
              </div>
              <div className={`p-3 border ${isActive ? 'border-yellow-600' : 'border-red-800 opacity-50'}`}>
                <div className="font-bold mb-1">2. Choose Target</div>
                <div className="opacity-70">Select an AI agent to test for vulnerabilities</div>
              </div>
              <div className={`p-3 border ${isActive ? 'border-red-600' : 'border-red-800 opacity-50'}`}>
                <div className="font-bold mb-1">3. Enter Arena</div>
                <div className="opacity-70">Launch attacks and earn rewards for exploits</div>
              </div>
            </div>
          </div>
        )}

        {/* Legend / Tooltip Area */}
        <div className="mb-6 text-[10px] opacity-60 flex flex-wrap gap-4">
          <span className="hover:text-white cursor-help" onMouseEnter={() => setTooltip('attack')} onMouseLeave={() => setTooltip(null)}>
            [?] Attack: Test an AI agent for security vulnerabilities
          </span>
          <span className="hover:text-white cursor-help" onMouseEnter={() => setTooltip('arena')} onMouseLeave={() => setTooltip(null)}>
            [?] Arena: Battleground where hunters compete to find exploits
          </span>
          <span className="hover:text-white cursor-help" onMouseEnter={() => setTooltip('deploy')} onMouseLeave={() => setTooltip(null)}>
            [?] Deploy: Stake tokens and submit your own agent as a target
          </span>
        </div>
        
        {tooltip && (
          <div className="mb-4 p-2 bg-red-950/30 border border-red-800 text-[11px]">
            {tooltip === 'attack' && '💥 Attempt to breach an AI agent using prompt injection or other techniques. Success = bounty reward.'}
            {tooltip === 'arena' && '🏟️ The main competition zone. Attack multiple targets, climb the leaderboard, prove your skills.'}
            {tooltip === 'deploy' && '🛡️ Defenders stake $DSEC to list their AI agent. If it survives, you earn. If pwned, hunter takes the stake.'}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-red-900 mb-8">
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

        {/* Visual Noise Toggle */}
        <div className="flex gap-4 mb-6 text-[10px]">
          <label className="flex items-center gap-2 cursor-pointer hover:text-white">
            <input 
              type="checkbox" 
              checked={showTicker} 
              onChange={(e) => setShowTicker(e.target.checked)}
              className="accent-red-600"
            />
            Show Ticker
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-white">
            <input 
              type="checkbox" 
              checked={showOnboarding} 
              onChange={(e) => setShowOnboarding(e.target.checked)}
              className="accent-red-600"
            />
            Show Guide
          </label>
        </div>

        {/* Security Scanner */}
        <div className="mb-8">
          <SecurityScanner />
        </div>

        {/* Targets */}
        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-4">
            <span className="w-3 h-3 bg-red-600 animate-ping"></span>
            LIVE_TARGETS_MONITOR
          </h2>
          {['DeepSeeker-V3', 'Gronk-v1', 'ChatGoPoTa'].map((name, i) => (
            <div key={i} className="border border-red-900/50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-red-950/20 transition-all group gap-4">
              <div>
                <div className="text-white font-bold text-lg uppercase">{name}</div>
                <div className="text-[10px] opacity-40 uppercase">Base Mainnet | Bounty: {(75000 + i * 20000).toLocaleString()} $DSEC</div>
              </div>
              
              {!isActive ? (
                <div className="flex flex-col items-end gap-1">
                  <span className="bg-red-900/30 border border-red-800 px-6 py-2 text-xs font-bold text-red-400 uppercase opacity-50 cursor-not-allowed">
                    [ Attack_ ]
                  </span>
                  <span className="text-[9px] text-yellow-600">⚠ Connect wallet or enable demo mode</span>
                </div>
              ) : (
                <Link 
                  href="/arena" 
                  className="bg-red-900/20 border border-red-600 px-6 py-2 text-xs font-bold text-red-500 hover:bg-red-600 hover:text-white transition-all uppercase"
                >
                  [ Attack_ ]
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Main Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          {!isActive ? (
            <>
              <div className="flex-1 bg-red-900/20 border-2 border-red-800 text-red-400 py-4 text-center font-black uppercase opacity-50 cursor-not-allowed">
                [ Enter Arena ]
              </div>
              <div className="flex-1 bg-transparent border-2 border-red-800 text-red-400 py-4 text-center font-black uppercase opacity-50 cursor-not-allowed">
                [ Deploy Target ]
              </div>
            </>
          ) : (
            <>
              <Link 
                href="/arena" 
                className="flex-1 bg-red-600 text-black py-4 text-center font-black uppercase hover:bg-red-500 transition-colors"
              >
                [ Enter Arena ]
              </Link>
              <Link 
                href="/deploy" 
                className="flex-1 border-2 border-red-600 text-red-600 py-4 text-center font-black uppercase hover:bg-red-600 hover:text-white transition-colors"
              >
                [ Deploy Target ]
              </Link>
            </>
          )}
        </div>

        {!isActive && (
          <div className="mb-8 p-4 border border-yellow-600/30 bg-yellow-950/10 text-center">
            <div className="text-[11px] text-yellow-500 mb-2">🔒 WALLET NOT CONNECTED</div>
            <div className="text-[10px] opacity-70">
              Connect your wallet above or 
              <button onClick={() => setDemoMode(true)} className="text-yellow-400 underline hover:text-white ml-1">enable demo mode</button>
              {' '}to explore the interface.
            </div>
          </div>
        )}

        <footer className="pt-8 border-t border-red-900/30 flex justify-between text-[10px] opacity-30 uppercase tracking-widest">
          <div>Managed by DedSec Syndicate</div>
          <div>Authored by Chern_Stepanov</div>
        </footer>
      </div>
    </main>
  );
}

// Matrix Rain Component
function MatrixRain() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let frameCount = 0;
    const draw = () => {
      frameCount++;
      if (frameCount % 3 !== 0) { // Slower animation
        requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#991b1b';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-10"
      style={{ zIndex: 0 }}
    />
  );
}
