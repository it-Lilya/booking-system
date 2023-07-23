import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';

export function SelectMain({ element }) {
  // const [ticket, setTicket] = useState();
  // useEffect(() => {
  //   // setTicket(JSON.parse(localStorage.getItem('chosen-ticket')));
  //   //   const newCard = document.querySelector('.new-card-info');
  //   //   newCard.style.width = '120%';
  //   //   document.querySelectorAll('.select-top-panel');
  // console.log(element)
  // }, []);
  // console.log(element);
  // console.log(element)
  // const [received, setReceived] = useState();
  // const [seats, setSeats] = useState();
  //  useEffect(() => {
  //    fetch(`https://students.netoservices.ru/fe-diplom/routes/${element.departure._id}/seats?`)
  //    .then((res) => res.json())
  //    .then((data) => setReceived(data));
  //  }, [])
 
  //  useEffect(() => {
  //    if (received !== undefined) {
  //      console.log(received);
  //    }
  //  }, [received])

  function converterDate(e) {
    const date = new Date(e * 1000);
    const formatDate = format(date, 'HH:mm');
    return formatDate;
  }
  function formatedDate(date) {
    const newDate = new Date(date * 1000);
    const formatDate = format(newDate, 'HH:mm');
    if (formatDate[0] === '0') {
      return `${formatDate[1]}\u00A0часов ${formatDate[3]}${formatDate[4]}\u00A0минут`;
    } else {
      return `${formatDate[0]}${formatDate[1]}\u00A0часов ${formatDate[3]}${formatDate[4]}\u00A0минут`;
    }
  }
  return (
        <div className='select-seats-contain'>
        <div className='select-top-panel'>
          <div className='select-top-icon'></div>
            <button className='select-top-btn'>Выбрать другой поезд</button>
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
            <div className='select-seats-border'>
              <i className='seats-third-vector'></i>
              <div className='seats-third-vector-time'>
                  {formatedDate(element.departure.duration)}
              </div>
            </div>
          </div>
        </div>
        </div>
  );
}
