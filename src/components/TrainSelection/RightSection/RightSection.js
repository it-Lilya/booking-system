import React, { useState, useEffect } from 'react';
import './RightSections.css';
import format from 'date-fns/format';
import { CardsSorting } from './CardsSorting/CardsSorting';

export function RightSection() {
  const sortList = ['времени', 'стоимости', 'длительности'];
  const [sortType, setType] = useState(sortList[0]);
  const [arr, setArr] = useState([]);
  const [resultNumber, setResultNumber] = useState();
  const dataThere = JSON.parse(localStorage.getItem('direction-there'));
  const [arrayThere, setArrayThere] = useState(dataThere);
  const [activeData, setActiveData] = useState([]);
  useEffect(() => localStorage.setItem('active-arr', JSON.stringify(arr)),[arr]);
  useEffect(() => {
    if (localStorage.getItem('first-date') && arrayThere.length !== 0) {
      const a = [];
      a.length = 0;
      dataThere.forEach((el) => {
        const convertDate = new Date(el.departure.from.datetime * 1000);
        const formatDate = format(convertDate, 'dd.MM.yyyy');
        if (localStorage.getItem('first-date') === formatDate) {
          a.push(el);
        }
        setArr(a);
        setActiveData(a);
      });
    } else {
      setArr(dataThere);
      setActiveData(dataThere);
    }
  }, [arrayThere]);
  useEffect(() => {
    const dateFilter = document.querySelectorAll('.travel-date');
    dateFilter.forEach((date) => {
      date.addEventListener('input', (e) => {
        if (e.target.classList.contains('travel-date-first')) {
          const activeSortArray = [];
          setArr(arrayThere);
          activeData.forEach((elem) => {
            const convertDate = new Date(elem.departure.from.datetime * 1000);
            const formatDate = format(convertDate, 'dd.MM.yyyy');
            if (formatDate === e.target.value) {
              activeSortArray.push(elem);
              setArr(activeSortArray);
              setActiveData(activeSortArray);
            }
            if (formatDate !== e.target.value) {
              setArr(activeSortArray);
            }
          });
        }
        if (e.target.value === '') {
          setArr(arrayThere);
          setActiveData(arrayThere);
        }
      });
    });
  }, [arr]);
  useEffect(() => {
    if (activeData.length !== 0) {
      const inputMinPrice = document.querySelector('.range-price-min');
      inputMinPrice.addEventListener('input', (e) => {
        setArr(activeData.filter((minPrice) => (minPrice.min_price >= Number(e.target.value))));
      })
      setActiveData(arr);
    }
}, [activeData]);
  useEffect(() => {
    setResultNumber(arr.length);
  }, [arr]);
  function sortingPrices(array) {
    return [...array].sort((a, b) => a.min_price - b.min_price);
  }
  function sortingTime(array) {
    return [...array].sort(
      (a, b) => a.departure.from.datetime - b.departure.from.datetime
    );
  }
  function sortingDuration(array) {
    return [...array].sort(
      (a, b) => a.departure.duration - b.departure.duration
    );
  }
  function sort() {
    setType();
    document.querySelector('.btn-sort-container').classList.add('btn-container-active');
  }
  function sortSelection(e) {
    setType(e.target.textContent);
    document.querySelector('.btn-sort-container').className =
      'btn-sort-container';
    if (e.target.textContent === 'длительности') {
      setArr(sortingDuration(arr));
    }
    if (e.target.textContent === 'времени') {
      setArr(sortingTime(arr));
    }
    if (e.target.textContent === 'стоимости') {
      setArr(sortingPrices(arr));
    }
  }
  function active(e) {
    const buttons = document.querySelectorAll('.sort-number');
    buttons.forEach((btn) => btn.classList.remove('sort-number-active'));
    e.target.classList.add('sort-number-active');
  }
  function filtres(parent) {
    if (parent.classList.contains('coupe')) {
      setArr(
        arr.filter((object) => object.departure.have_second_class === true)
      );
    }
    if (parent.classList.contains('reserved')) {
      setArr(
        arr.filter((object) => object.departure.have_third_class === true)
      );
    }
    if (parent.classList.contains('seated')) {
      setArr(
        arr.filter((object) => object.departure.have_fourth_class === true)
      );
    }
    if (parent.classList.contains('lux')) {
      setArr(
        arr.filter((object) => object.departure.have_first_class === true)
      );
    }
    if (parent.classList.contains('wifi')) {
      setArr(arr.filter((object) => object.departure.have_wifi === true));
    }
    if (parent.classList.contains('express')) {
      setArr(arr.filter((object) => object.departure.is_express === true));
    }
  }

  useEffect(() => {
    const optionsFilter = document.querySelectorAll('.option-element');
    optionsFilter.forEach((option) => {
      option.addEventListener('click', () => {
        setTimeout(() => {
          if (
            arr.length !== 0 &&
            option.querySelector('input').value === 'true'
          ) {
            setArr(activeData);
            filtres(option);
          }
          if (option.querySelector('input').value === 'false') {
            setArr(activeData);
          }
        }, 0);
      });
    });
  }, [arr]);
  function sortingTimes(fromMin, fromMax) {
    const minLine =
      fromMin.parentElement.parentElement.querySelector(
        '.line-input-first'
      ).firstChild;
    const maxLine =
      fromMax.parentElement.parentElement.querySelector(
        '.line-input-first'
      ).lastChild;
    const resultLineMin = minLine.textContent.split(':');
    const resultLineMax = maxLine.textContent.split(':');
    const array = [];
    if (activeData.length !== 0) {
      array.length = 0;
      activeData.forEach((elem) => {
        const timesElementFrom = new Date(elem.departure.from.datetime * 1000);
        const hourElement = timesElementFrom.getHours();
        if (
          hourElement > Number(resultLineMin[0]) &&
          hourElement < Number(resultLineMax[0])
        ) {
          array.push(elem);
          setTimeout(() => {
            setArr(array);
          }, 0);
        } else if (
          hourElement === Number(resultLineMin[0]) &&
          hourElement < Number(resultLineMax[0])
        ) {
          const minutesElementMin = new Date(
            elem.departure.from.datetime * 1000
          ).getMinutes();
          if (minutesElementMin >= Number(resultLineMin[1])) {
            array.push(elem);
            setTimeout(() => {
              setArr(array);
            }, 0);
          }
        } else if (
          hourElement > Number(resultLineMin[0]) &&
          hourElement === Number(resultLineMax[0])
        ) {
          const minutesElementMin = new Date(
            elem.departure.from.datetime * 1000
          ).getMinutes();
          if (minutesElementMin <= Number(resultLineMax[1])) {
            array.push(elem);
            setTimeout(() => {
              setArr(array);
            }, 0);
          }
          if (minutesElementMin > Number(resultLineMax[1])) {
            array.length = 0;
            setTimeout(() => {
              setArr(array);
            }, 0);
          }
        } else {
          setTimeout(() => {
            setArr([]);
          }, 0);
        }
      });
    }
  }
  useEffect(() => {
    const btns = document.querySelectorAll('.btns-directions');
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (e.target.parentElement.parentElement.children[1].id === '1') {
          setTimeout(() => {
            const fromMin = document.querySelector('.range-min-from');
            const fromMax = document.querySelector('.range-max-from');
            fromMin.addEventListener('mouseup', () => {
              sortingTimes(fromMin, fromMax);
            });
            fromMax.addEventListener('mouseup', () => {
              sortingTimes(fromMin, fromMax);
            });
          }, 0);
        }
      });
    });
  }, [arr]);
  return (
    <section className='right-section'>
      <div className='sort-result-container'>
        <p>
          найдено <span>{resultNumber}</span>
        </p>
        <div className='sort-selection'>
          сортировать по:
          <p className='result-sort' onClick={sort}>
            {sortType}
          </p>
          <div className='btn-sort-container'>
            {sortList.map((elem, i) => (
              <li className='btn-sort' key={i} onClick={sortSelection}>
                {elem}
              </li>
            ))}
          </div>
        </div>
        <p className='sort-number-container'>
          показывать по:
          <button
            className='sort-number sort-number-active'
            type='button'
            onClick={active}
          >
            5
          </button>
          <button className='sort-number' type='button' onClick={active}>
            10
          </button>
          <button className='sort-number' type='button' onClick={active}>
            20
          </button>
        </p>
      </div>
      <div className='ticket-list'>
        {arr.map((there) => (
          <CardsSorting element={there} key={Math.random()} />
        ))}
        <div className='panel-ticket-page'>
          <button className='panel-btn'>
            <i className='panel-left'></i>
          </button>
          <button className='panel-btn panel-btn-active'>1</button>
          <button className='panel-btn'>2</button>
          <button className='panel-btn'>3</button>
          <button className='panel-btn'>
            <i className='panel-right'></i>
          </button>
        </div>
      </div>
    </section>
  );
}
