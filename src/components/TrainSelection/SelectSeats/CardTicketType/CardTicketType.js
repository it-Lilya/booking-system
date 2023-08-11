import React, { useEffect, useState } from 'react';
import './CardTicketType.css';
import { TypeWagonsContainer } from '../TypeWagonsContainer/TypeWagonsContainer';
import { NewActiveCard } from './NewActiveCard';

export function CardTicketType() {
    const ticket = JSON.parse(localStorage.getItem('chosen-ticket'));
    const [arr, setArr] = useState([]);
    const [active, setActive] = useState(arr[0]);
    useEffect(() => {
        fetch(`https://students.netoservices.ru/fe-diplom/routes/${ticket.departure._id}/seats?`)
            .then((res) => res.json())
            .then((data) => {
                setArr(data);
                setActive(data[0])
            });
    }, [])
    useEffect(() => {
        const cardsWagon = document.querySelectorAll('.number-wagon-cards');
        if (cardsWagon[0] !== undefined) {
            cardsWagon[0].classList.add('number-wagon-active');
        }
    }, [arr]);
    useEffect(() => localStorage.setItem('active', JSON.stringify(active)));
    function numberWagon(e) {
        if (String(parseInt(e.match(/\d+/))).length === 1) {
            return `${0}${parseInt(e.match(/\d+/))}`
        }
        return parseInt(e.match(/\d+/));
    }
    function activeWagons(e) {
        const cardsWagon = document.querySelectorAll('.number-wagon-cards');
        cardsWagon.forEach((card) => {
            card.classList.remove('number-wagon-active');
            e.target.classList.add('number-wagon-active');
        })
        if (cardsWagon[0].classList.contains('number-wagon-active')) {
            setActive(arr[0]);
        }
        if (cardsWagon[1]!== undefined && cardsWagon[1].classList.contains('number-wagon-active')) {
            setActive(arr[1]);
        }
        if (cardsWagon[2]!== undefined && cardsWagon[2].classList.contains('number-wagon-active')) {
            setActive(arr[2]);
        }
    }
    return (
        <div className='tickets-type-wagons'>
            <TypeWagonsContainer />
            <div className='tickets-wagon-information'>
                <p>Вагоны</p>
                <div className='wagons-contain'>
                    {arr.map((el) => (
                        <p className='number-wagon-cards number-wagon-first' onClick={activeWagons}>{numberWagon(el.coach.name)}</p>  
                    ))}
                </div>
                <p className='text-'>Нумерация вагонов начинается с головы поезда</p>
            </div>
           <NewActiveCard card={active} />
        </div>
    )
}