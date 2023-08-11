import React, { useEffect, useState } from 'react';
import './NumberOfTickets.css';

export function NumberOfTickets() {
    const [adults, setAdults] = useState(0);
    const [childrens, setChildrens] = useState(0);
    const [childrensWithPlaces, setChildrensWithPlaces] = useState(0);
    const [remainderAduts, setRemainderAduts] = useState(3);
    const [remainderChildren, setRemainderChildren] = useState(3);

    function passengers(e) {
        const regexp = /^[0-3]*$/;
        if (!e.target.value.match(regexp) || e.target.value.length > 1) {
            setAdults(e.target.value = 0);
            setChildrens(e.target.value = 0);
            setChildrensWithPlaces(e.target.value = 0);
        } 
        if (e.target.classList.contains('adults')) {
            setAdults(e.target.value);
            setRemainderAduts(3 - e.target.value);
        }
        if (e.target.classList.contains('childrens')) {
            setChildrens(e.target.value);
            setRemainderChildren(3 - e.target.value);
        }
        if (e.target.classList.contains('childrens-with-places')) {
            setChildrensWithPlaces(e.target.value);
        }   
    }
    useEffect(() => {
        const container = document.querySelectorAll('.tickets-container-number');
            container[0].querySelectorAll('.tickets-number').forEach((elem) => {
                elem.addEventListener('click', () => {
                    container[0].querySelectorAll('.tickets-number-active').forEach((e) => e.classList.remove('tickets-number-active'));
                    elem.classList.toggle('tickets-number-active');
                })
            })
    }, []);
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('adults', JSON.stringify(adults));
            localStorage.setItem('childrens', JSON.stringify(childrens));
        }, 0);
    }, [adults, childrens])
  return (
        <div className='number-of-tickets'>
            <h4>Количество билетов</h4>
            <div className='tickets-container-number'>
                <div className='tickets-first-number tickets-number-active tickets-number'>
                    <div className='container-border' onChange={passengers}>
                        <p className='first-input-text'>Взрослых &ndash; </p>
                        <input type='text' className='adults' defaultValue={adults}></input>
                    </div>
                    <p>Можно добавить еще <span>{remainderAduts}</span> пассажиров </p>
                </div>
                <div className='tickets-second-number tickets-number'>
                <div className='container-border' onChange={passengers}>
                <p className='first-input-text'>Детских &ndash; </p>
                    <input type='text' className='childrens' defaultValue={childrens}></input>
                </div>
                <p>Можно добавить еще <span>{remainderChildren}</span> детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%</p>
                </div>
                <div className='tickets-third-number tickets-number'>
                <div className='container-border' onChange={passengers}>
                <p className='first-input-text'>Детских &#171;без места&#187; &ndash; </p>
                    <input type='text' className='childrens-with-places' defaultValue={childrensWithPlaces}></input>
                </div>
                </div>
            </div>
          </div>
  );
}
