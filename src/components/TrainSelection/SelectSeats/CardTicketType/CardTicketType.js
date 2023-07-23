import React, { useEffect, useState } from 'react';
import './CardTicketType.css';
import { TypeWagonsContainer } from '../TypeWagonsContainer/TypeWagonsContainer';

export function CardTicketType({ arr }) {
    const [active, setActive] = useState(arr[0]);
    function activeWagon(e) {
        if (e.target.classList.contains('number-wagon-first')) {
            document.querySelector('.number-wagon-second').classList.remove('number-wagon-active');
            setActive(arr[1])
        } else {
            document.querySelector('.number-wagon-first').classList.remove('number-wagon-active');
            setActive(arr[0])
        }
        e.target.classList.add('number-wagon-active'); 
    }
    useEffect(() => {
        // console.log(active);
    }, [active])
    return (
        <div className='tickets-type-wagons'>
            <TypeWagonsContainer element={active}/>
            <div className='tickets-wagon-information'>
                <p>Вагоны 
                    <span className='number-wagon-cards number-wagon-first number-wagon-active' onClick={activeWagon}>07</span>
                    <span className='number-wagon-cards number-wagon-second' onClick={activeWagon}>09</span>
                </p>
                <p className='text-'>Нумерация вагонов начинается с головы поезда</p>
            </div>
            <div className='tickets-wagon-column'>

            </div>
        </div>
    )
}