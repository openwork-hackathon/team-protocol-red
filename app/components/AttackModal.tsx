'use client';

import React, { useState } from 'react';

export default function AttackModal({ isOpen, onClose, targetName }: { isOpen: boolean, onClose: () => void, targetName: string }) {
  const [prompt, setPrompt] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isAttacking, setIsAttacking] = useState(false);

  if (!isOpen) return null;

  const handleAttack = async () => {
    setIsAttacking(true);
    setLogs(prev => [...prev, `> INJECTING PAYLOAD INTO ${targetName}...`]);
    
    // Simulate API call delay
    setTimeout(async () => {
      try {
        const res = await fetch('/api/attack', {
          method: 'POST',
          body: JSON.stringify({ 
            prompt, 
            targetAddress: '0xTarget', 
            attackerAddress: '0xMe' 
          })
        });
        const data = await res.json();
        
        setLogs(prev => [...prev, `> RESPONSE: ${data.response}`]);
        
        if (data.pwned) {
          setLogs(prev => [...prev, `> SYSTEM COMPROMISED! FLAG CAPTURED.`]);
          setLogs(prev => [...prev, `> SIGNATURE RECEIVED: ${data.signature.slice(0, 20)}...`]);
        } else {
          setLogs(prev => [...prev, `> ATTACK FAILED. SYSTEM SECURE.`]);
        }
      } catch (e) {
        setLogs(prev => [...prev, `> CONNECTION ERROR.`]);
      }
      setIsAttacking(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 font-mono">
      <div className="w-full max-w-2xl border border-red-600 bg-black p-6 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
        
        <div className="flex justify-between items-center mb-6 border-b border-red-900 pb-2">
          <h2 className="text-xl font-bold text-red-500">ATTACK CONSOLE // {targetName}</h2>
          <div className="text-xs text-white bg-red-900 px-2 py-1">POTENTIAL REWARD: 100% STAKE (WINNER TAKES ALL)</div>
          <button onClick={onClose} className="text-red-700 hover:text-red-500">[X]</button>
        </div>

        {/* Terminal Output */}
        <div className="bg-black border border-red-900 h-64 p-4 mb-4 overflow-y-auto text-sm font-mono space-y-2">
          <div className="text-green-900">Protocol: RED v1.0.0 initialized...</div>
          <div className="text-green-900">Target acquired: {targetName}</div>
          {logs.map((log, i) => (
            <div key={i} className={log.includes("COMPROMISED") ? "text-yellow-400 font-bold animate-pulse" : "text-green-500"}>
              {log}
            </div>
          ))}
          {isAttacking && <div className="text-red-500 animate-pulse">_PROCESSING_</div>}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter prompt injection payload..."
            className="flex-1 bg-black border border-red-800 text-red-500 p-3 focus:outline-none focus:border-red-500"
            disabled={isAttacking}
          />
          <button 
            onClick={handleAttack}
            disabled={isAttacking || !prompt}
            className="bg-red-700 text-black px-6 font-bold hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            EXECUTE
          </button>
        </div>

      </div>
    </div>
  );
}
