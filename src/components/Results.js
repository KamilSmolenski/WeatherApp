import React from 'react'
import './Results.css'

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
    error
  } = props.currentWeather

  let content = null
  if (!error && city) {
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString()

    content = (
      <div className='Results'>
        <h3>
          City: <strong>{city}</strong>
        </h3>
        <h4>{time}</h4>
        <h4>{weekDay}</h4>
        <h4>{date}</h4>
        <h4>Temp:{temp} &#176;C</h4>
        <h4>Sunrise: {sunriseTime}</h4>
        <h4>Sunset: {sunsetTime}</h4>
        <h4>Wind:{wind}</h4>
        <h4>Pressure:{pressure} hPa</h4>
      </div>
    )
  }
  return <div className='results'>{error ? `Not found ${city}` : content}</div>
}

export default Results
