import React from 'react';
import './Currency$.css';
import $ from 'jquery';
import { currencyCollection } from './utils.js'




const currencyListRender = (  currencyCodeObject , handlerFunction ) => {
  let listArr = []; 
  for (const currencyCode in currencyCodeObject) {
    let renderCodeObj = currencyCodeObject[currencyCode];
    let renderCurrencyCode = currencyCode;
  listArr.push(<CurrencyOption key={renderCurrencyCode} onClick={handlerFunction} renderCode={renderCodeObj} currencyCode={renderCurrencyCode}/>)
  };
  return listArr;
}
                                                         

const CurrencyOption = (props) => {
  
  const {
    onClick,               
    currencyCode,
  } = props;

  const {
    currencyName,
    country,
  } = props.renderCode;
    
  return (
    <button className="dropdown-item" onClick={onClick} value={currencyCode}>
      <img className={`small_flag`} src={`/image/flags/${currencyCode}.png`}></img>
      {currencyCode} - {currencyName} - {country}
    </button>
  )
};
 
class Currency$ extends React.Component {
  constructor(props) {
    super(props);

    const {
      leftCurrencyInput,
    } = props;

    this.state = {
      selectedCurrencyName : 'EURO',
      selectedCurrencyCode : 'EUR',
      selectedCurrencyCountry : 'European Union',
      currencyAmount : '1'
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handleInput = this.handleInput.bind(this);  
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

    

    componentDidMount () {
    
    }

    handleInput (e) {
      const amount = (e.target.validity.valid) ? e.target.value : this.state.currencyAmount;
      this.setState({ currencyAmount : amount });
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
                <div className="dropdown-menu currency_dropdown" aria-labelledby="dropdownMenuButton">

                {currencyListRender(currencyCollection.code , this.handleSelection)}
                                  
                </div>
              </div>
            </div>
            <div id="currency_value">
              <div id="currency_code">
                <p>{this.state.selectedCurrencyCode}</p>
              </div>
              <div id="currency_amount">
                  <input placeholder="0" id="currencyInput" value={this.props.amount} onChange={this.props.handleChange} type="text" pattern="[0-9.]*" ></input>
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



/*

for (const currencyCode in currencyCollection.code) {
                    let renderCode = currencyCollection.code[currencyCode]
                   
                    
                   console.log('currencyCode: ' + currencyCode);
                   console.log(currencyCollection.code[currencyCode].country);
                   console.log(renderCode);
                   return <CurrencyOption key={currencyCode} renderCode={renderCode} currencyCode={currencyCode}/>;
                  }    


  
              {(() => {
                  
                 return currencyListRender(currencyCollection.code , this.handleSelection);
                               
                })()}


*/