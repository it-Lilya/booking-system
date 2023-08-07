import React from 'react';
import './ProgressOrder.css';
import { NavLink } from 'react-router-dom';

export function ProgressOrder() {
  return (
  <div className='progress-order progress-hidden'>
      <div className='progress-container'>
            <NavLink className='paragraph paragraph-active'>
                <div className='btn-and-text'>
                    <button className='progress-btn'>1</button>
                    <h3 className='progress-text'>Билеты</h3>
                    <div className='triangle'>
                        <span className='triandle-end triangle-active'></span>
                        <span className='start-triangle'></span>
                    </div>
                </div>
            </NavLink>
            <NavLink className='paragraph'>
                <div className='btn-and-text'>
                    <button className='progress-btn'>2</button>
                    <h3 className='progress-text'>Пассажиры</h3>
                <div className='triangle'>
                        <span className='triandle-end'></span>
                        <span className='start-triangle'></span>
                    </div>
                </div>
            </NavLink>
            <NavLink className='paragraph'>
                <div className='btn-and-text'>
                    <button className='progress-btn'>3</button>
                    <h3 className='progress-text'>Оплата</h3>
                <div className='triangle'>
                        <span className='triandle-end'></span>
                        <span className='start-triangle'></span>
                    </div>
                </div>
            </NavLink>
            <NavLink className='paragraph'>
                <div className='btn-and-text'>
                    <button className='progress-btn'>4</button>
                    <h3 className='progress-text'>Проверка</h3>
                </div>
            </NavLink>
            </div>
        </div>
  );
}
