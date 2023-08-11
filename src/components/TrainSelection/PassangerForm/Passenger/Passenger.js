import React, { useEffect, useState } from 'react';

export function Passenger() {
    const [category, setCategory] = useState('Взрослый');
    const [genderChosen, setGender] = useState('man');
    const [restrictions, setRestrictions] = useState('no');
    const [series, setSeries] = useState('');
    const [number, setNumber] = useState('');
    function change(e) {
        if (e.target.value !== 'Детский') {
            setCategory('Взрослый');
        } else {
            setCategory('Детский');
        }
    }
    function active(e) {
        document.querySelectorAll('.gender-btn').forEach((btn) => {
            btn.classList.remove('gender-btn-active');
            e.target.classList.add('gender-btn-active');
            setGender(e.target.name)
        })
    }
    function radioBtn(e) {
        e.target.classList.toggle('copy-radio-active');
        if (e.target.classList.contains('copy-radio-active')) {
            setRestrictions('yes');
        } else {
            setRestrictions('no');
        }
    }
    function validateSeries(e) {
        if (String(e.target.value).length === 4) {
            setSeries(e.target.value);
        } else {
            setSeries(String(e.target.value).slice(0,4));
        }
    }
    function validateNumber(e) {
        if (e.target.type === 'number') {
           if (String(e.target.value).length === 6) {
            setNumber(e.target.value);
            } else {
                setNumber(String(e.target.value).slice(0, 6));
            } 
        }
        if (e.target.type === 'text') {
            if (String(e.target.value).length === 12) {
             setNumber(e.target.value);
             } else {
                setNumber(String(e.target.value).slice(0, 12));
             } 
         }
        
        if (document.querySelector('.clue').classList.contains('clue-open')) {
            document.querySelector('.clue').classList.remove('clue-open');
        }
        if (e.target.value === '') {
            document.querySelector('.clue').classList.add('clue-open')
        }
    }
    useEffect(() => {
        if (document.querySelector('.select-pass-result').value === 'Детский') {
            document.querySelector('.select-pass-password').children[0].textContent = 'Свидетельство о рождении';
            document.querySelector('.select-pass-password').value = 'Свидетельство о рождении';
            document.querySelector('.basic-document-type-series').style.display = 'none';
            document.querySelector('.password-number').placeholder = '____________';
            document.querySelector('.password-number').type = 'text';
            document.querySelector('.clue').classList.add('clue-open');
        } 
        if (document.querySelector('.select-pass-result').value === 'Взрослый') {
            document.querySelector('.select-pass-password').children[0].textContent = 'Паспорт РФ';
            document.querySelector('.basic-document-type-series').style.display = 'block';
            document.querySelector('.password-number').placeholder = '______';
            document.querySelector('.clue').classList.remove('clue-open');
            document.querySelector('.password-number').type = 'number';
        }
        console.log(document.querySelector('.password-number').type)
    }, [category])
    return (
        <section className='first-pass-form'>
            <div className='title-pas'>
                <div className='header-pas-form'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="15" stroke="#928F94" stroke-width="2"/>
                    <line x1="8" y1="16" x2="24" y2="16" stroke="#928F94" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                 <h4 className='form-pas-title'>Пассажир 1</h4>
                 <svg className='cross-list' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M10.3 0.3L6 4.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L4.6 6L0.3 10.3C-0.1 10.7 -0.1 11.3 0.3 11.6L0.4 11.7C0.8 12.1 1.4 12.1 1.7 11.7L6 7.4L10.2 11.6C10.6 12 11.2 12 11.6 11.6C12 11.2 12 10.6 11.6 10.2L7.4 6L11.7 1.7C12.1 1.3 12.1 0.7 11.7 0.4L11.6 0.3C11.2 -0.1 10.6 -0.1 10.3 0.3Z" fill="#928F94"/>
                </svg>
            </div>
            </div>
           <form className='general-form-pas'>
            <div className='select-option'>
                <select className='select-pass' onChange={change}>
                    <option className='option-pass'>Взрослый</option>
                    <option className='option-pass'>Детский</option>
                </select>
                <input className='select-pass-result' value={category}></input>
            </div>
            <div className='basic-information'>
                <div className='surname'>
                    <p className='basic-information-text'>Фамилия</p>
                    <input type='text' className='input-basic-info' required></input>
                </div>
                <div className='name'>
                    <p className='basic-information-text'>Имя</p>
                    <input type='text' className='input-basic-info' required></input>
                </div>
                <div className='full-name'>
                    <p className='basic-information-text'>Отчество</p>
                    <input type='text' className='input-basic-info' required></input>
                </div>
            </div>

            <div className='gender-and-date'>
                <div className='gender-basic'>
                    <p className='basic-information-text'>Пол</p>
                    <div className='gender'>
                        <button className='gender-btn gender-btn-active gender-btn-first' type='button' onClick={active} name='man'>M</button>
                        <button className='gender-btn gender-btn-second' type='button' onClick={active} name='woman'>Ж</button>
                        <input className='chosen-gender' value={genderChosen} required></input>
                    </div>
                </div>
                <div className='basic-date'>
                <p className='basic-information-text'>Дата рождения</p>
                <div className='info-date'>
                    <input type="date" id="date" name="date" className='input-basic-date' placeholder='ДД/ММ/ГГГГ' required />
                </div>
                </div>
            </div>
            <div className='basic-restrictions'>
                <input id='radio-btn' className='radio-btn' type='radio' value={restrictions}></input>
                <lebel for='radio-btn' className='label-radio'>ограниченная подвижность</lebel>
                <div className='copy-radio' onClick={radioBtn}></div>
            </div>
            <div className='border-bottom'></div>
            <div className='basic-password'>
                <div className='basic-document-type'>
                    <p className='basic-information-text'>Тип документа</p>
                    <div className='select-option-password'>
                        <select className='select-pass-password'>
                            <option className='option-password'>Паспорт РФ</option>
                            <option className='option-password'>Паспорт РФ</option>
                        </select>
                     </div>
                </div>
                <div className='basic-document-type basic-document-type-series'>
                    <p className='basic-information-text'>Серия</p>
                    <input className='password-series' type='number' placeholder='____' onChange={validateSeries} value={series} required></input>
                </div>
                <div className='basic-document-type'>
                    <p className='basic-information-text'>Номер</p>
                    <input className='password-number' type='number' placeholder='______' onChange={validateNumber} value={number} required></input>
                    <p className='clue'>12 символов</p>
                </div>
            </div>
            <div className='border-bottom'></div>
            <button type='button' className='next-passenger'>Следующий пассажир</button>
           </form>
        </section>
    )
}