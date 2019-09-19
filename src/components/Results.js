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
    humidity,
    temp,
    min,
    max,
    description,
    error,
    iconUrl,
  } = props.currentWeather;

  let res = null;
  if (!error && city) {
    const sunsetTime = `${
      new Date(sunset * 1000).getHours() < 10
        ? "0" + new Date(sunset * 1000).getHours()
        : new Date(sunset * 1000).getHours()
    }:${
      new Date(sunset * 1000).getMinutes() < 10
        ? "0" + new Date(sunset * 1000).getMinutes()
        : new Date(sunset * 1000).getMinutes()
    }`;
    const sunriseTime = `${
      new Date(sunrise * 1000).getHours() < 10
        ? "0" + new Date(sunrise * 1000).getHours()
        : new Date(sunrise * 1000).getHours()
    }:${
      new Date(sunrise * 1000).getMinutes() < 10
        ? "0" + new Date(sunrise * 1000).getMinutes()
        : new Date(sunrise * 1000).getMinutes()
    }`;

    res = (
      <div className="Results">
        <h3>
          <strong>{city}</strong>
        </h3>
        <div className="MainInfo">
          <p>CURRENT</p>
          <img src={iconUrl} alt="Current weather icon" />
          <h4>{time}</h4>
          <h4>
            {weekDay}/{date}
          </h4>
          <h4>{description}</h4>
          <h4>
            Temp:{temp} &#176;C <br /> Min:{min}&#176;C Max:{max}&#176;C{" "}
          </h4>
          <h4>
            Sunrise: {sunriseTime} Sunset: {sunsetTime}
          </h4>

          <h4>Wind:{wind}</h4>
          <h4>Humidity: {humidity} %</h4>
          <h4>Pressure:{Math.round(pressure)} hPa</h4>
        </div>
      </div>
    );
  }
  return <div className="results">{error ? `Not found ${city}` : res}</div>;
};

export default Results;
