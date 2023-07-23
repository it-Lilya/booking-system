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
  trainFormContainer.style.width = '75%';
  trainFormContainer.style.height = '310px';
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
  const dateInputs = document.querySelector('.date-inputs');
  dateInputs.style.width = '140%';
  dateInputs.style.marginRight = '-80px'
  const inpDate = document.querySelectorAll('.form-input-date');
  if (localStorage.getItem('first-date') !== '') {
    inpDate[0].value = localStorage.getItem('first-date');
  }
  if (localStorage.getItem('second-date') !== '') {
    inpDate[1].value = localStorage.getItem('second-date');
  }
}
export function TrainSelection() {
  // const resPassengers = <Passengers />;
  const [line, setLine] = useState(2);
  const animLoading = <main className='animation'>
    <div className='search-progress-line'></div>
    <p className='search-progress-text'>Идет поиск</p>
    <img className='loading' src={animation} alt='loading...'></img>
  </main>;
  const [main, setMain] = useState(animLoading);
  const firstMain = useState(<main className='main-contain'><LeftSection /><RightSection /></main>);
  const orders = <ProgressOrder />;
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
        document.querySelector('.progress-order').classList.remove('progress-hidden')
      }
    }, 20);
  }
  useEffect(() => {
    workWithForm();
    const btn = document.getElementById('btn-search');
    btn.style.width = '17.5%';
    btn.addEventListener('click', (e) => {
      localStorage.clear();
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
      const dateInputs = document.querySelectorAll('.form-input-date');
      if (dateInputs[0].value !== '') {
        localStorage.setItem('first-date-seconds', dateInputs[0].value);
      }
      if (dateInputs[1].value !== '') {
        localStorage.setItem('second-date-seconds', dateInputs[1].value);
      }
      fetch(`https://students.netoservices.ru/fe-diplom/routes?from_city_id=${inputs[0].id}&to_city_id=${inputs[1].id}`)
        .then((response) => response.json())
        .then((data) => localStorage.setItem('direction-there', JSON.stringify(data.items)));
    });
  }, []);
  useEffect(() => {
    lineProgress();
  }, [line]);
  useEffect(() => {
    setTimeout(() => {
      const btns = document.querySelectorAll('.select-seats-btn');
      btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
        e.preventDefault();
        const date = JSON.parse(localStorage.getItem('direction-there'));
        const result = date.find((el) => el.departure._id === e.target.id);
        localStorage.setItem('chosen-ticket', JSON.stringify(result));
        setMain(<main className='main-contain'><LeftSection /><SelectSeats /></main>);
      })
      })
    }, 2000);
  }, []);
  // useEffect(() => {
  //   // const btn = document.querySelector('.button-next-btns');
  //   // if (btn) {
  //   //   btn.addEventListener('click', (e) => {
  //   //     e.preventDefault();
  //   //     // console.log('click');
  //   //     // const paragraphs = document.querySelectorAll('.paragraph');
  //   //     // paragraphs[1].classList.add('paragraph-active');
  //   //     // paragraphs[1].querySelector('.triandle-end').classList.add('triangle-active');
  //   //     // paragraphs[1].previousElementSibling.querySelector('.start-triangle').classList.add('start-triangle-active');
  //   //     // setRight(resPassengers);
  //   //   });
  //   // }
  // });
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
      <div className='mains-container'>
        {main}
      </div>
      <Footer />
    </>
  );
}
