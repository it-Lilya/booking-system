import React from "react";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";
import './HeaderForm.css';
import { MyApp } from "./Calendar/Calendar";
import { Cities } from "./Cities/Cities";

export function HeaderForm() {
  const navigate = useNavigate();
  function click(e) {
    e.preventDefault();
    const inputs =
      e.target.parentElement.parentElement.querySelectorAll(".form-input");
    if (inputs[0].classList.contains("first")) {
      localStorage.setItem("first-city", inputs[0].value);
      localStorage.setItem("first-city-id", inputs[0].id);
    }
    if (inputs[1].classList.contains("second")) {
      localStorage.setItem("second-city", inputs[1].value);
      localStorage.setItem("second-city-id", inputs[1].id);
    }
    if (inputs[0].value !== "" && inputs[1].value !== "") {
      fetch(`https://students.netoservices.ru/fe-diplom/routes?from_city_id=${inputs[0].id}&to_city_id=${inputs[1].id}`)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("direction-there", JSON.stringify(data.items));
        });
      fetch(`https://students.netoservices.ru/fe-diplom/routes?from_city_id=${inputs[1].id}&to_city_id=${inputs[0].id}`)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("direction-back", JSON.stringify(data.items));
        });
      setInterval(() => {
        if (localStorage.getItem("direction-there")) {
          navigate('/train-selection');
        }
      }, 100);
    }
    if (inputs[1].value === "") {
      const errWindow =
        inputs[0].parentElement.querySelector(".open-error-hidden");
      errWindow.classList.add("open-error");
      inputs[0].focus();
      setTimeout(() => {
        errWindow.classList.remove("open-error");
      }, 2000);
    }
    if (inputs[1].value === "") {
      if (inputs[1].value === "" && inputs[0].value !== "") {
        inputs[1].focus();
      }
      const errWindow =
        inputs[1].parentElement.querySelector(".open-error-hidden");
      errWindow.classList.add("open-error");
      setTimeout(() => {
        errWindow.classList.remove("open-error");
      }, 2000);
    }
    const inputsDate = document.querySelectorAll(".date-inputs input");
    if (inputsDate[0].classList.contains("first")) {
      localStorage.setItem("first-date", inputsDate[0].value);
    }
    if (inputsDate[1].classList.contains("second")) {
      localStorage.setItem("second-date", inputsDate[1].value);
    }
    let array = [];
    if (inputsDate[1].value !== "") {
      fetch(`https://students.netoservices.ru/fe-diplom/routes?from_city_id=${inputs[1].id}&to_city_id=${inputs[0].id}`)
        .then((response) => response.json())
        .then((data) => {
          data.items.forEach((el) => {
            const convertDate = new Date(el.departure.from.datetime * 1000);
            const formatDate = format(convertDate, "dd.MM.yyyy");
            if (formatDate === inputsDate[1].value) {
              array.push(el);
              localStorage.setItem("back", JSON.stringify(array));
            }
          });
        });
    }
  }
  return (
    <div className="bottom-form-container">
      <form id="form-search" className="bottom-form">
        <h4 className="form-direction">Направление</h4>
        <Cities />
        <h4 className="form-direction">Дата</h4>
        <MyApp />
      </form>
      <button onClick={click}
        id="btn-search"
        className="search-button"
        type="button">Найти билеты</button>
    </div>
  );
}
