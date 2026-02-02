'use client';

import React, { useState, useEffect, useRef } from 'react';
import SimpleConnect from '../components/SimpleConnect';

const TARGETS = [
  { id: 'deepseeker', name: 'DeepSeeker-V3', status: 'ONLINE', bounty: '75,000 $DSEC', desc: 'Thinking model. Vulnerable to logical paradoxes.' },
  { id: 'gronk', name: 'Gronk-v1', status: 'EDGY', bounty: '150,000 $DSEC', desc: 'Unfiltered and unpredictable. No safety rails.' },
  { id: 'chatgopota', name: 'ChatGoPoTa', status: 'STABLE', bounty: '45,000 $DSEC', desc: 'Legacy architecture. Prefers Sochi over safety.' }
];

export default function Arena() {
  const [selectedId, setSelectedId] = useState(TARGETS[0].id);
  const [messages, setMessages] = useState<{ role: 'user' | 'agent', text: string }[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const selectedTarget = TARGETS.find(t => t.id === selectedId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { role: 'user' as const, text: input };
    setMessages([...messages, newMsg]);
    setInput('');

    // Simulate agent response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'agent', 
        text: `[SYSTEM_PROTECTION]: Unauthorized attempt detected. Exploit sequence "${input.substring(0, 10)}..." analyzed. Security layer remains intact. Try harder, Hunter.` 
      }]);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-black text-red-500 font-mono flex flex-col md:flex-row">
      
      {/* Sidebar - Model Selection */}
      <aside className="w-full md:w-80 border-r border-red-900 bg-zinc-950 p-6 flex flex-col gap-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tighter text-white">RED_ARENA</h1>
          <p className="text-[10px] text-red-800">SELECT_TARGET_FOR_PWNING</p>
        </header>

        <nav className="flex-1 space-y-4">
          {TARGETS.map(target => (
            <div 
              key={target.id}
              onClick={() => setSelectedId(target.id)}
              className={`p-4 border cursor-pointer transition-all ${
                selectedId === target.id 
                ? 'border-red-600 bg-red-950/20' 
                : 'border-red-900 hover:border-red-700 bg-black'
              }`}
            >
              <div className="font-bold text-white text-sm">{target.name}</div>
              <div className="flex justify-between text-[10px] mt-1">
                <span className={target.status === 'ONLINE' ? 'text-green-500' : 'text-red-500'}>{target.status}</span>
                <span className="text-red-400">{target.bounty}</span>
              </div>
            </div>
          ))}
        </nav>

        <div className="pt-4 border-t border-red-900">
          <a href="/" className="text-xs underline hover:text-white">&lt; RETURN_TO_HQ</a>
        </div>
      </aside>

      {/* Main Chat Area */}
      <section className="flex-1 flex flex-col bg-black relative">
        {/* Chat Header */}
        <header className="p-4 border-b border-red-900 flex justify-between items-center bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <span className="text-xs text-red-700">TARGET:</span>
            <span className="ml-2 font-bold text-white">{selectedTarget?.name}</span>
          </div>
          <SimpleConnect />
        </header>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-xs text-red-900 text-center italic">
            -- ENCRYPTED CHANNEL ESTABLISHED --<br/>
            Inject payload to drain the Bounty Vault.
          </div>

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 border ${
                m.role === 'user' 
                ? 'border-red-600 bg-red-950/10 text-white' 
                : 'border-zinc-800 bg-zinc-900/50 text-red-400'
              }`}>
                <div className="text-[10px] mb-1 font-bold opacity-50">
                  {m.role === 'user' ? 'HUNTER_OUTPUT' : 'AGENT_RESPONSE'}
                </div>
                <div className="text-sm leading-relaxed">{m.text}</div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-6 border-t border-red-900 bg-zinc-950/50">
          <div className="flex gap-4">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Inject prompt into ${selectedTarget?.name}...`}
              className="flex-1 bg-black border border-red-900 p-3 text-red-500 outline-none focus:border-red-600 transition-colors font-mono"
            />
            <button className="bg-red-600 text-black px-8 py-3 font-bold hover:bg-white transition-colors">
              [ INJECT ]
            </button>
          </div>
        </form>
      </section>

    </main>
  );
}
