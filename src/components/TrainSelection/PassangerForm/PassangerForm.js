import React, { useEffect } from 'react';
import './PassangerForm.css';
import { Passenger } from "./Passenger/Passenger";

export function PassangerForm() {
    useEffect(() => {
        console.log(Number(JSON.parse(localStorage.getItem('adults'))) + Number(JSON.parse(localStorage.getItem('children'))))
    }, [])
    return (
        <div className='passanger-form-container'>
            <Passenger />
        </div>
    )
}