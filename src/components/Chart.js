import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  state = {
    data: [],
    labels: [],
    //  ^^^--- Here i want to push 40 dates(i get it from API in componentDidUpdate) and then push it to var"labels"" in render to show in chart
  };

  componentDidUpdate(prevState, prevProps) {
    if (this.props.value.length === 0) return;

    if (prevProps.value !== this.props.value) {
      const APIForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${this.props.value}&appid=cd2719d19d08b2909c6be691a47dad9c`;
      fetch(APIForecast)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error(`number ${response.status}`);
        })
        .then(response => response.json())
        .then(data => {
          let filteredDataArray = [];
          for (var i = 0; i < data.list.length; i++) {
            const filteredData = data.list[i].dt;
            filteredDataArray.push(filteredData);
          }
          if (this.state.labels.length === 0) {
            this.setState({ labels: filteredDataArray });
            console.log(this.state.labels);
          } else return;
        })
        .catch(error => console.log(error));
    }
  }
  render() {
    const data = {
      labels: this.state.labels,

      datasets: [
        {
          label: "Temperature",
          fill: false,
          lineTension: 0.3,
          backgroundColor: "rgba(75,192,192,0.1)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.data,
        },
      ],
    };

    return (
      <div>
        <Line data={data} />
      </div>
    );
  }
}

export default Chart;
