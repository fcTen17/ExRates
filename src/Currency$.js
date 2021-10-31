import React from 'react';
import './Currency$.css';
import { currencyCollection } from './utils.js'
// const addCurrency = ( )

class CurrencyOption extends React.Component {
  
    
  render () {

  const Code = this.props.renderCode;
  const Country = currencyCollection.code[Code].country;
  const Name = currencyCollection.code[Code].currencyName;

  return (
    <button className="dropdown-item"  value={`${Code}`}>
      <img className={`small_flag" src="/image/flags/${Code}.png`}></img>
      {Name} - {Country} {this.props.renderCode}
    </button>
  )}
};


/*for (const renderCode in currencyCollection.code) {
  console.log(`${renderCode}`);
};*/

//onClick={this.handleSelection}

class Currency$ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrencyName : 'EURO',
      selectedCurrencyCode : 'EUR',
      selectedCurrencyCountry : 'European Union'
    };

    this.handleSelection = this.handleSelection.bind(this);
      
    }

    handleSelection (event) {
      const selectedCode = event.target.value;
      const currencyObj = currencyCollection.code[selectedCode];
      console.log(currencyObj);

      this.setState({ selectedCurrencyName: currencyObj.currencyName });
      console.log(currencyObj.currencyName);

      this.setState({ selectedCurrencyCountry: currencyObj.country });
      console.log(currencyObj.country);

      this.setState({ selectedCurrencyCode: selectedCode });
    }

   

    render () {
      return (
        <div id="currency_container">
          <div id="currency_inner">
            <div id="flag_holder">
              <img id="currency_flag" src={`/image/flags/${this.state.selectedCurrencyCode}.png`}></img>
            </div>
            <div id="currency_name">
              <div className="dropdown">
                <button className="btn dropdown-toggle currency_select" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.state.selectedCurrencyName} - {this.state.selectedCurrencyCountry}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                {(() => {
                  for (const renderCode in currencyCollection.code) {
                    
                   //console.log(`${renderCode}`);
                   console.log(currencyCollection.code[renderCode].country);
                   <CurrencyOption key={renderCode} renderCode={renderCode}/>;
                  }                  
                })()}
                


                  <li className="dropdown-item" href="#"><img className="small_flag" src="/image/flags/EUR.png"></img><button onClick={this.handleSelection} value="EUR">EURO EUROPEAN UNION</button></li>
                  


                  //Working Button
                  <button className="dropdown-item" onClick={this.handleSelection} value="BRL"><img className="small_flag" src="/image/flags/BRL.png"></img>BRAZILIAN REAL - BRAZIL</button>





                  
                  
                </div>
              </div>
            </div>
            <div id="currency_value">
              <div id="currency_code">
                <p>{this.state.selectedCurrencyCode}</p>
              </div>
              <div id="currency_amount">
                  <input placeholder="1" type="number"></input>
              </div>
            </div>
          </div>
        </div>
    )
  }
}


export default Currency$;
/*
<div id="currency_container">
          <div id="currency_inner">    
            <div id="flag_holder">
              <img id="currency_flag" src="/image/flags/EUR.png"></img>
            </div>
            <div id="currency_name">
              <p>Bulgarian Coin</p>
            </div>
            <div id="currency_value">
              <div id="currency_code">
                <p>BGC</p>
              </div>
              <div id="currency_amount">
                  <input placeholder="1" type="number"></input>
              </div>
            </div>
          </div>
          <div id="currency_inner">    
            <div >
              <img id="currency_flag" src="/image/flags/EUR.png"></img>
            </div>
            <div id="currency_name">
              <p>Bulgarian Coin</p>
            </div>
            <div id="currency_value">
              <div id="currency_code">
                <p>BGC</p>
              </div>
              <div id="currency_amount">
                  <input placeholder="1" type="number"></input>
              </div>
            </div>
          </div>
        </div>
*/