import React, { Component } from 'react'
import './App.css'
import Results from './Results'
import Search from './Search'

class App extends Component {
  state = {
    value: '',
    time: '',
    weekDay: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    wind: '',
    pressure: '',
    temp: '',
    error: 'false'
  }

  handleSearchChange = e => {
    this.setState({
      value: e.target.value
    })
  }
  componentDidMount () {
    this.setState({ value: 'Warsaw' })
  }
  componentDidUpdate (prevProps, prevState) {
    const WeekDays = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']
    const WeekDaysIndex = new Date().getDay()
    if (this.state.value.length === 0) return
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${
        this.state.value
      }&APPID=cd2719d19d08b2909c6be691a47dad9c&units=metric`
      fetch(API)
        .then(response => {
          if (response.ok) {
            return response
          }
          throw Error(`number ${response.status}`)
        })
        .then(response => response.json())
        .then(data => {
          const currentTime = `${new Date().getHours()}:${new Date().getMinutes()} `
          const currentDate = new Date().toLocaleDateString()
          this.setState({
            error: false,
            weekDay: WeekDays[WeekDaysIndex],
            time: currentTime,
            date: currentDate,
            city: this.state.value,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            wind: data.wind.speed * 3.6 + ' km/h',
            pressure: data.main.pressure,
            temp: data.main.temp
          })
        })
        .catch(err => {
          this.setState({
            error: true,
            city: this.state.value
          })
        })
    }
  }

  render () {
    return (
      <div className='App'>
        <Search value={this.state.value} change={this.handleSearchChange} />
        <Results currentWeather={this.state} />
      </div>
    )
  }
}

export default App
