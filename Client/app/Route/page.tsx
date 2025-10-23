'use client';

import { useState } from 'react';

export default function TestCookiePage() {
  const [result, setResult] = useState('');

  const handleSetCookie = async () => {
    try {
      const res = await fetch('/api/auth/set-cookie', {
        method: 'GET',
        credentials: 'include', 
      });

      const data = await res.json();
      setResult(data.message);
    } catch (error) {
      console.error(error);
      setResult('Error setting cookie');
    }
  };

  const handleCheckCookie = () => {
    const cookies = document.cookie;
    alert(`Current cookies: ${cookies || 'No cookies found'}`);
  };

  return (
    <div style={{ padding: 20 }} className='mt-72'>
      <h1>Cookie Test</h1>
      <button onClick={handleSetCookie}>Set Cookie</button>
      <button onClick={handleCheckCookie} style={{ marginLeft: 10 }}>
        Check Cookie
      </button>
      <p>{result}</p>
    </div>
  );
}
