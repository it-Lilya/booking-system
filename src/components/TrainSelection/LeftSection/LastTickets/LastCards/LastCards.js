import React from 'react';
import './LastCards.css';

export function LastCards({ element }) {
  return (
    <div className='last-cards-container'>
        <div className='last-cards-city-container'>
            <div className='last-cards-first-city'>
                <p className='last-first-name last-card-city'>{element.departure.from.city.name}</p>
                <p className='first-railway-station railway-station'>{element.departure.from.railway_station_name}</p>
            </div>
            <div className='last-cards-second-city'>
                <p className='last-second-name last-card-city'>{element.departure.to.city.name}</p>
                <p className='second-railway-station railway-station'>{element.departure.to.railway_station_name}</p>
            </div>
        </div>
        <div className='panel-with-options'>
          <div className='panel-options-icons'>
            <p className='icons-options icons-options-wifi'></p>
            <p className='icons-options icons-options-express'></p>
            <p className='icons-options icons-options-cup'></p>
          </div>
          <p className='information-price-panel'>
            <span className='panel-price-from'>от </span>
            <span className='panel-price'>{element.departure.min_price}</span>
            <span className='panel-vector'> ₽</span></p>
        </div>
    </div>
  );
}
