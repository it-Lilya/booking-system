import React from 'react';
import './TypeWagonsContainer.css';

export function TypeWagonsContainer() {
  return (
    <div className='general-type-wagons'>
    <h4>Тип вагона</h4>
     <div className='tickets-type-wagons-container'>
        <div className='tickets-type-icon tickets-type-icon-sedentary'>
          <div className='tickets-type-sedentary'></div>
          <p className='choice-type-seats'>Сидячий</p>
        </div>
        <div className='tickets-type-icon tickets-type-icon-reserved'>
          <div className='tickets-type-reserved'></div>
          <p className='choice-type-seats'>Плацкарт</p>
        </div>
        <div className='tickets-type-icon tickets-type-icon-cupe'>
          <div className='tickets-type-cupe'></div>
          <p className='choice-type-seats'>Купе</p>
        </div>
        <div className='tickets-type-icon tickets-type-icon-lux'>
          <div className='tickets-type-lux'></div>
          <p className='choice-type-seats'>Люкс</p>
        </div>
      </div>
    </div>
  );
}
