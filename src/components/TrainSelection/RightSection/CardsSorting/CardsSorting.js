import React, { useState, useEffect } from 'react';
import './CardsSorting.css';
import format from 'date-fns/format';
import { NewElementCard } from './NewElementCard/NewElementCard';
import { NewCardDirection } from './NewCardDirection/NewCardDirection';

export function CardsSorting({ element, b }) {
  const [sedentary, setSendentary] = useState('');
  const [sedentaryPlaces, setSendentaryPlaces] = useState();
  const [sedentaryPrice, setSedentaryPrice] = useState();
  const [seat, setSeat] = useState('');
  const [seatPlaces, setSeatPlaces] = useState();
  const [seatPrice, setSeatPrice] = useState();
  const [seatSeatUpper, setSeatUpper] = useState();
  const [seatSeatLower, setSeatLower] = useState();
  const [coupe, setCoupe] = useState('');
  const [coupePlaces, setCoupePlaces] = useState();
  const [coupePrice, setCoupePrice] = useState();
  const [coupeSeatsUpper, setCoupeUpper] = useState();
  const [coupeSeatsLower, setCoupeLower] = useState();
  const [lux, setLux] = useState('');
  const [luxPlaces, setLuxPlaces] = useState();
  const [luxPrice, setLuxPrice] = useState();
  const [back, setBack] = useState('');
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
  useEffect(() => {
    if (b !== undefined) {
      setBack(<NewCardDirection back={b} />);
    }
  //   if (localStorage.getItem('second-date') !== null) {
  //     const find = dataBack.find((e) => e.departure.from.railway_station_name === element.departure.to.railway_station_name);
  //     console.log(find);
  //     // dataBack.forEach((e) => {
  //     //   if (e.departure.from.railway_station_name === element.departure.to.railway) {
  //     //   }
  //     //   // const convertDateBack = new Date(e.departure.from.datetime * 1000);
  //     //   // const formatDateBack = format(convertDateBack, 'dd.MM.yyyy');
  //     //   // const convertDate = new Date(element.departure.to.datetime * 1000);
  //     //   // const formatDate = format(convertDate, 'dd.MM.yyyy');
  //     //   // if (formatDateBack >= formatDate) {
  //     //   //   // setBack(e);
  //     //   //   console.log(e);
  //     //   // }
  //     //   // console.log(back);
  //     //   // if (formatDate === localStorage.getItem('second-date')) {
  //     //   //   // arrayThere.push(back);
  //     //   //   // console.log('a');
  //     //   //   // setBack(e);
  //     //   //   console.log(e);
  //     //   // }
  //     //   // if (e.departure.from.railway_station_name === element.departure.to.railway_station_name) {
  //     //   //   // setBack(e);
  //     //   //   console.log('asa');
  //     //   //   const container = document.querySelectorAll('.new-card-container');
  //     //   //   container[0].append(<p>asd</p>);
  //     //   // }
  //     // });
  //   }
  });
  useEffect(() => {
    if (element.departure.have_fourth_class === true) {
      setSendentary('Сидячий');
      setSendentaryPlaces(element.departure.available_seats_info.fourth);
      setSedentaryPrice(element.departure.price_info.fourth.bottom_price);
    } else {
      setSendentary();
      const parent = document.getElementById(`${element.departure._id}`);
      parent.querySelector('.sedentary-type').style.display = 'none';
    }
    if (element.departure.have_third_class === true) {
      setSeat('Плацкарт');
      setSeatPlaces(element.departure.available_seats_info.third);
      setSeatPrice(element.departure.price_info.third.bottom_price);
      setSeatUpper(element.departure.price_info.third.bottom_price);
      setSeatLower(element.departure.price_info.third.top_price);
    } else {
      setSeat();
      const parent = document.getElementById(`${element.departure._id}`);
      parent.querySelector('.seat-type').style.display = 'none';
    }
    if (element.departure.have_second_class === true) {
      setCoupe('Купе');
      setCoupePlaces(element.available_seats);
      setCoupePrice(element.departure.price_info.second.bottom_price);
      setCoupeUpper(element.departure.price_info.second.bottom_price);
      setCoupeLower(element.departure.price_info.second.top_price);
    } else {
      setCoupe();
      const parent = document.getElementById(`${element.departure._id}`);
      parent.querySelector('.coupe-type').style.display = 'none';
    }
    if (element.departure.have_first_class === true) {
      setLux('Люкс');
      setLuxPlaces(element.available_seats);
      setLuxPrice(element.departure.price_info.first.bottom_price);
    } else {
      setLux();
      const parent = document.getElementById(`${element.departure._id}`);
      parent.querySelector('.lux-type').style.display = 'none';
    }
  }, [b]);
  return (
    <div className='cards-sorting-container' id={element.departure._id}>
      <div className='directions_city-information'>
        <div className='directions_city-border'>
          <i className='border-vector'></i>
        </div>
        <p className='train-name'>{element.departure.train.name}</p>
        <div className='train-destinations'>
          <div className='direction-line'>
            <div className='direction-line-container'>
              <p className='direction-line-city'>{element.departure.from.city.name}</p>
              <span className='arrow-train'></span>
            </div>
            <p className='direction-line-city'>{element.departure.to.city.name}</p>
          </div>
        </div>
      </div>
      <div className='main-direction-information'>
      <div className='card-ticket-container'>
      <div className='first-card-ticket'>
      <div className='new-card-container' id={element.departure._id}>
      <div className='new-card-info'>
        <div className='new-card-first'>
          <p className='new-card-date'>{converterDate(element.departure.from.datetime)}</p>
          <p className='new-card-city'>{element.departure.from.city.name}</p>
          <p className='new-card-station'>{element.departure.from.railway_station_name}</p>
        </div>
        <div className='new-card-second'>
          <p className='available-time'>{durationTime(element.departure.duration)}</p>
          <i className='new-card-arrow-right'></i>
        </div>
        <div className='new-card-third'>
          <p className='new-card-date'>{converterDate(element.departure.to.datetime)}</p>
          <p className='new-card-city'>{element.departure.to.city.name}</p>
          <p className='new-card-station new-card-station-to'>{element.departure.to.railway_station_name}</p>
        </div>
      </div>
      {back}
       {/* <div className='new-card-info-second'>
        <div className='new-card-first'>
          <p className='new-card-date'>{converterDate(back.departure.to.datetime)}</p>
          <p className='new-card-city'>{back.departure.to.city.name}</p>
          <p className='new-card-station'>{back.departure.to.railway_station_name}</p>
        </div>
        <div className='new-card-second'>
          <p className='available-time'>{durationTime(back.departure.duration)}</p>
          <i className='new-card-arrow-left'></i>
        </div>
        <div className='new-card-third'>
          <p className='new-card-date'>{converterDate(back.departure.from.datetime)}</p>
          <p className='new-card-city'>{back.departure.from.city.name}</p>
          <p className='new-card-station'>{back.departure.from.railway_station_name}</p>
        </div>
      </div> */}
    </div>
      </div>
      <div className='second-card-ticket'>
      <div className='type-container'>
        <div className='first-types-wagon sedentary-type'>
           <NewElementCard element={sedentary} places={sedentaryPlaces} price={sedentaryPrice}></NewElementCard>
        </div>
        <div className='first-types-wagon seat-type'>
           <NewElementCard element={seat} places={seatPlaces} price={seatPrice} priceUpperSeats={seatSeatUpper} priceLowerSeats={seatSeatLower}></NewElementCard>
        </div>
        <div className='first-types-wagon coupe-type'>
           <NewElementCard element={coupe} places={coupePlaces} price={coupePrice} priceUpperSeats={coupeSeatsUpper} priceLowerSeats={coupeSeatsLower}></NewElementCard>
        </div>
        <div className='first-types-wagon lux-type'>
           <NewElementCard element={lux} places={luxPlaces} price={luxPrice}></NewElementCard>
        </div>
    </div>
    <div className='wagons-container'>
        <div className='wagons-icon'>
          <i className='wagons-icon-first'></i>
          <i className='wagons-icon-second'></i>
          <i className='wagons-icon-third'></i>
        </div>
        <button className='select-seats-btn' id='select-btn'>Выбрать места</button>
      </div>
      </div>
    </div>
      </div>
    </div>
  );
}
