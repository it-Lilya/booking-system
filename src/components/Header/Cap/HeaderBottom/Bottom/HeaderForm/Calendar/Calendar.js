import React from "react";
import Calendar from "react-calendar";
import format from "date-fns/format";
import "./Calendar.css";

function openCalendar(e) {
  const calendar = e.target.nextSibling;
  calendar.classList.toggle("open-calendar");
  const btn = document.querySelector(".search-button");
  if (calendar.parentElement.firstChild.classList.contains("second")) {
    btn.style.zIndex = "-1";
    if (!calendar.classList.contains("open-calendar")) {
      btn.style.zIndex = "0";
    }
  }
  if (!calendar.classList.contains("open-calendar")) {
    btn.style.zIndex = "0";
  }
}

function onChange(ev) {
  const date = format(ev, "dd.MM.yyyy");
  const input = document.querySelector(".open-calendar").parentElement.querySelector(".form-input-date");
  input.value = date;
  input.nextElementSibling.nextElementSibling.classList.remove("open-calendar");
  const btn = document.querySelector(".search-button");
  btn.style.zIndex = "0";
}

export function MyApp() {
  return (
    <div className="date-inputs">
      <div className="data">
        <input
          className="form-input-date input first"
          type="text"
          name="date-first"
          placeholder="ДД/ММ/ГГ"
          required
        ></input>
        <i className="vector-date" onClick={openCalendar}></i>
        <Calendar className="hidden-data" onChange={onChange} value="" />
      </div>
      <div className="data">
        <input
          className="form-input-date input second"
          type="text"
          name="date-second"
          placeholder="ДД/ММ/ГГ"
          required
        ></input>
        <i className="vector-date" onClick={openCalendar}></i>
        <Calendar className="hidden-data" onChange={onChange} value="" />
      </div>
    </div>
  );
}
