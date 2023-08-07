import React, { useEffect } from "react";
import "./LastCards.css";

export function LastCards({ element }) {
  useEffect(() => {
    if (element.departure.have_wifi === false) {
      const parent = document.getElementById(`${element.departure._id}`);
      parent.querySelector(".icons-options-wifi").style.display = " none";
    }
    if (element.departure.is_express === false) {
      const parent = document.getElementById(`${element.departure._id}`);
      parent.querySelector(".icons-options-express").style.display = " none";
    }
  }, [element]);
  return (
    <div className="last-cards-container">
      <div className="last-cards-city-container">
        <div className="last-cards-first-city">
          <p className="last-first-name last-card-city">
            {element.departure.from.city.name}
          </p>
          <p className="first-railway-station railway-station">
            {element.departure.from.railway_station_name}
          </p>
        </div>
        <div className="last-cards-second-city">
          <p className="last-second-name last-card-city">
            {element.departure.to.city.name}
          </p>
          <p className="second-railway-station railway-station">
            {element.departure.to.railway_station_name}
          </p>
        </div>
      </div>
      <div className="panel-with-options" id={element.departure._id}>
        <div className="panel-options-icons">
          <p className="icons-options icons-options-wifi"></p>
          <p className="icons-options icons-options-express"></p>
          <p className="icons-options icons-options-cup"></p>
        </div>
        <p className="information-price-panel">
          <span className="panel-price-from">от </span>
          <span className="panel-price">{element.departure.min_price}</span>
          <span className="panel-vector"> ₽</span>
        </p>
      </div>
    </div>
  );
}
