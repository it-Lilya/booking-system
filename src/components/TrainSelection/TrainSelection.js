import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainSelection.css';
import { HeaderMenu } from '../Header/Cap/HeaderMenu/HeaderMenu';
import { HeaderForm } from '../Header/Cap/HeaderBottom/Bottom/HeaderForm/HeaderForm';
import { ProgressOrder } from './ProgressOrder/ProgressOrder';
import { LeftSection } from './LeftSection/LeftSection';
import { Footer } from '../Footer/Footer';
import { RightSection } from './RightSection/RightSection';
import { SelectSeats } from './SelectSeats/SelectSeats';
import { Passengers } from './Passengers/Passengers';
import animation from '../../images/loading.gif';
import { PassangerForm } from './PassangerForm/PassangerForm';

function workWithForm() {
  const trainFormContainer = document.querySelector('.bottom-form-container');
  trainFormContainer.classList.add('train-form-container');
  trainFormContainer.style.width = '75%';
  trainFormContainer.style.height = '310px';
  const btn = trainFormContainer.querySelector('.search-button');
  btn.style.right = '3.7%';
  btn.style.top = '62%';
  btn.style.width = '20%';
  const trainForm = trainFormContainer.firstChild;
  trainForm.classList.add('train-form');
  trainForm.style.display = 'flex';
  const trainBlocks = trainForm.children;
  trainBlocks[0].classList.add('blocks-train-title');
  trainBlocks[2].classList.add('blocks-train-title');
  trainBlocks[1].style.width = '48%';
  trainBlocks[1].style.marginTop = '100px';
  trainBlocks[3].style.width = '48%';
  trainBlocks[3].style.marginTop = '99px';
  trainBlocks[3].style.marginLeft = '5%';
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
  const [line, setLine] = useState(2);
  const animLoading = (
    <main className='animation'>
      <div className='search-progress-line'></div>
      <p className='search-progress-text'>Идет поиск</p>
      <img className='loading' src={animation} alt='loading...'></img>
    </main>
  );
  const [main, setMain] = useState(animLoading);
  const firstMain = useState(
    <main className='main-contain'>
      <LeftSection />
      <RightSection />
    </main>
  );
  const orders = <ProgressOrder />;
  function openTicket() {
    setTimeout(() => {
      const btns = document.querySelectorAll('.select-seats-btn');
      btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const date = JSON.parse(localStorage.getItem('direction-there'));
          const result = date.find((el) => el.departure._id === e.target.id);
          localStorage.setItem('chosen-ticket', JSON.stringify(result));
          setMain(
            <main className='main-contain'>
              <LeftSection />
              <SelectSeats />
            </main>
          );
        });
      });
    }, 22);
  }
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
        document.querySelector('.progress-order').classList.remove('progress-hidden');
        openTicket();
      }
    }, 10);
  }
  useEffect(() => {
    workWithForm();
    const btn = document.getElementById('btn-search');
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
      const btns = document.querySelectorAll('.select-top-icon');
      btns.forEach((btn) => {
        if (btn !== 'undefined' && btn !== null) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            setMain(animLoading);
            setLine(2);
            document.querySelector('.progress-order').classList.add('progress-hidden');
          });
        }
      });
      const btnFurther = document.querySelector('.button-next-btns');
      if (btnFurther) {
        btnFurther.addEventListener('click', (e) => {
          e.preventDefault();
          const paragraphs = document.querySelectorAll('.paragraph');
          paragraphs[1].classList.add('paragraph-active');
          paragraphs[1].querySelector('.triandle-end').classList.add('triangle-active');
          paragraphs[1].previousElementSibling.querySelector('.start-triangle').classList.add('start-triangle-active');
          setMain(     
          <main className='main-contain'>
            <Passengers />
            <PassangerForm />
          </main>)
        })
      }
    }, 0);
  }, [main]);
  useEffect(() => {
    document.addEventListener('click', () => {
      openTicket();
    });
  }, []);
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
      <div className='mains-container'>{main}</div>
      <Footer />
    </>
  );
}
