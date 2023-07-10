import React, { useState, useEffect } from 'react';
import './TrainSelection.css';
import { HeaderMenu } from '../Header/Cap/HeaderMenu/HeaderMenu';
import { HeaderForm } from '../Header/Cap/HeaderBottom/Bottom/HeaderForm/HeaderForm';
import { ProgressOrder } from './ProgressOrder/ProgressOrder';
import { LeftSection } from './LeftSection/LeftSection';
import { Footer } from '../Footer/Footer';
import { RightSection } from './RightSection/RightSection';
import { SelectSeats } from './SelectSeats/SelectSeats';
// import { Passengers } from './LeftSection/Passengers/Passengers';
import animation from '../../images/loading.gif';

function workWithForm() {
  const trainFormContainer = document.querySelector('.bottom-form-container');
  trainFormContainer.classList.add('train-form-container');
  trainFormContainer.querySelector('.search-button').style.width = '21%';
  trainFormContainer.querySelector('.search-button').style.right = '2%';
  trainFormContainer.querySelector('.search-button').style.top = '62%';
  const trainForm = trainFormContainer.firstChild;
  trainForm.classList.add('train-form');
  const trainBlocks = trainForm.childNodes;
  trainBlocks.forEach((e) => {
    e.classList.add('blocks-train');
  });
  const cityInput = document.querySelectorAll('.form-input');
  cityInput[0].value = localStorage.getItem('first-city');
  cityInput[0].id = localStorage.getItem('first-city-id');
  cityInput[1].value = localStorage.getItem('second-city');
  cityInput[1].id = localStorage.getItem('second-city-id');
  const inpDate = document.querySelectorAll('.form-input-date');
  if (localStorage.getItem('first-date') !== '') {
    inpDate[0].value = localStorage.getItem('first-date');
  }
  if (localStorage.getItem('second-date') !== '') {
    inpDate[1].value = localStorage.getItem('second-date');
  }
}
export function TrainSelection() {
  const resSortedFirst = <RightSection />;
  const resSelectSeats = <SelectSeats />;
  // const resPassengers = <Passengers />;
  const [line, setLine] = useState(2);
  const animLoading = <main className='animation'>
    <div className='search-progress-line'></div>
    <p className='search-progress-text'>Идет поиск</p>
    <img className='loading' src={animation} alt='loading...'></img>
  </main>;
  const [main, setMain] = useState(animLoading);
  const [right, setRight] = useState(resSortedFirst);
  const firstMain = <main className='main-contain'><LeftSection />{right}</main>;
  const orders = useState(<ProgressOrder />);
  function lineProgress() {
    setTimeout(() => {
      if (line <= 99) {
        setLine(Number(line) + 2);
        document.querySelector('.search-progress-line').style.width = `${line}%`;
      }
      if (line === 100) {
        clearTimeout();
        setLine(100);
        setMain(firstMain);
      }
    }, 20);
  }
  // function destructuringDate(e) {
  //   return `${e.slice(6)}${e.slice(2, 6)}${e.slice(0, 2)}`;
  // }
  useEffect(() => {
    workWithForm();
    // const btn = document.getElementById('btn-search');
    // btn.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   const inputs = document.querySelectorAll('.form-input');
    //   if (inputs[0].classList.contains('first')) {
    //     localStorage.setItem('first-city', inputs[0].value);
    //     localStorage.setItem('first-city-id', inputs[0].id);
    //   }
    //   if (inputs[1].classList.contains('second')) {
    //     localStorage.setItem('second-city', inputs[1].value);
    //     localStorage.setItem('second-city-id', inputs[1].id);
    //   }
    //   const dateInputs = document.querySelectorAll('.form-input-date');
    //   if (dateInputs[0].value !== '') {
    //     localStorage.setItem('first-date-seconds', dateInputs[0].value);
    //   }
    //   if (dateInputs[1].value !== '') {
    //     localStorage.setItem('second-date-seconds', dateInputs[1].value);
    //   }
    //   fetch(`https://students.netoservices.ru/fe-diplom/routes?from_city_id=${inputs[0].id}&to_city_id=${inputs[1].id}`)
    //     .then((response) => response.json())
    //     .then((data) => localStorage.setItem('direction-there', JSON.stringify(data.items)));
    // setTimeout(() => window.location.reload(), 1000);
    // setMain(animLoading);
    // setLine(2);
    // lineProgress();
    // setMain(firstMain);
    // });
  }, []);
  useEffect(() => {
    lineProgress();
  });
  useEffect(() => {
    const btn = document.querySelectorAll('.select-seats-btn');
    btn.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        setRight(resSelectSeats);
        setMain(firstMain);
      });
    });
  });
  useEffect(() => {
    const btn = document.querySelector('.button-next-btns');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('click');
        // const paragraphs = document.querySelectorAll('.paragraph');
        // paragraphs[1].classList.add('paragraph-active');
        // paragraphs[1].querySelector('.triandle-end').classList.add('triangle-active');
        // paragraphs[1].previousElementSibling.querySelector('.start-triangle').classList.add('start-triangle-active');
        // setRight(resPassengers);
      });
    }
  });
  return (
    <>
      <header className='train-header'>
        <div className='train-image'>
          <div className='main-container'>
            <div className='main-logo'>Лого</div>
          </div>
          <HeaderMenu />
          <HeaderForm />
          {orders}
        </div>
      </header>
        {main}
      <Footer />
    </>
  );
}
