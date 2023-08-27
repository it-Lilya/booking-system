import React, { useState } from 'react';
import './Cities.css';

export const Cities = () => {
  const [citiesList, setCities] = useState([]);
  function citiesQuery(e) {
    const regexp = /^[А-Яа-я-]*$/;
    if (!e.target.value.match(regexp)) {
      e.target.value = '';
    }
    const lists = document.querySelectorAll('.city-list');
    if (e.target.value !== '') {
      fetch(`https://students.netoservices.ru/fe-diplom//routes/cities?name=${e.target.value}`)
        .then((response) => response.json(response))
        .then((data) => {
          if (data.length === 0) {
            return;
          }
          setCities(data);
          lists.forEach((list) => {
            list.classList.remove('open-citi-list');
          });
          e.target.parentElement.querySelector('ul').classList.add('open-citi-list');
        });
    }

    if (e.target.value === '') {
      e.target.parentElement.querySelector('ul').classList.remove('open-citi-list');
    }
  }
  function selectionCity(e) {
    const input = e.target.parentNode.parentNode.parentNode.firstChild;
    input.value = e.target.textContent.toUpperCase();
    input.nextElementSibling.nextElementSibling.classList.remove(
      'open-citi-list'
    );
    input.id = e.target.parentElement.id;
  }
  function replacement(e) {
    e.preventDefault();
    const firstInput = document.querySelector('.first');
    const secondInput = document.querySelector('.second');
    const movementFirst = document.querySelector('.second').value;
    const idFirst = document.querySelector('.second').id;
    const movementSecond = document.querySelector('.first').value;
    const idSecond = document.querySelector('.first').id;
    firstInput.value = movementFirst;
    secondInput.value = movementSecond;
    firstInput.id = idFirst;
    secondInput.id = idSecond;
  }

  return (
    <div className='input-conatiner'>
      <div className='city-inputs'>
        <input
          className='form-input first input'
          type='text'
          placeholder='Откуда'
          name='city-first'
          onChange={citiesQuery}
          autoComplete='off'
          required
        ></input>
        <i className='vector-city'></i>
        <ul className='city-list citi-hidden'>
          {citiesList.map((el) => (
            <li
              id={el._id}
              key={el._id}
              className='city-element'
              onClick={selectionCity}
            >
              <p>{el.name}</p>
            </li>
          ))}
        </ul>
        <div className='open-error-hidden'>Заполните поле направления!</div>
      </div>
      <button className='icon-form' onClick={replacement}></button>
      <div className='city-inputs'>
        <input
          className='form-input second input'
          type='text'
          placeholder='Куда'
          name='city-second'
          onChange={citiesQuery}
          autoComplete='off'
          required
        ></input>
        <i className='vector-city'></i>
        <ul className='city-list citi-hidden'>
          {citiesList.map((el) => (
            <li
              id={el._id}
              key={el._id}
              className='city-element'
              onClick={selectionCity}
            >
              <p>{el.name}</p>
            </li>
          ))}
        </ul>
        <div className='open-error-hidden'>Заполните поле направления!</div>
      </div>
    </div>
  );
};
