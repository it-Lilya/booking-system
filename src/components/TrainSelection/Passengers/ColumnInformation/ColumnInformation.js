import React from "react";
import './ColumnInformation.css';
import format from "date-fns/format";

export function ColumnInformation({ element }) {
   function numberWagon(e) {
      if (String(parseInt(e.match(/\d+/))).length === 1) {
          return `${0}${parseInt(e.match(/\d+/))}`
      }
      return parseInt(e.match(/\d+/));
  }
  function dateTime(elem) {
      const date = elem * 1000;
      const formatDate = format(date, 'HH:mm');
      return formatDate;
   }
   function dateInformation(elem) {
      const date = elem * 1000;
      const formatDate = format(date, 'dd.MM.yyyy');
      return formatDate;
   }
   function durationTime(e) {
      const timestamp = e;
      const hour = Math.floor(timestamp / 60 / 60);
      const min = Math.floor(timestamp / 60) - hour * 60;
      const formated = [
        hour.toString().padStart(2, '0'),
        min.toString().padStart(2, '0'),
      ].join(' : ');
      return formated;
    }
     return (
        <div className='column-information'>
            <div className='column-info-first column-info'>
               <div className='column-number-train'>
                  <p className='column-number-title'>№ Поезда</p>
                  <span className='column-number-text'>{numberWagon(element.departure.train.name)}</span>
               </div>
               <div className='column-name-train'>
                  <p className='column-number-title'>Название</p>
                  <div className='column-names'>
                     <p>{element.departure.from.city.name}</p>
                     <p>{element.departure.to.city.name}</p>
                  </div>
               </div>
            </div>

            <div className='column-info-second column-info'>
               <div className='second-column-time-container'>
                  <div className='second-column-time'>
                     <div className='second-time-first'>
                        <p className='second-times'>{dateTime(element.departure.from.datetime)}</p>
                        <p className='second-time-information'>{dateInformation(element.departure.from.datetime)}</p>
                     </div>
                  </div>
                 
                  <div className='second-column-time'>
                     <div className='second-time-first'>
                        <p className='second-times second-time-information-rigth'>{dateTime(element.departure.to.datetime)}</p>
                        <p className='second-time-information'>{dateInformation(element.departure.to.datetime)}</p>
                     </div>
                  </div>
               </div>
               <div className='new-columns-second'>
                  <p className='available-times'> {durationTime(element.departure.duration)}</p>
                  <i className='new-card-arrow-rights'></i>
                </div>
               <div className='column-info-third column-info'>
               <div className='second-column-city-container'>
                  <div className='second-column-cities'>
                     <div className='second-city-first'>
                        <p className='second-city-columns'>{element.departure.from.city.name}</p>
                        <p className='second-city-information'>{element.departure.from.railway_station_name}</p>
                     </div>
                  </div>
                  <div className='second-column-cities'>
                     <div className='second-city-first seconds-city-column'>
                        <p className='second-city-columns'>{element.departure.to.city.name}</p>
                        <p className='second-city-information'>{element.departure.to.railway_station_name}</p>
                     </div>
                  </div>
               </div>
               </div>
            </div> 
        </div>
     )
}