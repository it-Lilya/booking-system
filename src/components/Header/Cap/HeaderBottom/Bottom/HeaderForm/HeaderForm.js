import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderForm.css';
import { MyApp } from './Calendar/Calendar';
import { Cities } from './Cities/Cities';

export const HeaderForm = () => (
    <div className='bottom-form-container'>
      <form id='form-search' className='bottom-form'>
        <div className='fir'>
          <h4 className='form-direction'>Направление</h4>
        <div className='input-container'>
          <Cities />
        </div>
        </div>
        <div className='sec'>
          <h4 className='form-direction'>Дата</h4>
        <div className='search-data'>
            <MyApp />
        </div>
        </div>
        </form>
        <div className='btn-btn-search search-button'>
           <NavLink id='btn-search' className='search-button-text' to='/train-selection'>Найти билеты</NavLink>
        </div>
    </div>
);
