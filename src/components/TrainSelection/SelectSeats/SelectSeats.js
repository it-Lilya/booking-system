import React, { useEffect, useState} from 'react';
import './SelectSeats.css';
import { TicketsTypeWagons } from './TicketsTypeWagons/TicketsTypeWagons';
import { NumberOfTickets } from './NumberOfTickets/NumberOfTickets';
import { SelectMain } from './SelectMain/SelectMain';
// import { TypeWagonsContainer } from './TypeWagonsContainer/TypeWagonsContainer';
import { CardTicketType } from './CardTicketType/CardTicketType';

export function SelectSeats() {
 const ticket = JSON.parse(localStorage.getItem('chosen-ticket'));
 const [received, setReceived] = useState([]);
 const [seats, setSeats] = useState();
  useEffect(() => {
    fetch(`https://students.netoservices.ru/fe-diplom/routes/${ticket.departure._id}/seats?`)
      .then((res) => res.json())
      .then((data) => setReceived(data));
  }, [])

  useEffect(() => {
    if (received !== undefined) {
      // received.forEach((e) => console.log(e))
    }
  }, [received])
  // useEffect(() => {
  //   const contains = document.querySelectorAll('.select-seats-contain');
  //   console.log(contains)
  //   contains[1].style.background = 'white';
  //   contains[1].style.marginTop = '25px';
  //   contains[1].style.boxShadow = 'none';
  //   const panels = document.querySelectorAll('.select-top-panel');
  //   panels[1].style.marginLeft = '62%';
  // }, []);
  return (
    <section className='select-seats-container'>
      <h3>Выбор мест</h3>
      <div className='select-main'>
        <SelectMain element={ticket} />
        <NumberOfTickets />

           <CardTicketType arr={received}/>
      </div>
      <div className='select-bottom'>
        {/* <SelectMain element={ticket}/>
        <TypeWagonsContainer /> */}
      </div>
      <button className='button-next-btns' type='button'>Далее</button>
    </section>
  );
}
