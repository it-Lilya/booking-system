import React, { useState, useEffect } from 'react';
import './LastTickets.css';
import { LastCards } from './LastCards/LastCards';

export function LastTickets() {
  const [result, setResult] = useState([]);
  useEffect(() => {
    setResult(JSON.parse(localStorage.getItem('last')).slice(0, 3));
  }, []);
  return (
    <div className='last-container'>
        <h2 className='last-title'>Последние билеты</h2>
        {result.map((elem) => (
          <LastCards key={Math.random()} element={elem}/>
        ))}
    </div>
  );
}
