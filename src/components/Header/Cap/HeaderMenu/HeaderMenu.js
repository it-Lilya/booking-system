import React from 'react';
import './HeaderMenu.css';
import { HashLink } from 'react-router-hash-link';

export const HeaderMenu = () => (
        <div className='menu'>
            <ul className='menu-container'>
              <li><HashLink to='/#first-block' className='menu-item'>О нас</HashLink></li>
              <li><HashLink to='/#second-block' className='menu-item'>Как это работает</HashLink></li>
              <li><HashLink to='/#third-block' className='menu-item'>Отзывы</HashLink></li>
              <li><HashLink to='/#four-block' className='menu-item'>Контакты</HashLink></li>
            </ul>
        </div>
);
