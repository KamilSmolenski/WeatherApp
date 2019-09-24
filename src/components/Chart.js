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
      const APIForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${this.props.value}&appid=d55849540aadcad09f2710668228f493`;
      fetch(APIForecast)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error(`number ${response.status}`);
        })
        .then(response => response.json())

        .then(data => {
          this.setState({
            //   How can i push data from API (data.list[X].dt) to array "labels" in this.state. i have X fourty times and then i need to send it to var labels(in render)???
          });
        })
        .catch(error => console.log(error));
    }
  }
  render() {
    const data = {
      labels: this.state.labels,
      //   here i need to keep new array
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
