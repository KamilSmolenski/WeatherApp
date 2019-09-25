import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

class Chart extends Component {
  state = {
    temp: [],
    labels: []
  }

  componentDidUpdate (prevState, prevProps) {
    if (this.props.value.length === 0) return

    if (prevProps.value !== this.props.value) {
      const APIForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${
        this.props.value
      }&appid=37815682f1034a9206483cbf04ee4111&units=metric`
      fetch(APIForecast)
        .then(response => {
          if (response.ok) {
            return response
          }
          throw Error(`number ${response.status}`)
        })
        .then(response => response.json())
        .then(data => {
          let filteredDataArray2 = []
          let filteredDataArray = []
          for (var i = 0; i < data.list.length; i++) {
            const WeekDays = [
              'Sun.',
              'Mon.',
              'Tue.',
              'Wed.',
              'Thu.',
              'Fri.',
              'Sat.'
            ]
            const WeekDaysIndex = new Date(data.list[i].dt * 1000).getDay()
            const filteredData = ` ${WeekDays[WeekDaysIndex]}${
              new Date(data.list[i].dt * 1000).getHours() < 10
                ? '0' + new Date(data.list[i].dt * 1000).getHours()
                : new Date(data.list[i].dt * 1000).getHours()
            }:${
              new Date(data.list[i].dt * 1000).getMinutes() < 10
                ? '0' + new Date(data.list[i].dt * 1000).getMinutes()
                : new Date(data.list[i].dt * 1000).getMinutes()
            }`
            const filteredData2 = data.list[i].main.temp

            filteredDataArray2.push(filteredData2)
            filteredDataArray.push(filteredData)
          }

          if (prevState.value !== this.props.value) {
            this.setState({
              labels: filteredDataArray,
              temp: filteredDataArray2
            })
          } else return
        })
        .catch(error => console.log(error))
    }
  }
  render () {
    const data = {
      labels: this.state.labels,

      datasets: [
        {
          label: 'Temperature',
          fill: true,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,0.1)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.temp
        }
      ]
    }
    let res = <Line data={data} />
    return (
      // I don't know why condition with '===' didn't work, thats why i used '=='
      <div>{this.props.value == 0 || this.props.error ? `not found` : res}</div>
    )
  }
}

export default Chart
