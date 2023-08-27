import React from 'react';
import format from 'date-fns/format';

export function PassengersInfo({ elem, res }) {
  if (elem !== null) {
    function dateTime(elem) {
        const date = elem * 1000;
        const formatDate = format(date, 'dd.MM.yyyy');
        return formatDate;
      }
     return (
        <div className='passengers-information' id={elem.departure._id}>
        <div className='direction-container'>
            <div className='direction-header'>
            <span className='img-direction-first'></span>
            <p className='direction-title'>Туда</p>
            <p className='passengers-date'>{dateTime(elem.departure.from.datetime)}</p>
            <button className='btns-directions icon-direction direction-first'></button>
            </div>
            <div className='direction-data-container'>
            {res}
            </div>
        </div>
      </div>
     )
  }
}