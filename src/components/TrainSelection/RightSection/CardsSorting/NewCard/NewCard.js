import React from 'react';
import format from 'date-fns/format';

export function NewCard({ element }) {
  function converterDate(e) {
    const date = new Date(e * 1000);
    const formatDate = format(date, 'dd/MM/yyyy HH:mm');
    return formatDate;
  }
  function durationTime(e) {
    const timestamp = e;
    const hour = Math.floor(timestamp / 60 / 60);
    const min = Math.floor(timestamp / 60) - (hour * 60);
    const formated = [
      hour.toString().padStart(2, '0'),
      min.toString().padStart(2, '0'),
    ].join(' : ');
    return formated;
  }
  return (
    <div className='new-card-info-second'>
    <div className='new-card-first'>
      <p className='new-card-date'>{converterDate(element.departure.to.datetime)}</p>
      <p className='new-card-city'>{element.departure.to.city.name}</p>
      <p className='new-card-station'>{element.departure.to.railway_station_name}</p>
    </div>
    <div className='new-card-second'>
      <p className='available-time'>{durationTime(element.departure.duration)}</p>
      <i className='new-card-arrow-left'></i>
    </div>
    <div className='new-card-third'>
      <p className='new-card-date'>{converterDate(element.departure.from.datetime)}</p>
      <p className='new-card-city'>{element.departure.from.city.name}</p>
      <p className='new-card-station'>{element.departure.from.railway_station_name}</p>
    </div>
  </div>
  );
}
