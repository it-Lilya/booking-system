import React, { useEffect, useState, useRef } from 'react';
import './PassangerForm.css';
import { Passenger } from './Passenger/Passenger';

export function PassangerForm() {
    let count = 1;
    const [arr, setArr] = useState([]);
    let number = useRef(Number(JSON.parse(localStorage.getItem('adults'))) + Number(JSON.parse(localStorage.getItem('childrens'))));
    let arrCopy = [];
    const nextBtn = document.querySelector('.further-btn');
    useEffect(() => numbersPassengers(), []);
    function newCard() {
        number.current = number.current + 1;
        numbersPassengers();
    }
    function numbersPassengers() {
        for (let i  = 0; i < number.current; i++) {
            arrCopy.push({id: i + 1});
            setArr(arrCopy);
        }
    }
    useEffect(() => {
        document.querySelectorAll('.cross-list').forEach((del) => {
            del.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(e.target.id)
                localStorage.removeItem(`person-${e.target.id}`);
                setArr(arr.filter((n) => String(n.id) !== e.target.id));
                if (number.current > 0) {
                    number.current = number.current - 1;
                }
            })
        })
    });
  useEffect(() => {
    if (document.querySelector('.further-btn').classList.contains('not-active') === false) {
        console.log('asndjas')
    }
  }, [nextBtn]);
    return (
        <div className='passanger-form-container'>
            {arr.map(() => (
                <Passenger elem={count++} />
            ))}
            <section className='first-pass-form'>
            <div className='title-pas-bottom'>
                <p className='form-pas-title-bottom'>Добавить пассажира</p>
                <i className='form-pas-icon' onClick={newCard}></i>
            </div>
            </section>
            <button className='further-btn not-active'>Далее</button>
        </div>
    )
}