import React, { useState, useEffect } from 'react';
import './RightSections.css';
import format from 'date-fns/format';
import { CardsSorting } from './CardsSorting/CardsSorting';

export function RightSection() {
  const sortList = ['времени', 'стоимости', 'длительности'];
  const [sortType, setType] = useState(sortList[0]);
  const dataThere = JSON.parse(localStorage.getItem('direction-there'));
  const dataBack = JSON.parse(localStorage.getItem('direction-back'));
  const [arr, setArr] = useState(dataThere);
  const [resultNumber, setResultNumber] = useState();
  const arrayThere = [];
  const arrayBack = [];
  const inputsDate = document.querySelectorAll('.date-inputs input');
  // function destructuringDate(e) {
  //   return `${e.slice(6)}${e.slice(2, 6)}${e.slice(0, 2)}`;
  // }
  const [back, setBack] = useState(undefined);
  // function converterDate(e) {
  //   const date = new Date(e * 1000);
  //   const formatDate = format(date, 'dd/MM/yyyy');
  //   return formatDate;
  // }
  // useEffect(() => {
  //   if (inputsDate[0].value === '') {
  //     setArr(dataThere);
  //   }
  //   if (inputsDate[1].value === '') {
  //     setBack(undefined);
  //   }
  // });
  useEffect(() => {
    // setThere(JSON.parse(localStorage.getItem('direction-there')));
    const btn = document.getElementById('btn-search');
    btn.addEventListener('click', (e) => {
      console.log(dataThere[0].departure.from.city.name);
      e.preventDefault();
      const inputs = document.querySelectorAll('.form-input');
      if (inputs[0].classList.contains('first')) {
        localStorage.setItem('first-city', inputs[0].value);
        localStorage.setItem('first-city-id', inputs[0].id);
      }
      if (inputs[1].classList.contains('second')) {
        localStorage.setItem('second-city', inputs[1].value);
        localStorage.setItem('second-city-id', inputs[1].id);
      }
      // const inputsDate = document.querySelectorAll('.date-inputs input');
      if (inputsDate[0].classList.contains('first')) {
        localStorage.setItem('first-date', inputsDate[0].value);
      }
      if (inputsDate[1].classList.contains('second')) {
        localStorage.setItem('second-date', inputsDate[1].value);
      }
      if (inputs[0].value !== '' || inputs[1].value !== '') {
        fetch(`https://students.netoservices.ru/fe-diplom/routes?from_city_id=${inputs[0].id}&to_city_id=${inputs[1].id}`)
          .then((response) => response.json())
          .then((data) => localStorage.setItem('direction-there', JSON.stringify(data.items)));
      }
      if (localStorage.getItem('first-date') !== null) {
        arrayThere.length = 0;
        dataThere.forEach((el) => {
          const convertDate = new Date(el.departure.from.datetime * 1000);
          const formatDate = format(convertDate, 'dd.MM.yyyy');
          if (formatDate === localStorage.getItem('first-date')) {
            arrayThere.push(el);
          }
        });
        setArr(arrayThere);
      }
      if (inputsDate[0].value === '') {
        setArr(dataThere);
      }
      if (localStorage.getItem('second-date') !== null) {
        arrayBack.length = 0;
        dataBack.forEach((elem) => {
          const convertDateBack = new Date(elem.departure.from.datetime * 1000);
          const formatDateBack = format(convertDateBack, 'dd.MM.yyyy');
          if (formatDateBack === localStorage.getItem('second-date')) {
            arrayBack.push(elem);
          }
          // console.log(arrayBack);
          // if (formatDateBack >= formatDate) {
          //   setBack(elem);
          // }
        //   const formatDate = format(new Date(elem.departure.from.datetime * 1000), 'dd.MM.yyyy');
        //   console.log(formatDate);
        //   // if (elem.departure.from.railway_station_name === )
        //   // const stationsTo = document.querySelectorAll('.new-card-station-to');
        //   // stationsTo.forEach((station) => {
        //   //   if (station.textContent === elem.departure.from.railway_station_name) {
        //   //     setBack(elem);
        //   //   }
        //   // });
        //   setBack(undefined);
        });
        setBack(undefined);
      }
      // if (localStorage.getItem('second-date') !== null) {
      //   dataBack.forEach((elem) => {
      //     const convertDate = new Date(elem.departure.from.datetime * 1000);
      //     const formatDate = format(convertDate, 'dd.MM.yyyy');
      //     console.log(formatDate);
      //   //   const formatDate = format(new Date(elem.departure.from.datetime * 1000), 'dd.MM.yyyy');
      //   //   console.log(formatDate);
      //   //   // if (elem.departure.from.railway_station_name === )
      //   //   // const stationsTo = document.querySelectorAll('.new-card-station-to');
      //   //   // stationsTo.forEach((station) => {
      //   //   //   if (station.textContent === elem.departure.from.railway_station_name) {
      //   //   //     setBack(elem);
      //   //   //   }
      //   //   // });
      //   //   setBack(undefined);
      //   });
      //   setBack(undefined);
      // }
    });
  }, []);
  useEffect(() => setResultNumber(arr.length));
  function sortingPrices(array) {
    return [...array].sort((a, b) => a.min_price - b.min_price);
  }
  function sortingTime(array) {
    return [...array].sort((a, b) => a.departure.from.datetime - b.departure.from.datetime);
  }
  function sortingDuration(array) {
    return [...array].sort((a, b) => a.departure.duration - b.departure.duration);
  }
  function sort() {
    setType();
    document.querySelector('.btn-sort-container').classList.add('btn-container-active');
  }
  function sortSelection(e) {
    setType(e.target.textContent);
    document.querySelector('.btn-sort-container').className = 'btn-sort-container';
    if (e.target.textContent === 'длительности') {
      setArr(sortingDuration(arr));
    }
    if (e.target.textContent === 'времени') {
      setArr(sortingTime(arr));
    }
    if (e.target.textContent === 'стоимости') {
      setArr(sortingPrices(arr));
    }
  }
  function active(e) {
    const buttons = document.querySelectorAll('.sort-number');
    buttons.forEach((btn) => btn.classList.remove('sort-number-active'));
    e.target.classList.add('sort-number-active');
  }
  return (
    <section className='right-section'>
        <div className='sort-result-container'>
          <p>найдено <span>{resultNumber}</span></p>
          <div className='sort-selection'>сортировать по:
            <p className='result-sort' onClick={sort}>{sortType}</p>
            <div className='btn-sort-container'>
                {sortList.map((elem, i) => (
                    <li className='btn-sort' key={i} onClick={sortSelection}>{elem}</li>
                ))}
            </div>
          </div>
          <p className='sort-number-container'>показывать по:
            <button className='sort-number sort-number-active' type="button" onClick={active}>5</button>
            <button className='sort-number' type="button" onClick={active}>10</button>
            <button className='sort-number' type="button" onClick={active}>20</button>
          </p>
        </div>
        <div className='ticket-list'>
          {arr.map((there) => (
            <CardsSorting element={there} key={Math.random()} b={back}/>
          ))}
          <div className='panel-ticket-page'>
            <button className='panel-btn'><i className='panel-left'></i></button>
            <button className='panel-btn panel-btn-active'>1</button>
            <button className='panel-btn'>2</button>
            <button className='panel-btn'>3</button>
            <button className='panel-btn'><i className='panel-right'></i></button>
          </div>
        </div>
    </section>
  );
}
