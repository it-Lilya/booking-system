import React from 'react';

export function NewActiveCard({ card }) {
    function numberWagon(e) {
        if (String(parseInt(e.match(/\d+/))).length === 1) {
            return `${0}${parseInt(e.match(/\d+/))}`
        }
        return parseInt(e.match(/\d+/));
    }
      function tool(e) {
        document.querySelectorAll('.wagon-information-icons-container p').forEach((element) => {
          element.classList.remove('tooltip');
          element.innerHTML = '';
        });
        if (e.target.classList.contains('wagon-icons-button') || e.target.classList.contains('wagon-icons-element')) {
          if (e.target.classList.contains('wagon-icons-button')) {
            e.target.querySelector('p').classList.add('tooltip');
            e.target.querySelector('p').textContent = e.target.name;
          }
          if (e.target.classList.contains('wagon-icons-element')) {
            e.target.nextElementSibling.classList.add('tooltip');
            e.target.nextElementSibling.textContent = e.target.parentElement.name;
          }
        }
      }
      function options() {
        const optionContainer = document.querySelectorAll('.wagon-icons-button');
        if (card.coach.have_air_conditioning === false) {
            optionContainer[0].classList.remove('focus-icons');
            optionContainer[0].firstChild.classList.remove('conditioner-focus');
        }
        if (card.coach.have_air_conditioning === true) {
            optionContainer[0].classList.add('focus-icons');
            optionContainer[0].firstChild.classList.add('conditioner-focus')
        }
        if (card.coach.have_wifi === false) {
            optionContainer[1].classList.remove('focus-icons');
            optionContainer[1].firstChild.classList.remove('option-wifi-focus');
        }
        if (card.coach.have_wifi === true) {
            optionContainer[1].classList.add('focus-icons');
            optionContainer[1].firstChild.classList.add('option-wifi-focus')
        }
        if (card.coach.is_linens_included  === false) {
            optionContainer[2].classList.remove('focus-icons');
            optionContainer[2].firstChild.classList.remove('underwear-focus');
        }
        if (card.coach.is_linens_included  === true) {
            optionContainer[2].classList.add('focus-icons');
            optionContainer[2].firstChild.classList.add('underwear-focus')
        }
        document.querySelector('.wagon-scheme-main').className = 'wagon-scheme-main';
        if (card.coach.class_type === 'first') {
            document.querySelector('.wagon-scheme-main').classList.add('first-class-type');
            document.querySelector('.tickets-type-lux').classList.add('type-lux-focus');
        }
        if (card.coach.class_type === 'second') {
            document.querySelector('.wagon-scheme-main').classList.add('second-class-type');
            document.querySelector('.tickets-type-cupe').classList.add('type-cupe-focus');
        }
        if (card.coach.class_type === 'third') {
            document.querySelector('.wagon-scheme-main').classList.add('third-class-type');
            document.querySelector('.tickets-type-reserved').classList.add('tickets-reserved-focus');
        }
        if (card.coach.class_type === 'fourth') {
            document.querySelector('.wagon-scheme-main').classList.add('fourth-class-type');
            document.querySelector('.tickets-type-sedentary').classList.add('type-sedentary-focus')
        }
        if (card.coach.class_type !== 'first') {
            document.querySelector('.tickets-type-lux').classList.remove('type-lux-focus');
        }
        if (card.coach.class_type !== 'second') {
            document.querySelector('.tickets-type-cupe').classList.remove('type-cupe-focus');
        }
        if (card.coach.class_type !== 'third') {
            document.querySelector('.tickets-type-reserved').classList.remove('tickets-reserved-focus');
        }
        if (card.coach.class_type !== 'fourth') {
            document.querySelector('.tickets-type-sedentary').classList.remove('type-sedentary-focus')
        }
      }
    if (card !== undefined) {
        const topPlaces = Math.round(card.coach.available_seats / 3);
        const lowerPlaces = Math.round(card.coach.available_seats - card.coach.available_seats / 3);
        function price(e) {
          if (String(e).length > 3) {
            return `${String(e)[0]}${' '}${String(e).slice(1, 4)}`
          } 
          if (String(e).length <= 3) {
            return e
          }
        }
        setTimeout(() => options(), 0);

    return (
        <div className='tickets-wagon-column'>
            <div className='wagon-number-information'>
                <p className='wagon-number-information-first'>{numberWagon(card.coach.name)}</p>
                <p className='wagon-number-information-second'>вагон</p>
            </div> 
            <div className='wagon-information-header'>
          <div className='wagon-information-titles'>
            <p>Места <span className='coach-seats'>{card.coach.available_seats}</span></p>
            <p>Стоимость</p>
            <p>Обслуживание ФПК</p>
          </div>
          <div className='wagon-information-main'>
            <div className='wagon-information-left'>
              <div className='wagon-information-flex'>
                <p>Верхние <span className='position-seats'>{topPlaces}</span></p>
                <p className='coach-price'>{price(card.coach.bottom_price)} <span className='vector-ruble'>₽</span></p>
              </div>
              <div className='wagon-information-flex'>
                <p>Нижние <span className='position-seats'>{lowerPlaces}</span></p>
                <p className='coach-price'>{price(card.coach.top_price)} <span className='vector-ruble'>₽</span></p>
              </div>
            </div>
            <div className='wagon-information-right'>
              <div className='wagon-information-icons-container'>
                <button className='wagon-icons-button' name='кондиционер' type='button'>
                  <i className='conditioner wagon-icons-element' onMouseOver={tool}></i>
                  <p></p>
                </button>
                <button className='wagon-icons-button' name='WI-FI' type='button'>
                  <i className='option-wifi wagon-icons-element' onMouseOver={tool}></i>
                  <p></p>
                </button>
                <button className='wagon-icons-button' name='белье' type='button'>
                  <i className='underwear wagon-icons-element' onMouseOver={tool}></i>
                  <p></p>
                </button>
                <button className='wagon-icons-button' name='питание' type='button'>
                  <i className='food wagon-icons-element' onMouseOver={tool}></i>
                  <p></p>
                </button>
              </div>
          </div>
        </div>
        <div className='wagon-scheme-container'>
            <p className='window-wagon-scheme'>11 человек выбирают места в этом поезде</p>
            <span className='absolute-number'>{numberWagon(card.coach.name)}</span>
            <div className='wagon-scheme-main'></div>
        </div>
            </div>
        </div>
    )
    }
}