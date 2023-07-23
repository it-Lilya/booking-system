import React, { useState } from 'react';
import './CreatingOption.css';

export const CretingOption = () => {
  const [check, setCheck] = useState({
    coupe: false,
    reserved: false,
    seated: false,
    lux: false,
    wifi: false,
    express: false,
  });
  function movement(e) {
    if (e.target.classList.contains('checkbox-input')) {
      e.target.classList.toggle('switch-on');
      e.target.parentElement.classList.toggle('on-parent');
    }
    if (e.target.classList.contains('checking')) {
      e.target.classList.toggle('on-parent');
      e.target.firstChild.classList.toggle('switch-on');
    }
  }
  return (
      <div className='options-container'>
        <div className='option-element checkbox-coupe coupe' onClick={movement}>
          <span className='option-icon coupe-img'></span>
          <p className='option-title'>Купе</p>
          <div className='checking' onClick={() => {
            setCheck({ ...check, coupe: !check.coupe });
          }}>
            <input className='checkbox-input option-switch' type='checkbox' defaultValue={check.coupe}/>
          </div>
        </div>
        <div className='option-element checkbox-seat reserved' onClick={movement}>
          <span className='option-icon seat-img'></span>
          <p className='option-title'>Плацкарт</p>
          <div className='checking' onClick={() => {
            setCheck({ ...check, reserved: !check.reserved });
          }}>
            <input className='checkbox-input option-switch' type='checkbox' defaultValue={check.reserved}/>
          </div>
        </div>
        <div className='option-element checkbox-seated seated' onClick={movement}>
          <span className='option-icon seated-img'></span>
          <p className='option-title'>Сидячий</p>
          <div className='checking' onClick={() => {
            setCheck({ ...check, seated: !check.seated });
          }}>
            <input className='checkbox-input option-switch' type='checkbox' defaultValue={check.seated}/>
          </div>
        </div>
        <div className='option-element checkbox-lux lux' onClick={movement}>
          <span className='option-icon lux-img'></span>
          <p className='option-title'>Люкс</p>
          <div className='checking' onClick={() => {
            setCheck({ ...check, lux: !check.lux });
          }}>
            <input className='checkbox-input option-switch' type='checkbox' defaultValue={check.lux}/>
          </div>
        </div>
        <div className='option-element checkbox-wifi wifi' onClick={movement}>
          <span className='option-icon wifi-img'></span>
          <p className='option-title'>Wi-Fi</p>
          <div className='checking' onClick={() => {
            setCheck({ ...check, wifi: !check.wifi });
          }}>
            <input className='checkbox-input option-switch' type='checkbox' defaultValue={check.wifi}/>
          </div>
        </div>
        <div className='option-element checkbox-express express' onClick={movement}>
          <span className='option-icon express-img'></span>
          <p className='option-title'>Экспресс</p>
          <div className='checking' onClick={() => {
            setCheck({ ...check, express: !check.express });
          }}>
            <input className='checkbox-input option-switch' type='checkbox' defaultValue={check.express}/>
          </div>
        </div>
      </div>
  );
};
