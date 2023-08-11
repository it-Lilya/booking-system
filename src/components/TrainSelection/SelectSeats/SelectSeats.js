import React, { useEffect, useState } from 'react';
import './SelectSeats.css';
import { NumberOfTickets } from './NumberOfTickets/NumberOfTickets';
import { SelectMain } from './SelectMain/SelectMain';
import { CardTicketType } from './CardTicketType/CardTicketType';
import { TypeWagonsContainer } from './TypeWagonsContainer/TypeWagonsContainer';

export function SelectSeats() {
  const ticket = JSON.parse(localStorage.getItem('chosen-ticket'));
  const [back, setBack] = useState('');
  useEffect(() => {
    if (localStorage.getItem('back-ticket') !== null) {
      setBack(
        <>
          <SelectMain element={JSON.parse(localStorage.getItem('back-ticket'))} />
          <NumberOfTickets />
          <TypeWagonsContainer />
        </>
      );
    }
  }, []);
  useEffect(() => {
    if (document.querySelectorAll('.select-top-panel')[1] !== undefined) {
      const container = document.querySelectorAll('.select-top-panel')[1];
      container.style.justifyContent = 'flex-end';
      container.firstChild.classList.add('back-btn-ticket');
    }
    if (document.querySelectorAll('.general-type-wagons')[1] !== undefined) {
      document.querySelectorAll('.general-type-wagons')[1].style.height = '300px';
    }
  }, [back]);
  return (
    <section className='select-seats-container'>
      <h3>Выбор мест</h3>
      <div className='select-main'>
        <SelectMain element={ticket} />
        <NumberOfTickets />
        <CardTicketType />
      </div>
      <div className='select-bottom'></div>
      {back}
      <button id='button-next-btns' className='button-next-btns' type='button'>
        Далее
      </button>
    </section>
  );
}
