import React, { Component } from "react";
import "./App.css";
import Results from "./Results";
import Search from "./Search";

class App extends Component {
  state = {
    value: "",
    time: "",
    humidity: "",
    max: "",
    min: "",
    weekDay: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    wind: "",
    pressure: "",
    temp: "",
    description: "",
    iconId: "",
    iconUrl: "",
    error: false,
    forecast: {
      temp: "100",
    },
  };

  handleSearchChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const WeekDays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
    const WeekDaysIndex = new Date().getDay();
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=cd2719d19d08b2909c6be691a47dad9c&units=metric`;
      fetch(API)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error(`number ${response.status}`);
        })
        .then(response => response.json())
        .then(data => {
          const currentTime = new Date().toLocaleTimeString();
          const currentDate = new Date().toLocaleDateString();
          const windSpeed = data.wind.speed * 3.6;
          const windSpeedInteger = Math.round(windSpeed);
          let description = data.weather[0].description;
          const capitalize = s => {
            return s.charAt(0).toUpperCase() + s.slice(1);
          };

          this.setState({
            error: false,
            weekDay: WeekDays[WeekDaysIndex],
            time: currentTime,
            date: currentDate,
            humidity: data.main.humidity,
            min: data.main.temp_min,
            max: data.main.temp_max,
            city: `${this.state.value.toUpperCase()}`,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            wind: windSpeedInteger + " km/h",
            pressure: data.main.pressure,
            temp: data.main.temp,
            description: capitalize(description),
            iconId: data.weather[0].icon,
          });
          this.setState({
            iconUrl: ` http://openweathermap.org/img/wn/${this.state.iconId}@2x.png`,
          });
        })
        .catch(err => {
          this.setState({
            error: true,
            city: this.state.value,
          });
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Search value={this.state.value} change={this.handleSearchChange} />
        <Results currentWeather={this.state} />
      </div>
    );
  }
}

export default App;
