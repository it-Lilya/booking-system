import React from 'react';
import format from 'date-fns/format';

export function SelectMain({ element }) {
  function converterDate(e) {
    const date = new Date(e * 1000);
    const formatDate = format(date, 'HH:mm');
    return formatDate;
  }
  function formatedDate(date) {
    const hour = Math.floor(date / 60 / 60);
    const minutes = Math.floor(date / 60) - (hour * 60);
    if (hour[0] === '0') {
      return `${hour}\u00A0часов ${minutes}\u00A0минут`;
    } else {
      return `${hour}\u00A0часов ${minutes}\u00A0минут`;
    }
  }
  return (
        <div className='select-seats-contain'>
        <div className='select-top-panel'>
          <div className='select-top-btn'></div>
            <button className='select-top-icon'>Выбрать другой поезд</button>
          </div>
        <div className='select-seats-information'>
          <div className='seat-first-container'>
            <div className='select-seats-border'>
             <i className='seats-border-vector'></i>
            </div>
            <div className='seats-flex-container'>
              <div className='first-seats-flex'>
                <p className='seats-train-name'>{element.departure.train.name}</p>
                <div className='seats-line-city-container'>
                  <p className='seats-line-city'>{element.departure.from.city.name}</p>
                  <span className='seats-arrow-train'></span>
                </div>
                <div className='seats-line-city-container'>
                  <p className='seats-line-city'>{element.departure.to.city.name}</p>
                  <span className='seats-arrow-train'></span>
                </div>
              </div> 
              </div>
          </div>
           <div className='new-card-select'>
                <div className='new-card-first'>
                  <p className='new-card-date'>{converterDate(element.departure.from.datetime)}</p>
                  <p className='new-card-city'>{element.departure.from.city.name}</p>
                  <p className='new-card-station'>{element.departure.from.railway_station_name}</p>
                </div>
                <div className='new-card-second'>
                  <i className='new-card-arrow-right'></i>
                </div>
                <div className='new-card-third'>
                  <p className='new-card-date'>{converterDate(element.departure.to.datetime)}</p>
                  <p className='new-card-city'>{element.departure.to.city.name}</p>
                  <p className='new-card-station new-card-station-to'>{element.departure.to.railway_station_name}</p>
                </div>
                </div>
              <div className='seat-third-container'>
                <div className='select-seats-borders'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M15.1454 29.9951C7.11437 30.2063 0.215587 23.5269 0.00493763 15.3691C-0.205712 7.13207 6.35076 0.188668 14.4871 0.00386308C22.9131 -0.180942 29.8119 6.28724 29.9962 14.6035C30.1805 22.9989 23.6241 29.8103 15.1454 29.9951ZM27.4421 15.0259C27.4684 8.1881 21.9389 2.59114 15.0664 2.53834C8.29927 2.45913 2.61173 8.0825 2.5854 14.8939C2.53274 21.7845 8.16762 27.4607 14.9874 27.4607C21.8072 27.4607 27.4157 21.8373 27.4421 15.0259Z" fill="#FFA800"/>
                    <path d="M15.3296 14.3923C17.3571 13.4947 19.1476 12.6762 20.9381 11.8842C21.2278 11.7522 21.5174 11.5146 21.8071 11.541C22.2284 11.5674 22.6233 11.805 23.0446 11.937C22.8603 12.333 22.8077 12.9138 22.4917 13.0722C21.4648 13.6795 20.3589 14.1547 19.3056 14.6563C17.989 15.2899 16.6725 15.9499 15.3559 16.5571C14.171 17.1116 13.5917 16.7684 13.5654 15.5011C13.5391 12.6762 13.5127 9.85136 13.5917 7.02647C13.5917 6.63046 14.1447 6.23445 14.4343 5.83844C14.7503 6.23445 15.3033 6.60406 15.3033 7.00007C15.3822 9.37614 15.3296 11.7522 15.3296 14.3923Z" fill="#FFA800"/>
                  </svg>
              <div className='seats-third-vector-time'>
                  {formatedDate(element.departure.duration)}
              </div>
            </div>
          </div>
        </div>
        </div>
  );
}
