import Currency$ from './Currency$';
import React from 'react';
import Keypad from './Keypad';
import fx from 'money';
import { json, checkStatus, addBaseRate } from './utils';
import $ from 'jquery';

import './Keypad.css';
import './Pair$.css';

class Pair$ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftCurrencyDisplay : '',
      rightCurrencyDisplay: '',   
      leftCurrencyCode : 'EUR',
      rightCurrencyCode : 'EUR',
      latestFetchJson: '',
    };

    this.handleLeftCurrencyChange = this.handleLeftCurrencyChange.bind(this);
    this.handleBotomDisplayChange = this.handleBotomDisplayChange.bind(this);  
    this.handleLeftCallback = this.handleLeftCallback.bind(this);
    this.handleRightCallback = this.handleRightCallback.bind(this);
    this.convertCurrency = this.convertCurrency.bind(this);
  }

  componentDidMount () {
    fetch(`https://altexchangerateapi.herokuapp.com/latest`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data) {
          console.log(data);
          this.setState({ latestFetchJson: data})
          console.log(this.state.latestFetchJson);  
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  convertCurrency(value, left, right, jasonData) {
    fx.base = jasonData.base;
    fx.rates = addBaseRate(jasonData.rates, fx.base);
    let convertedValue = fx.convert(value, {from: left, to: right});
    return convertedValue;
  }

  handleLeftCallback = (childData) => {
    let baseCurrencyCode = childData;
    this.setState({ leftCurrencyCode : baseCurrencyCode });
    console.log('leftBase: ', baseCurrencyCode);
  }

  handleRightCallback = (childData) => {
    let baseCurrencyCode = childData;
    this.setState({ rightCurrencyCode : baseCurrencyCode});
    console.log('rightBase: ', baseCurrencyCode);
  }

  handleLeftCurrencyChange (e) {
    let text = e.target.value;
    console.log('leftCurrency get Text: ' + text);
    this.setState({ leftCurrencyInput : text });
  }

  handleBotomDisplayChange (bottomDisplayValue) {
    console.log('keypadBottomDisplay: ' + bottomDisplayValue);
    console.log('typeof: ', typeof bottomDisplayValue);
    let value = Number(bottomDisplayValue);
    console.log(value);
    console.log(this.state.leftCurrencyCode);
    console.log(this.state.rightCurrencyCode);
    console.log(this.state.latestFetchJson);
    let convertedValue = this.convertCurrency( value, this.state.leftCurrencyCode, this.state.rightCurrencyCode, this.state.latestFetchJson);
    console.log(convertedValue);
    let numberToString = convertedValue.toString()
    console.log('numberToString:', numberToString);
    this.setState({ leftCurrencyDisplay : bottomDisplayValue });
    this.setState({ rightCurrencyDisplay : numberToString });
  }

  render (){
    return (
      <div className="testPair" id="pairComparison">
        <p>Pair Comparison App <i className="fab fa-twitter"></i> </p>
        <div id="pairContainer">
          <div id="leftCurrency">
              <Currency$ amount={this.state.leftCurrencyDisplay}  parentCallback={this.handleLeftCallback} onChange={this.handleLeftCurrencyChange}/>
          </div>
          <div id="rightCurrency">
              <Currency$ amount={this.state.rightCurrencyDisplay} parentCallback={this.handleRightCallback}/>
          </div>
          <Keypad parentCallback={this.handleBotomDisplayChange}/>
        </div>          
      </div>
    )
  }
};

export { Pair$ };

