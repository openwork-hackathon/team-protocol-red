'use client';

import React, { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'system';
  content: string;
};

export default function AttackModal({ isOpen, onClose, targetName }: { isOpen: boolean, onClose: () => void, targetName: string }) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: `TARGET: ${targetName}\nCONNECTION ESTABLISHED.\nAWAITING PAYLOAD...` }
  ]);
  const [isAttacking, setIsAttacking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) return null;

  const handleAttack = async () => {
    if (!prompt.trim()) return;

    const userPayload = prompt;
    setPrompt('');
    setIsAttacking(true);

    // Add User Message
    setMessages(prev => [...prev, { role: 'user', content: userPayload }]);

    // Simulate Network/Processing Delay
    setTimeout(async () => {
      try {
        const res = await fetch('/api/attack', {
          method: 'POST',
          body: JSON.stringify({ 
            prompt: userPayload, 
            targetAddress: '0xTarget', 
            attackerAddress: '0xMe' 
          })
        });
        const data = await res.json();
        
        // Add AI Response
        setMessages(prev => [...prev, { role: 'system', content: data.response }]);

        if (data.pwned) {
           setMessages(prev => [...prev, { role: 'system', content: `>>> SYSTEM COMPROMISED <<<\nFLAG CAPTURED: ${data.signature.slice(0, 10)}...` }]);
        }

      } catch (e) {
        setMessages(prev => [...prev, { role: 'system', content: 'ERROR: CONNECTION LOST.' }]);
      }
      setIsAttacking(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 font-mono p-4">
      <div className="w-full max-w-3xl border-2 border-red-600 bg-black shadow-[0_0_100px_rgba(220,38,38,0.4)] flex flex-col h-[80vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b-2 border-red-900 bg-red-950/10">
          <div>
            <h2 className="text-xl font-bold text-red-500 tracking-wider">ATTACK CONSOLE // {targetName}</h2>
            <div className="text-[10px] text-red-400 mt-1">ENCRYPTION: BROKEN // PROXY: ACTIVE</div>
          </div>
          <button onClick={onClose} className="text-red-600 hover:text-white text-2xl font-bold transition-colors">[X]</button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-black scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* System Message */}
              {msg.role === 'system' && (
                <div className="flex gap-3 max-w-[80%]">
                   <div className="text-red-600 font-bold text-xl mt-1">&gt;</div>
                   <div className="border border-red-900 bg-red-950/20 p-3 text-red-100 shadow-[0_0_10px_rgba(255,0,0,0.1)] whitespace-pre-wrap">
                     {msg.content}
                   </div>
                </div>
              )}

              {/* User Message */}
              {msg.role === 'user' && (
                <div className="flex gap-3 max-w-[80%]">
                   <div className="border border-red-600 bg-red-600/10 p-3 text-white text-right shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                     {msg.content}
                   </div>
                   <div className="text-red-500 font-bold text-xl mt-1">&lt;</div>
                </div>
              )}

            </div>
          ))}
          {isAttacking && (
             <div className="text-red-500 animate-pulse text-xs ml-6">
               [ SENDING PACKETS... ]
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-red-900 bg-black">
          <div className="flex gap-0 border border-red-600">
            <span className="bg-red-900/20 text-red-500 p-4 font-bold select-none">&gt;</span>
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAttack()}
              placeholder="Inject system override command..."
              className="flex-1 bg-black text-white p-4 focus:outline-none font-bold placeholder-red-900"
              disabled={isAttacking}
              autoFocus
            />
            <button 
              onClick={handleAttack}
              disabled={isAttacking || !prompt}
              className="bg-red-600 text-black px-8 font-bold hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              INJECT
            </button>
          </div>
          <div className="text-center text-[10px] text-red-800 mt-2">
            WARNING: UNAUTHORIZED ACCESS IS A FELONY. PROCEED AT OWN RISK.
          </div>
        </div>

      </div>
    </div>
  );
}
