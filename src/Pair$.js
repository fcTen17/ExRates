import Currency$ from './Currency$';
import React from 'react';
import { currencyCollection } from './utils.js';
import $ from 'jquery';
import Keypad from './Keypad';
import './Pair$.css';



class Pair$ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //searchTerm: '',
      //results: [],
      //error: '',
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  

  render (){
    return (
      <div className="testPair" id="pairComparison">
        <p>Pair Comparison App <i className="fab fa-twitter"></i> </p>
        <div id="pairContainer">
          <div id="leftCurrency">
              <Currency$ />
          </div>
          <div id="rightCurrency">
              <Currency$ />
          </div>
          <Keypad />
        </div>          
      </div>
    )
  }
};

export { Pair$ };

