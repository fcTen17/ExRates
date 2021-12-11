import React from 'react';
import './Currency.css';
import { currencyCollection } from './utils.js';


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
  } = props.renderCode;
    
  return (
    <button className="dropdown-item" onClick={onClick} value={currencyCode}>
      <img className={`small_flag`} src={`/image/flags/${currencyCode}.png`} alt=""></img>
      {currencyCode} - {currencyName} 
    </button>
  )
};
 
class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrencyName : 'Euro',
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
      this.setState({ selectedCurrencyName: currencyObj.currencyName });
      this.setState({ selectedCurrencyCountry: currencyObj.country });    
      this.setState({ selectedCurrencyCode: selectedCode });      
      this.props.parentCallback(selectedCode);        
    }
    handleInput (e) {
      const amount = (e.target.validity.valid) ? e.target.value : this.state.currencyAmount;
      this.setState({ currencyAmount : amount });
    }

    render () {
      return (
        <div id="currency_container">          
            <div id="currency_box">
              <div className="dropdown">                
                <button className="btn dropdown-toggle currency_select" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <div id="currency_inner">
                    <div id="flag_country_box">
                      <img id="currency_flag" src={`/image/flags/${this.state.selectedCurrencyCode}.png`} alt=""></img>
                      <div id="currency_country">{this.state.selectedCurrencyCountry.toUpperCase()}</div>
                    </div>
                    <div id="code_name_box">
                      <div id="currency_code">{this.state.selectedCurrencyCode}</div>
                      <div id="currency_name">{this.state.selectedCurrencyName}</div>
                    </div> 
                  </div>                 
                </button>
                <div className="dropdown-menu currency_dropdown" aria-labelledby="dropdownMenuButton">
                  {currencyListRender(currencyCollection.code , this.handleSelection)}                                  
                </div>
              </div>
            </div>                      
        </div>
    )
  }
}

export default Currency;

