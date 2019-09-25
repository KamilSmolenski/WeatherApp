import React from 'react'
import './Results.scss'
import evening from '..//svg/001-evening.svg'
import suns from '..//svg/002-sunset.svg'
import press from '..//svg/003-pressure.svg'
import humid from '..//svg/004-humidity.svg'
import win from '..//svg/005-wind.svg'
import thermmin from '..//svg/002-therm-min.svg'
import thermmax from '..//svg/001-therm-max.svg'
import calendar from '..//svg/calendar.svg'
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
    iconUrl
  } = props.currentWeather

  let res = null

  if (!error && city) {
    const sunsetTime = `${
      new Date(sunset * 1000).getHours() < 10
        ? '0' + new Date(sunset * 1000).getHours()
        : new Date(sunset * 1000).getHours()
    }:${
      new Date(sunset * 1000).getMinutes() < 10
        ? '0' + new Date(sunset * 1000).getMinutes()
        : new Date(sunset * 1000).getMinutes()
    }`
    const sunriseTime = `${
      new Date(sunrise * 1000).getHours() < 10
        ? '0' + new Date(sunrise * 1000).getHours()
        : new Date(sunrise * 1000).getHours()
    }:${
      new Date(sunrise * 1000).getMinutes() < 10
        ? '0' + new Date(sunrise * 1000).getMinutes()
        : new Date(sunrise * 1000).getMinutes()
    }`

    res = (
      <div className='Results'>
        <div className='Results__Main'>
          <h1>
            <img src={iconUrl} alt='Current weather icon' />
            <p>{city}</p>
            <p>{temp}&#176;C</p>
          </h1>
          <h1>{time}</h1>
          <h1> {description}</h1>
        </div>
        <div className='Results__Details'>
          <div className='Results__Details-Item'>
            <img src={calendar} alt='calendar icon' />

            <h3>
              {date} <br />
              {weekDay}
            </h3>
          </div>
          <div className='Results__Details-Item'>
            <img src={thermmin} alt='thermomether-min icon' />
            <h3>{min}&#176;C</h3>
          </div>
          <div className='Results__Details-Item'>
            <img src={thermmax} alt='thermomether-max icon' />
            <h3>{max}&#176;C</h3>
          </div>
          <div className='Results__Details-Item'>
            <img src={evening} alt='' />
            <h3>{sunriseTime}</h3>
          </div>

          <div className='Results__Details-Item'>
            <img src={suns} alt='sunset icon' />
            <h3>{sunsetTime}</h3>
          </div>
          <div className='Results__Details-Item'>
            <img src={win} alt='wind icon' />
            <h3>{wind}</h3>
          </div>
          <div className='Results__Details-Item'>
            <img src={humid} alt='humidity icon' />
            <h3>{humidity} % </h3>
          </div>
          <div className='Results__Details-Item'>
            <img src={press} alt='pressure icon' />
            <h3>{Math.round(pressure)} hPa</h3>
          </div>
        </div>
      </div>
    )
  }
  return <div className='results'>{error ? `Not found ${city}` : res}</div>
}
export default Results
