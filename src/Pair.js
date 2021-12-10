import Currency from './Currency';
import React from 'react';
import Keypad from './Keypad';
import fx from 'money';
import { json, checkStatus, addBaseRate } from './utils';
import getSymbolFromCurrency from 'currency-symbol-map'



import './Keypad.css';
import './Pair.css';

class Pair extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftCurrencyDisplay : '',
      leftCurrencyScratch : '',
      leftCurrencyOperator: '',
      rightCurrencyDisplay: '',

      leftToRightUnit : '1',  
      leftCurrencyCode : 'EUR',
      rightCurrencyCode : 'EUR',
      latestFetchJson: '',
    };

    
    this.handleDisplayChange = this.handleDisplayChange.bind(this);  
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
          this.setState({ latestFetchJson: data})        
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
    this.setState({ leftCurrencyCode : childData });
    let value = Number(this.state.leftCurrencyDisplay);
    let convertedValue = this.convertCurrency( value, childData,  this.state.rightCurrencyCode, this.state.latestFetchJson);
    let numberToString = convertedValue.toString();
    this.setState({ rightCurrencyDisplay : numberToString });
    let unit = this.convertCurrency( 1, childData, this.state.rightCurrencyCode, this.state.latestFetchJson);
    this.setState({ leftToRightUnit : unit })
  }

  handleRightCallback = (childData) => {
    this.setState({ rightCurrencyCode : childData});
    let value = Number(this.state.leftCurrencyDisplay);
    let convertedValue = this.convertCurrency( value, this.state.leftCurrencyCode, childData, this.state.latestFetchJson);
    let numberToString = convertedValue.toString();
    this.setState({ rightCurrencyDisplay : numberToString });
    let unit = this.convertCurrency( 1, this.state.leftCurrencyCode, childData, this.state.latestFetchJson);
    this.setState({ leftToRightUnit : unit })
  }

  handleDisplayChange (bottomDisplayValue, topDisplayValue, operator) {
    let value = Number(bottomDisplayValue);
    let formatLocale = Number(bottomDisplayValue);
    let convertedValue = this.convertCurrency( value, this.state.leftCurrencyCode, this.state.rightCurrencyCode, this.state.latestFetchJson);
    let numberToString = convertedValue;
    this.setState({ leftCurrencyDisplay : formatLocale });
    this.setState({ rightCurrencyDisplay : numberToString });
    if (topDisplayValue !== undefined) {
      this.setState({leftCurrencyScratch : topDisplayValue});
    }
    if(operator !== undefined) {
      this.setState({ leftCurrencyOperator : operator});
    }
  }

  render (){
    return (
      <div className="pair" id="pairComparison">
        <div id="pairContainer"> 
          <Currency amount={this.state.leftCurrencyDisplay}  parentCallback={this.handleLeftCallback} onChange={this.handleLeftCurrencyChange}/> 
          <Currency amount={this.state.rightCurrencyDisplay} parentCallback={this.handleRightCallback}/>
        </div>
        <div className="wrapper">
          <div className="box box-1">{this.state.leftCurrencyScratch + ' ' + this.state.leftCurrencyOperator}</div>
          <div className="box box-2">{getSymbolFromCurrency(this.state.leftCurrencyCode)} 1  = {getSymbolFromCurrency(this.state.rightCurrencyCode)} {this.state.leftToRightUnit.toLocaleString()}</div>
          <div className="box box-3"><span>{getSymbolFromCurrency(this.state.leftCurrencyCode)}</span><input value={this.state.leftCurrencyDisplay.toLocaleString()} readOnly></input></div>
          <div className="box box-4"><span>{getSymbolFromCurrency(this.state.rightCurrencyCode)}</span><span>{this.state.rightCurrencyDisplay.toLocaleString()}</span></div>
        </div>
        <div id="keypadContainer">
          <Keypad parentCallback={this.handleDisplayChange}/>
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
            <a href="http://linkedin.com/in/fernando-cesar-tenório-206a0a2b"><i className="fab fa-linkedin"></i></a>              
          </div>
        </div>    
      </div>             
    )
  }
};

export { Pair };

