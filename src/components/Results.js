import React from "react";
import "./Results.css";

const Results = props => {
  const {
    time,
    weekDay,
    date,
    city,
    sunrise,
    sunset,
    wind,
    pressure,
    temp,
    description,
    error,
    iconUrl,
  } = props.currentWeather;

  let content = null;
  if (!error && city) {
    const sunsetTime = `${new Date(sunset * 1000).getHours()}:${
      new Date(sunset * 1000).getMinutes() < 10
        ? "0" + new Date(sunset * 1000).getMinutes()
        : new Date(sunset * 1000).getMinutes()
    }`;
    const sunriseTime = `${new Date(sunrise * 1000).getHours()}:${
      new Date(sunrise * 1000).getMinutes() < 10
        ? "0" + new Date(sunrise * 1000).getMinutes()
        : new Date(sunrise * 1000).getMinutes()
    }`;

    content = (
      <div className="Results">
        <h3>
          City: <strong>{city}</strong>
        </h3>
        <img src={iconUrl} alt="Current weather icon" />
        <h4>{time}</h4>
        <h4>{weekDay}</h4>
        <h4>{date}</h4>
        <h4>Desc:{description}</h4>
        <h4>Temp:{temp} &#176;C</h4>
        <h4>Sunrise: {sunriseTime}</h4>
        <h4>Sunset: {sunsetTime}</h4>
        <h4>Wind:{wind}</h4>
        <h4>Pressure:{Math.round(pressure)} hPa</h4>
      </div>
    );
  }
  return <div className="results">{error ? `Not found ${city}` : content}</div>;
};

export default Results;
