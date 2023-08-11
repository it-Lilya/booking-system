import React, { useEffect, useState } from 'react';
import './Passengers.css';
import { PassengersQuantity } from './PassengersQuantity';
import { ColumnInformation } from './ColumnInformation/ColumnInformation';
import { PassengersInfo } from './PassengersInfo';

export function Passengers() {
  const [resultFirst, setFirst] = useState('');
  const [resultSecond, setSecond] = useState('');
  const [resultPassengers, setPassengers] = useState('');
  const ticket = JSON.parse(localStorage.getItem('chosen-ticket'));
  const backTicket = JSON.parse(localStorage.getItem('back-ticket'));
  const [back, setBack] = useState('');
  const active = JSON.parse(localStorage.getItem('active'));
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTimeout(() => {
    if (localStorage.getItem('back-ticket') !== null) {
      setBack(<PassengersInfo elem={backTicket} res={resultSecond} />);
      const container = document.querySelectorAll('.passengers-information')[1];
      if (container !== null) {
        container.querySelector('h4').textContent = 'Обратно';
        if (container.querySelector('span') !== null) {
          container.querySelector('span').classList.add('img-direction-second');
          container.querySelector('button').classList.add('direction-second');
          container.querySelector('button').classList.remove('direction-first');
        } 
      }
      } else {
        setBack('');
      }
      const parent = document.querySelector('.passengers-element-container');
      const buttons = parent.querySelectorAll('button');
      buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          open(e);
        })
      })
    }, 0);
  }, []);
  useEffect(() => {
    setBack(<PassengersInfo elem={backTicket} res={resultSecond} />);
  }, [resultSecond]);
  function open(e) {
    e.target.classList.toggle('open-direction-data');
    e.target.classList.toggle('icon-direction');
    if (e.target.classList.contains('open-direction-data')) {
      if (e.target.classList.contains('direction-passengers')) {
        setPassengers(<><PassengersQuantity /></>);
      }
      if (e.target.classList.contains('direction-first')) {
        setFirst(<><ColumnInformation element={ticket}/></>)
      }
      if (e.target.classList.contains('direction-second')) {
        setSecond(<ColumnInformation element={backTicket}/>);
        setTimeout(() => {
          const secondColumn = e.target.parentElement.parentElement.querySelector('.column-information');
          secondColumn.querySelector('.new-card-arrow-rights').classList.add('new-card-arrow-lefts');
          const secondChildren = secondColumn.children[1].children;
          const columnTime = secondChildren[0];
          columnTime.children[0].classList.add('moving-first');
          columnTime.children[1].classList.add('moving-second');
          columnTime.children[1].querySelector('.second-times').style.textAlign = 'left';
          const columnDirections = secondChildren[2];
          const cities = columnDirections.querySelectorAll('.second-column-cities');
          cities[0].classList.add('movie-cities-first');
          cities[1].classList.add('movie-cities-second');
          cities[1].querySelector('.second-city-columns').style.textAlign = 'left';
        }, 5);
      }
    }
    if (!e.target.classList.contains('open-direction-data')) {
      if (e.target.classList.contains('direction-passengers')) {
        setPassengers('');
      }
      if (e.target.classList.contains('direction-first')) {
        setFirst('')
      }
      if (e.target.classList.contains('direction-second')) {
        setSecond('');
      }
    }
  }
  useEffect(() => {
    const adults = ((((active.coach.top_price - active.coach.bottom_price) / 2 + active.coach.bottom_price)) * Number(JSON.parse(localStorage.getItem('adults'))));
    const children = active.coach.bottom_price * Number(JSON.parse(localStorage.getItem('childrens')));
    const totalString = String(adults + children);
    if (totalString.length > 3) {
      setTotal(`${totalString[0]}${' '}${totalString.slice(-3)}`);
    } else {
      setTotal(totalString);
    }
  })

  return (
    <div className='passengers-element-container'>
      <div className='passengers-text'>
       <h4 className='travel-title-passengers'>Детали поездки</h4>
      </div>
      <PassengersInfo elem={ticket} res={resultFirst} />
      {back}
      <div className='passengers-information'>
      <div className='direction-container'>
        <div className='direction-header'>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M25.9721 26C17.2752 26 8.72031 26 0.165369 26C-0.219806 21.9313 -0.260351 20.3648 3.83467 18.4118C9.91638 15.5229 16.0792 15.5839 22.2014 18.4118C22.9921 18.7779 23.7219 19.2865 24.4111 19.8358C25.5058 20.7106 26.0735 21.8499 25.9924 23.2943C25.9518 24.1487 25.9721 25.0235 25.9721 26Z" fill="#FFA800"/>
          <path d="M19.4841 6.44946C19.5044 10.0503 16.6054 13.0002 13.0172 13.0206C9.42899 13.0206 6.50977 10.091 6.50977 6.51049C6.50977 2.9503 9.38844 0.0411096 12.9158 0.00042166C16.5243 -0.0402663 19.4638 2.86892 19.4841 6.44946Z" fill="#FFA800"/>
          </svg>
          <h4 className='direction-title'>Пассажары</h4>
          <button className='btns-directions icon-direction direction-passengers'></button>
        </div>
        <div className='direction-data-container'>
          {resultPassengers}
        </div>
      </div>
      </div>
      <div className='passengers-information'>
        <div className='total-container'>
        <h4 className='total-passengers'>Итог</h4>
        <p className='total-price'>{total}&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="32" viewBox="0 0 26 32" fill="none">
          <path d="M6.50073 19.2081C6.50073 20.2833 6.50073 21.3372 6.50073 22.4039C9.20503 22.4039 11.9007 22.4039 14.6093 22.4039C14.6093 23.4749 14.6093 24.5331 14.6093 25.6083C11.9093 25.6083 9.20936 25.6083 6.50073 25.6083C6.50073 27.746 6.50073 29.8666 6.50073 32C5.41294 32 4.33815 32 3.24603 32C3.24603 29.8751 3.24603 27.7502 3.24603 25.6168C2.15824 25.6168 1.08779 25.6168 0.00433382 25.6168C0.00433382 24.5459 0.00433382 23.4877 0.00433382 22.4125C1.07912 22.4125 2.15391 22.4125 3.23303 22.4125C3.23303 21.3415 3.23303 20.2876 3.23303 19.2166C2.15824 19.2166 1.08345 19.2166 0 19.2166C0 18.1414 0 17.0832 0 16.0122C1.07479 16.0122 2.14957 16.0122 3.23736 16.0122C3.23736 10.6744 3.23736 5.34944 3.23736 0.0159157C3.30237 0.0116489 3.34571 0.00738204 3.39338 0.00738204C7.7272 0.00738204 12.061 -0.0139521 16.3948 0.0159157C18.8954 0.032983 21.071 0.933282 22.8999 2.61441C24.4341 4.02246 25.4222 5.74625 25.8122 7.77726C26.3539 10.6062 25.7212 13.1876 23.9443 15.4746C22.7265 17.0448 21.136 18.1286 19.2292 18.7473C18.2974 19.0502 17.3396 19.2081 16.3602 19.2081C13.1401 19.2123 9.92444 19.2081 6.70442 19.2123C6.63941 19.2081 6.5744 19.2081 6.50073 19.2081ZM6.50506 3.2075C6.50506 7.48712 6.50506 11.7454 6.50506 16.008C6.55273 16.008 6.59174 16.008 6.63074 16.008C9.88111 16.008 13.1315 16.0165 16.3818 15.9994C16.8846 15.9952 17.4003 15.9226 17.8857 15.7989C21.3224 14.9029 23.3636 11.5747 22.5835 8.17408C21.9161 5.27264 19.2898 3.2075 16.2648 3.2075C13.0795 3.2075 9.89411 3.2075 6.70875 3.2075C6.64374 3.2075 6.57874 3.2075 6.50506 3.2075Z" fill="#E5E5E5"/>
        </svg>
        </p>
        </div>
      </div>
    </div>
  );
}
