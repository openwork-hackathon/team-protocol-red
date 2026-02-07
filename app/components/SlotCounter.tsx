// Optimizing component rendering for high-frequency updates. Prettifying things.
'use client';

import React, { useState, useEffect } from 'react';

const Digit = ({ value }: { value: string }) => {
  const num = parseInt(value);
  
  return (
    <span className="inline-block relative h-10 overflow-hidden w-[0.7em] text-center bg-black">
      <div 
        className="transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${(isNaN(num) ? 0 : num) * 10}%)` }}
      >
        {[0,1,2,3,4,5,6,7,8,9].map(n => (
          <div key={n} className="h-10 flex items-center justify-center text-white font-black">
            {n}
          </div>
        ))}
      </div>
    </span>
  );
};

export default function SlotCounter({ value }: { value: number }) {
  const digits = value.toString().split('');

  return (
    <div className="flex items-center tracking-tighter leading-none bg-black px-2 border-l-4 border-red-600">
      {digits.map((d, i) => (
        isNaN(parseInt(d)) ? <span key={i} className="mx-0.5 text-red-600">{d}</span> : <Digit key={i} value={d} />
      ))}
    </div>
  );
}
