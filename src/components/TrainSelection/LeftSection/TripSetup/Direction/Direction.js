import React, { useState } from 'react';
import './Direction.css';
import { SliderTime } from './SliderTime/SliderTime';

export const Direction = () => {
  const [resultFirst, setFirst] = useState();
  const [resultSecond, setSecond] = useState();
  function open(e) {
    const btns = document.querySelectorAll('.btns-directions');
    e.target.classList.toggle('open-direction-data');
    e.target.classList.toggle('icon-direction');
    if (e.target.classList.contains('direction-first')) {
      btns[1].className = 'btns-directions icon-direction direction-second';
      setSecond();
      setFirst(<SliderTime />);
      if (e.target.classList.contains('icon-direction')) {
        setFirst();
      }
    }
    if (e.target.classList.contains('direction-second')) {
      btns[0].className = 'btns-directions icon-direction direction-first';
      setFirst();
      setSecond(<SliderTime />);
      if (e.target.classList.contains('icon-direction')) {
        setSecond();
      }
    }
  }
  return (
    <>
      <div className='direction-container'>
        <div className='direction-header'>
          <span className='img-direction-first'></span>
          <p className='direction-title'>Туда</p>
          <button className='btns-directions icon-direction direction-first' onClick={open}></button>
        </div>
        <div className='direction-data-container' id='1'>
          {resultFirst}
        </div>
      </div>
      <div className='direction-container'>
        <div className='direction-header'>
          <span className='img-direction-second'></span>
          <p className='direction-title'>Обратно</p>
          <button className='btns-directions icon-direction direction-second' onClick={open}></button>
        </div>
        <div className='direction-data-container' id='2'>
          {resultSecond}
        </div>
      </div>
    </>
  );
};
