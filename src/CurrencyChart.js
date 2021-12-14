import React from 'react';
import './CurrencyChart.css';
import Currency from './Currency';
import { Chart, registerables } from 'chart.js';
import $ from 'jquery';
import { json, checkStatus, addBaseRate } from './utils';

Chart.register(...registerables);

//const ctx = $('#myChart').getContext('2d');
const labels = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
  ];

const data = {
	labels: labels,
	datasets: [{
	  label: 'My First dataset',
	  backgroundColor: 'rgb(255, 99, 132)',
	  borderColor: 'rgb(255, 99, 132)',
	  data: [0, 10, 5, 2, 20, 30, 45],
	}]
  };


const endDate= new Date().toISOString().split('T')[0];
console.log(endDate);

const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
console.log(startDate);


const config = {
	type: 'line',
	data: data,
	options: {}
  };




class CurrencyChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			latestFetchJson: '',
			leftCurrencyCode: 'EUR',
			rightCurrencyCode: 'USD',
		};
		this.handleLeftCallback = this.handleLeftCallback.bind(this);
    	this.handleRightCallback = this.handleRightCallback.bind(this);
		this.getValues= this.getValues.bind(this);
		this.buildChart=this.buildChart.bind(this);
		this.getHistoricalRates=this.getHistoricalRates.bind(this);
		this.chartRef = React.createRef();  
	}

	componentDidMount() {
       this.getHistoricalRates(this.state.leftCurrencyCode, this.state.rightCurrencyCode, startDate, endDate);
	}

    getHistoricalRates = (base, quote, startDate, endDate) => {
			
		
		fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${base}&to=${quote}`)
		  .then(checkStatus)
		  .then(json)
		  .then(data => {
			if (data.error) {
			  throw new Error(data.error);
			}
	
			const chartLabels = Object.keys(data.rates);
			const chartData = Object.values(data.rates).map(rate => rate[quote]);
			const chartLabel = `${base}/${quote}`;
			this.buildChart(chartLabels, chartData, chartLabel);
		  })
		  .catch(error => console.error(error.message));
	  }
	
	buildChart = (labels, data, label) => {
		

  if (typeof this.chart !== "undefined") {
    this.chart.destroy();
  }

  this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            strokeColor: 'rgba(175, 238, 238, 1)',
            data,
            fill: true,
            backgroundColor: 'navy',
            tension: 0,
          }
        ]
      },
      options: {
        elements: {
          point: {
              radius: 0.5,
          }
        },
        responsive: true,
      }
    })
	}

	handleLeftCallback (childData) {
		this.setState({ leftCurrencyCode : childData});
		console.log("left ChildData: " + childData);		
	}

	handleRightCallback (childData) {
		this.setState({ rightCurrencyCode  : childData});
		console.log("right ChildData: " + childData);
	}

	getValues () {
		let start = $('#start').val();
		let end = $('#end').val();

        this.getHistoricalRates(this.state.leftCurrencyCode, this.state.rightCurrencyCode, start, end);
		console.log('getValues: start ' + start);
		console.log('getValues: end ' + end);
	}

	

	render() {
		return (
			<div className="chart">
				<div className="currency-pair-container">
					<Currency parentCallback={this.handleLeftCallback}></Currency>
					<Currency currencyCode={this.state.rightCurrencyCode} parentCallback={this.handleRightCallback}></Currency>
				</div>
				<canvas ref={this.chartRef} id="myChart" width="340" height="200">

				</canvas>
				
        <div className="date-options">
          <div className="date-input-container">
            <label htmlFor="start" >Start date:</label>
            <input type="date" className="date-input" id="start" name="trip-start" defaultValue={startDate} min="2000-01-01" max="2018-12-31"></input>
          </div>
          <div className="date-input-container">
            <label htmlFor="end" >End date:</label>
            <input type="date" className="date-input" id="end" name="trip-end" defaultValue={endDate} min="2000-01-01" max={endDate}></input>							
          </div>
          <button onClick={this.getValues} className="date-submit">GET HISTORICAL VALUES</button>	
        </div>
        <div className="inner-footer">
          <div className="inner-element copyright">
            <i>copyright &copy; 2021</i>
          </div>
          <div className="inner-element authorship">
            <i>developed by fcTen</i>
          </div>
          <div className="contact">
            <a href="https://github.com/fcTen17"><i className="fab fa-github"></i></a>             
          </div>
        </div>
			</div>
		)
	}
}

export { CurrencyChart };
// export default Chart;

/*
	getHistoricalRates = (base, quote) => {
			
		
		fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${base}&to=${quote}`)
		  .then(checkStatus)
		  .then(json)
		  .then(data => {
			if (data.error) {
			  throw new Error(data.error);
			}
	
			const chartLabels = Object.keys(data.rates);
			const chartData = Object.values(data.rates).map(rate => rate[quote]);
			const chartLabel = `${base}/${quote}`;
			this.buildChart(chartLabels, chartData, chartLabel);
		  })
		  .catch(error => console.error(error.message));
	  }
	
	buildChart = (labels, data, label) => {
		const chartRef = this.chartRef.current.getContext("2d");

		if (typeof this.chart !== "undefined") {
			this.chart.destroy();
	}

	this.chart = new Chart(this.chartRef.current.getContext("2d"), {
			type: 'line',
			data: {
			labels,
			datasets: [
				{
				label: label,
				data,
				fill: false,
				tension: 0,
				}
			]
			},
			options: {
			responsive: true,
			}
		})
	}	
    */