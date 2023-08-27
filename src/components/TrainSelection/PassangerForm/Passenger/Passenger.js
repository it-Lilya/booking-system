import React, { useState } from 'react';

export function Passenger({ elem }) {
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [series, setSeries] = useState('');
    const [number, setNumber] = useState('');
    const [errors, setError] = useState();
    const [example, setExample] = useState();
    let object = {
        category: 'Взрослый',
        surname: surname,
        name: name,
        full_name: fullName,
        gender: 'man',
        date: 'ДД.ММ.ГГГГ',
        restrictions: 'no',
        series: series,
        number: number
    }; 
    function change(e) {
        const parent = e.target.parentElement.parentElement;
        if (e.target.value !== 'Детский') {
            object.category = 'Взрослый';
            setTimeout(() => {
                parent.querySelector('.select-pass-password').children[0].textContent = 'Паспорт РФ';
                parent.querySelector('.select-pass-password').style.width = '80%';
                parent.querySelector('.basic-document-type-numbers').style.marginLeft = '0px'
                parent.querySelector('.basic-document-type-series').style.display = 'block';
                parent.querySelector('.password-number').placeholder = '______';
                parent.querySelector('.clue').classList.remove('clue-open');
                parent.querySelector('.password-number').type = 'number';
            })
        } else {
            object.category = 'Детский';
            setTimeout(() => {
              parent.querySelector('.select-pass-password').children[0].textContent = 'Свидетельство о рождении';
              parent.querySelector('.select-pass-password').style.width = '160%';
              parent.querySelector('.basic-document-type-numbers').style.marginLeft = '200px'
              parent.querySelector('.select-pass-password').value = 'Свидетельство о рождении';
              parent.querySelector('.basic-document-type-series').style.display = 'none';
              parent.querySelector('.password-number').placeholder = '____________';
              parent.querySelector('.password-number').type = 'text';
              parent.querySelector('.clue').classList.add('clue-open');
            })
        }
    }
    function active(e) {
        document.querySelectorAll('.gender-btn').forEach((btn) => {
            btn.classList.remove('gender-btn-active');
            e.target.classList.add('gender-btn-active');
            object.gender = e.target.name;
        })
    }
    function radioBtn(e) {
        e.target.classList.toggle('copy-radio-active');
        if (e.target.classList.contains('copy-radio-active')) {
            object.restrictions = 'yes';
        } else {
            object.restrictions = 'no';
        }
    }
    function validateSeries(e) {
        const parentForm = e.target.parentElement.parentElement.parentElement;
        parentForm.querySelector('.next-passenger').style.display = 'block';
        parentForm.querySelector('.window-ready').classList.add('ready-hidden');
        // parentForm.querySelector('.further-btn').classList.add('not-active')
        if (String(e.target.value).length === 4) {
            setSeries(e.target.value);
            parentForm.querySelector('.next-passenger').style.display = 'block';
            parentForm.querySelector('.window-error').classList.add('err-hidden');
            setError();
            setExample();
            e.target.classList.remove('is_error');
        }
        if (String(e.target.value).length < 4) {
            setSeries(e.target.value);
            parentForm.querySelector('.next-passenger').style.display = 'none';
            parentForm.querySelector('.window-error').classList.remove('err-hidden');
            setError('Серия паспорта указана некорректно');
            setExample('1234');
            e.target.classList.add('is_error');
        } 
        if (String(e.target.value).length === 0) {
            setSeries(String(e.target.value).slice(0,4));
            parentForm.querySelector('.next-passenger').style.display = 'block';
            parentForm.querySelector('.window-error').classList.add('err-hidden');
            e.target.classList.add('is_error');
            setError();
            setExample();
        }

    }
    function validateNumber(e) {
        const parentForm = e.target.parentElement.parentElement.parentElement;
        parentForm.querySelector('.next-passenger').style.display = 'block';
        parentForm.querySelector('.window-ready').classList.add('ready-hidden');
        // parentForm.parentElement.parentElement.querySelector('.further-btn').classList.add('not-active');
        if (e.target.type === 'number') {
           if (String(e.target.value).length === 6) {
                setNumber(e.target.value);
                parentForm.querySelector('.next-passenger').style.display = 'block';
                parentForm.querySelector('.window-error').classList.add('err-hidden');
                // parentForm.parentElement.parentElement.querySelector('.further-btn').classList.remove('not-active')
                setError();
                setExample();
                e.target.classList.remove('is_error');
            } else {
                setNumber(String(e.target.value).slice(0, 6));
                parentForm.querySelector('.next-passenger').style.display = 'none';
                parentForm.querySelector('.window-error').classList.remove('err-hidden');
                // parentForm.parentElement.parentElement.querySelector('.further-btn').classList.add('not-active')
                setError('Номер паспорта указана некорректно');
                setExample('123456');
                e.target.classList.add('is_error');
            }
        }
        if (e.target.type === 'text') {
            if (String(e.target.value).length === 12) {
                setNumber(e.target.value);
                parentForm.querySelector('.next-passenger').style.display = 'block';
                parentForm.querySelector('.window-error').classList.add('err-hidden');
                setError();
                setExample();
                e.target.classList.remove('is_error');
            } else {
                setNumber(String(e.target.value).slice(0, 12));
                document.querySelector('.next-passenger').style.display = 'none';
                document.querySelector('.window-error').classList.remove('err-hidden');
                setError('Номер свидетельства о рождении указано некорректно');
                setExample('VIII-ЫП-123456');
                e.target.classList.add('is_error');
            }
        }
        if (document.querySelector('.clue').classList.contains('clue-open')) {
            document.querySelector('.clue').classList.remove('clue-open');
        }
        if (e.target.type === 'text' && e.target.value === '') {
            document.querySelector('.clue').classList.add('clue-open')
        }
    }
    function objectSurname(e) {
        const regexp = /^[А-Яа-я-]*$/;
        const parentForm = e.target.parentElement.parentElement.parentElement;
        parentForm.querySelector('.next-passenger').style.display = 'block';
        parentForm.querySelector('.window-ready').classList.add('ready-hidden');
        if (e.target.name === 'surname') {
            if (e.target.value.trim() === '' || !e.target.value.match(regexp)) {
                parentForm.querySelector('.next-passenger').style.display = 'none';
                parentForm.querySelector('.window-error').classList.remove('err-hidden');
                setError('Фамилия указана некорректно');
                setExample('Иванов');
                e.target.classList.add('is_error');
            } else {
                // parentForm.parentElement.parentElement.querySelector('.further-btn').classList.add('not-active');
                e.target.classList.remove('is_error');
                setError();
                setExample();
                parentForm.querySelector('.next-passenger').style.display = 'block';
                parentForm.querySelector('.window-error').classList.add('err-hidden');
            }
            setSurname(e.target.value);
        }
        if (e.target.name === 'name') {
            if (e.target.value.trim() === '' || !e.target.value.match(regexp)) {
                parentForm.querySelector('.next-passenger').style.display = 'none';
                parentForm.querySelector('.window-error').classList.remove('err-hidden');
                setError('Имя указано некорректно');
                setExample('Иван');
                e.target.classList.add('is_error');
            } else {
               e.target.classList.remove('is_error');
               setError();
               setExample();
               parentForm.querySelector('.next-passenger').style.display = 'block';
               parentForm.querySelector('.window-error').classList.add('err-hidden');
            }
            setName(e.target.value); 
        }
        if (e.target.name === 'full-name') {
            if (e.target.value.trim() === '' || !e.target.value.match(regexp)) {
                parentForm.querySelector('.next-passenger').style.display = 'none';
                parentForm.querySelector('.window-error').classList.remove('err-hidden');
                setError('Отчество указано некорректно');
                setExample('Иванович');
                e.target.classList.add('is_error');
            } else {
                parentForm.querySelector('.next-passenger').style.display = 'block';
                parentForm.querySelector('.window-error').classList.add('err-hidden');
                setError();
                setExample();
                e.target.classList.remove('is_error');
            }
            setFullName(e.target.value);
        }
    }
    function isValidDate(e) {
        const parentForm = e.target.parentElement.parentElement.parentElement.parentElement;
        parentForm.querySelector('.next-passenger').style.display = 'block';
        parentForm.querySelector('.window-ready').classList.add('ready-hidden');
        //parentForm.parentElement.parentElement.querySelector('.further-btn').classList.add('not-active');
        if (e.target.name === 'date') {
            if (String(e.target.value).length !== '') {
                e.target.classList.remove('is_error');
            }
        }
    }
    function editForm(e) {
        if (!e.target.classList.contains('vector-pluse')) {
            const parent = e.target.parentElement.parentElement.parentElement;
            parent.querySelector('.general-form-pas').style.display = 'none';
            parent.querySelector('.cross-list').style.display = 'none';
            parent.querySelector('.vector-minus').classList.add('vector-pluse');
        } else {
            const parent = e.target.parentElement.parentElement.parentElement;
            parent.querySelector('.general-form-pas').style.display = 'block';
            parent.querySelector('.cross-list').style.display = 'block';
            parent.querySelector('.vector-minus').classList.remove('vector-pluse');
        }
    }
    function changeTypeDocument(e) {
        const parent = e.target.parentElement.parentElement.parentElement;
        if (e.target.value === 'Паспорт РФ') {
            setTimeout(() => {
                parent.querySelector('.select-pass-password').style.width = '80%';
                parent.querySelector('.basic-document-type-numbers').style.marginLeft = '0px'
                parent.querySelector('.basic-document-type-series').style.display = 'block';
                parent.querySelector('.password-number').placeholder = '______';
                parent.querySelector('.clue').classList.remove('clue-open');
                parent.querySelector('.password-number').type = 'number';
            })
        } else {
            setTimeout(() => {
                parent.querySelector('.select-pass-password').children[0].textContent = 'Свидетельство о рождении';
                parent.querySelector('.select-pass-password').style.width = '160%';
                parent.querySelector('.basic-document-type-numbers').style.marginLeft = '200px'
                parent.querySelector('.select-pass-password').value = 'Свидетельство о рождении';
                parent.querySelector('.basic-document-type-series').style.display = 'none';
                parent.querySelector('.password-number').placeholder = '____________';
                parent.querySelector('.password-number').type = 'text';
                parent.querySelector('.clue').classList.add('clue-open');
              })
        }
    }
    function validationForms(e) {
        const parentForm = document.getElementById(`${e.target.id}`);
        const inputs = parentForm.querySelectorAll('.is_error');
        if (inputs.length === 0) {
            parentForm.querySelector('.next-passenger').style.display = 'none';
            parentForm.querySelector('.window-error').classList.add('err-hidden');
            parentForm.querySelector('.window-ready').classList.remove('ready-hidden');
            parentForm.parentElement.querySelector('.further-btn').classList.remove('not-active')
        } else {
            parentForm.querySelector('.next-passenger').style.display = 'none';
            parentForm.querySelector('.window-error').classList.remove('err-hidden');
            parentForm.querySelector('.window-ready').classList.add('ready-hidden');
            parentForm.parentElement.querySelector('.further-btn').classList.add('not-active')
        }
    }
    function newObject(e) {
        object.id = e.target.parentElement.parentElement.parentElement.id[0];
        localStorage.setItem(`person-${object.id}`, JSON.stringify(object));
    }
    return (
        <section className='first-pass-form' id={`${elem}-form`}>
            <div className='title-pas'>
                <div className='header-pas-form'>
                <div className='vector-minus' onClick={editForm}>
                </div>
                 <h4 className='form-pas-title'>Пассажир {elem}</h4>
                 <div className='cross-list' id={elem}>
                 </div>
            </div>
            </div>
           <form className='general-form-pas' id={`${elem}-form`}>
            <div className='select-option'>
                <select className='select-pass' onInput={change}>
                    <option className='option-pass'>Взрослый</option>
                    <option className='option-pass'>Детский</option>
                </select>
                <input className='select-pass-result'name='categoty' value={object.category}></input>
            </div>
            <div className='basic-information'>
                <div className='surname'>
                    <p className='basic-information-text'>Фамилия</p>
                    <input type='text' className='input-basic-info is_error' onChange={objectSurname} name='surname' value={surname} required></input>
                </div>
                <div className='name'>
                    <p className='basic-information-text'>Имя</p>
                    <input type='text' className='input-basic-info is_error' onChange={objectSurname} value={name} name='name' required></input>
                </div>
                <div className='full-name'>
                    <p className='basic-information-text'>Отчество</p>
                    <input type='text' className='input-basic-info is_error' onChange={objectSurname} value={fullName} name='full-name' required></input>
                </div>
            </div>

            <div className='gender-and-date'>
                <div className='gender-basic'>
                    <p className='basic-information-text'>Пол</p>
                    <div className='gender'>
                        <button className='gender-btn gender-btn-active gender-btn-first' type='button' onClick={active} name='man'>M</button>
                        <button className='gender-btn gender-btn-second' type='button' onClick={active} name='woman'>Ж</button>
                        <input className='chosen-gender' name='gender' value={object.gender} required></input>
                    </div>
                </div>
                <div className='basic-date'>
                <p className='basic-information-text'>Дата рождения</p>
                <div className='info-date'>
                    <input type='date' id='date' name='date' className='input-basic-date is_error' pattern='\d{1,2}/\d{1,2}/\d{4}' onChange={isValidDate} placeholder='ДД/ММ/ГГГГ' required />
                </div>
                </div>
            </div>
            <div className='basic-restrictions'>
                <input id='radio-btn' className='radio-btn' type='radio' value={object.restrictions} name='restrictions'></input>
                <lebel for='radio-btn' className='label-radio'>ограниченная подвижность</lebel>
                <div className='copy-radio' onClick={radioBtn}></div>
            </div>
            <div className='border-bottom'></div>
            <div className='basic-password'>
                <div className='basic-document-type'>
                    <p className='basic-information-text'>Тип документа</p>
                    <div className='select-option-password'>
                        <select className='select-pass-password asic-document-type-pass' onChange={changeTypeDocument}>
                            <option className='option-password'>Паспорт РФ</option>
                            <option className='option-password'>Паспорт РФ</option>
                        </select>
                     </div>
                </div>
                <div className='basic-document-type basic-document-type-series'>
                    <p className='basic-information-text'>Серия</p>
                    <input className='password-series is_error' type='number' name='series-document' placeholder='____' onChange={validateSeries} value={series} required></input>
                </div>
                <div className='basic-document-type basic-document-type-numbers'>
                    <p className='basic-information-text'>Номер</p>
                    <input className='password-number is_error' type='number' name='number-document' placeholder='______' onChange={validateNumber} value={number} required></input>
                    <p className='clue'>12 символов</p>
                </div>
            </div>
            <div className='border-bottom'></div>
            <button type='button' className='next-passenger' id={`${elem}-form`} onClick={validationForms}>Следующий пассажир</button>
            <div className='window-error err-hidden'>
                <i className='substract-error'></i>
                <div className='err-container'>{errors}<div>Пример: <span className='example'>{example}</span></div></div>
            </div>
            <div className='window-ready ready-hidden'>
                <i className='substract-ready'></i>
                <div className='err-container'>
                    <button type='button' className='next-passenger-readonly' onClick={newObject}>Следующий пассажир</button>
                </div>
            </div>
           </form>
        </section>
    )
}