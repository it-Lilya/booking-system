import React from 'react';
import format from 'date-fns/format';
import './HeaderForm.css';
import { MyApp } from './Calendar/Calendar';
import { Cities } from './Cities/Cities';

function click(e) {
  e.preventDefault();
    const inputs = e.target.parentElement.parentElement.querySelectorAll('.form-input');
    if (inputs[0].classList.contains('first')) {
      localStorage.setItem('first-city', inputs[0].value);
      localStorage.setItem('first-city-id', inputs[0].id);
    }
    if (inputs[1].classList.contains('second')) {
      localStorage.setItem('second-city', inputs[1].value);
      localStorage.setItem('second-city-id', inputs[1].id);
    }
    if (inputs[0].value !== '' && inputs[1].value !== '') {
      fetch(`https://students.netoservices.ru/fe-diplom/routes?from_city_id=${inputs[0].id}&to_city_id=${inputs[1].id}`)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('direction-there', JSON.stringify(data.items));
          localStorage.setItem('direction-there-copy', JSON.stringify(data.items))
        });
      setInterval(() => {
        if (localStorage.getItem('direction-there')) {
          console.log(window.location.href)
          window.location.href = 'http://localhost:3000/booking-system/train-selection';
        }
      }, 100)
    }
    if (inputs[0].value === '' || inputs[1].value === '') {
      document.querySelector('.App').classList.add('app-hide')
      document.querySelector('.error-window').classList.add('window-active');
      document.querySelector('.window-button').addEventListener('click', () => {
        document.querySelector('.App').classList.remove('app-hide');
        document.querySelector('.error-window').classList.remove('window-active');
        inputs.forEach((inp) => {
          inp.value = '';
          inp.textContent = '';
        });
      });
    }
    const inputsDate = document.querySelectorAll('.date-inputs input');
    if (inputsDate[0].classList.contains('first')) {
      localStorage.setItem('first-date', inputsDate[0].value);
    }
    if (inputsDate[1].classList.contains('second')) {
      localStorage.setItem('second-date', inputsDate[1].value);
    }
    let array = [];
    if (inputsDate[1].value !== '') {
      fetch(`https://students.netoservices.ru/fe-diplom/routes?from_city_id=${inputs[1].id}&to_city_id=${inputs[0].id}`)
        .then((response) => response.json())
        .then((data) => { 
          data.items.forEach((el) => {
            const convertDate = new Date(el.departure.from.datetime * 1000);
            const formatDate = format(convertDate, 'dd.MM.yyyy');
            if (formatDate === inputsDate[1].value) {
              array.push(el);
              localStorage.setItem('back', JSON.stringify(array));
            }
          })
        })
    }
}

export function HeaderForm() {
  return (
    <div className='bottom-form-container'>
      <form id='form-search' className='bottom-form'>
        <div className='fir'>
          <h4 className='form-direction'>Направление</h4>
        <div className='input-container'>
          <Cities />
        </div>
        </div>
        <div className='sec'>
          <h4 className='form-direction'>Дата</h4>
        <div className='search-data'>
            <MyApp />
        </div>
        </div>
        </form>
        <div onClick={click} id='btn-search' className='search-button' type='button'>
          Найти билеты
          {/* <NavLink to='/train-selection'></NavLink> */}
        </div>
    </div>
  )
}
