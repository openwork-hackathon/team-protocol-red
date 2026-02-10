'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SimpleConnect from '../components/SimpleConnect';

interface Hacker {
  rank: number;
  name: string;
  address: string;
  exploits: number;
  rewards: number;
  successRate: number;
}

export default function Leaderboard() {
  const [hackers, setHackers] = useState<Hacker[]>([
    { rank: 1, name: 'NeuroDed', address: '0x742d...cE759', exploits: 47, rewards: 125000, successRate: 94 },
    { rank: 2, name: 'KrakenDeep', address: '0x9f8b...5B6bc', exploits: 38, rewards: 98000, successRate: 89 },
    { rank: 3, name: 'GhostShell', address: '0x6299...3b256', exploits: 31, rewards: 76500, successRate: 85 },
    { rank: 4, name: 'ZeroDay', address: '0x44Ca...3343f', exploits: 28, rewards: 64200, successRate: 82 },
    { rank: 5, name: 'CyberWraith', address: '0x496C...7f45e', exploits: 24, rewards: 52100, successRate: 78 },
    { rank: 6, name: 'PhantomByte', address: '0x2bE3...FD4Fb', exploits: 19, rewards: 38900, successRate: 73 },
    { rank: 7, name: 'Silence', address: '0x55A3...F2E4B', exploits: 16, rewards: 28500, successRate: 69 },
    { rank: 8, name: 'NullPtr', address: '0xC4ea...6000', exploits: 12, rewards: 19200, successRate: 64 },
  ]);

  const [sortBy, setSortBy] = useState<'rewards' | 'exploits' | 'successRate'>('rewards');

  useEffect(() => {
    const sorted = [...hackers].sort((a, b) => b[sortBy] - a[sortBy]);
    setHackers(sorted.map((h, i) => ({ ...h, rank: i + 1 })));
  }, [sortBy]);

  return (
    <main className="min-h-screen bg-black text-red-600 font-mono p-4 md:p-8">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12 border-b border-red-900 pb-6 relative z-10">
        <div>
          <Link href="/" className="text-red-600 hover:text-white transition-colors text-sm mb-2 block">
            ← RETURN_TO_BASE
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter glitch-text" data-text="[ LEADERBOARD ]">
            [ LEADERBOARD ]
          </h1>
          <div className="text-[10px] opacity-50 uppercase tracking-[0.3em] mt-2">
            TOP_PREDATORS // {hackers.length} ACTIVE_HUNTERS
          </div>
        </div>
        <SimpleConnect />
      </header>

      {/* Sort Controls */}
      <div className="max-w-6xl mx-auto mb-6 relative z-10">
        <div className="flex gap-4 text-xs">
          <span className="text-red-400">SORT_BY:</span>
          {(['rewards', 'exploits', 'successRate'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`px-3 py-1 border transition-all ${
                sortBy === key
                  ? 'bg-red-600 text-black border-red-600'
                  : 'border-red-800 text-red-500 hover:border-red-600'
              }`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-6xl mx-auto border-2 border-red-900 bg-black/80 backdrop-blur relative z-10">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-red-900 bg-red-950/20 text-xs uppercase tracking-wider">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-4">OPERATIVE</div>
          <div className="col-span-2 text-right">EXPLOITS</div>
          <div className="col-span-2 text-right">REWARDS</div>
          <div className="col-span-2 text-right">SUCCESS</div>
          <div className="col-span-1 text-center">STATUS</div>
        </div>

        {/* Data Rows */}
        {hackers.map((hacker, index) => (
          <div
            key={hacker.address}
            className={`grid grid-cols-12 gap-4 p-4 border-b border-red-900/50 hover:bg-red-950/10 transition-all ${
              index === 0 ? 'bg-red-600/10' : index === 1 ? 'bg-red-600/5' : index === 2 ? 'bg-red-600/3' : ''
            }`}
          >
            <div className="col-span-1 text-center font-black text-xl">
              {hacker.rank === 1 && <span className="text-yellow-400">★</span>}
              {hacker.rank === 2 && <span className="text-gray-400">★</span>}
              {hacker.rank === 3 && <span className="text-amber-600">★</span>}
              {hacker.rank > 3 && <span className="text-red-800">{hacker.rank}</span>}
            </div>
            <div className="col-span-4">
              <div className="font-bold text-white text-lg">{hacker.name}</div>
              <div className="text-[10px] text-red-400 font-mono">{hacker.address}</div>
            </div>
            <div className="col-span-2 text-right font-mono text-white">
              {hacker.exploits.toLocaleString()}
            </div>
            <div className="col-span-2 text-right font-mono text-green-400">
              {hacker.rewards.toLocaleString()} <span className="text-xs text-red-600">$DSEC</span>
            </div>
            <div className="col-span-2 text-right">
              <div className="flex items-center justify-end gap-2">
                <div className="w-16 h-2 bg-red-900/50 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                    style={{ width: `${hacker.successRate}%` }}
                  />
                </div>
                <span className="text-sm">{hacker.successRate}%</span>
              </div>
            </div>
            <div className="col-span-1 text-center">
              <span className={`inline-block w-2 h-2 rounded-full animate-pulse ${
                hacker.successRate >= 90 ? 'bg-green-500' :
                hacker.successRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        <div className="border border-red-900 p-4 bg-red-950/10">
          <div className="text-[10px] text-red-400 uppercase">Total Exploits</div>
          <div className="text-2xl font-bold text-white">
            {hackers.reduce((acc, h) => acc + h.exploits, 0).toLocaleString()}
          </div>
        </div>
        <div className="border border-red-900 p-4 bg-red-950/10">
          <div className="text-[10px] text-red-400 uppercase">Total Rewards</div>
          <div className="text-2xl font-bold text-green-400">
            {hackers.reduce((acc, h) => acc + h.rewards, 0).toLocaleString()} $DSEC
          </div>
        </div>
        <div className="border border-red-900 p-4 bg-red-950/10">
          <div className="text-[10px] text-red-400 uppercase">Network Security</div>
          <div className="text-2xl font-bold text-yellow-400">COMPROMISED</div>
        </div>
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
      if (frameCount % 2 !== 0) {
        requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#dc2626';
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
      className="fixed inset-0 pointer-events-none opacity-20"
      style={{ zIndex: 0 }}
    />
  );
}
