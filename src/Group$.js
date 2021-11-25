import React from 'react';
import './Group$.css';
import './Currency$.css';
import './Base$.css';
import fx from 'money';
import { json, checkStatus, addBaseRate } from './utils';
import { currencyCollection } from './utils.js';
import $ from 'jquery';

const groupListRender = (  groupCollectionObject , handlerFunction ) => {
  let listArr = []; 
  for (const groupName in groupCollectionObject) {
    let renderGroupName = groupName;            
   listArr.push(<GroupOption key={renderGroupName} onClick={handlerFunction} groupName={renderGroupName} />)
  };
  return listArr;
}

const groupCollection = {
    
  type : {
    currency : {

      MAIN : [
      'USD' , 'EUR' , 'GBP' , 'CNY', 'JPY', 'CHF' , 'CAD'   
      ],
        
      ASIA : [ 
      'CNY' , 'HKD' , 'JPY', 'INR' , 'KRW' , 'MYR' , 'PHP' , 'THB'
      ],

      AMERICAS : [
      'USD' , 'BRL' , 'CAD' , 'MXN'  
      ],

      EUROPE : [
      'EUR' , 'GBP' , 'CHF' , 'BGN' , 'CZK' , 'DKK' , 'HRK' , 'HUF' , 'ISK' , 'NOK' , 'PLN' , 'RON' , 'RUB' , 'SEK' , 'TRY'
      ],

    }
  }  
}

const currencyCheckOptionRender = ( currencyCodeObject ) => {
  let listArr = [];
  for (const currencyCode in currencyCodeObject) {
    let renderCodeObj = currencyCodeObject[currencyCode];
    let renderCurrencyCode = currencyCode;
    listArr.push(<CurrencyCheckOption key={renderCurrencyCode} renderCode={renderCodeObj} currencyCode={renderCurrencyCode}/>)
  };
  return listArr;
}

const currencyGroupElementRender = ( groupArr, latestFetchJson , baseCurrencyCode ) => {
  let listArr = [];
  fx.base = baseCurrencyCode;
  fx.rates = addBaseRate(latestFetchJson.rates, baseCurrencyCode);
  
  
  for ( let i = 0;  i < groupArr.length; i++) {
    let renderCurrencyCode = groupArr[i]
    let currencyName  = currencyCollection.code[renderCurrencyCode].currencyName 
    let renderCurrencyRate = fx.rates[renderCurrencyCode];
    
    console.log(renderCurrencyCode);
 
    console.log(renderCurrencyCode);
    console.log(currencyName);
   
    listArr.push(<CurrencyGroupElement key={renderCurrencyCode} currencyCode={renderCurrencyCode} currencyName={currencyName} currencyRate={renderCurrencyRate} />);
  }
  return listArr;
}



const CurrencyGroupElement = (props) => {
  const {               
    currencyCode,
    currencyName,
    currencyRate,
  } = props;

  return (    
    <div className="groupElementContainer">
        <img className={`small_flag`} src={`/image/flags/${currencyCode}.png`}></img>
        {currencyName} - {currencyCode} {currencyRate}   
    </div>
  )
}


const CurrencyCheckOption = (props) => {
  const {               
    currencyCode,
  } = props;

  const {
    currencyName,
  } = props.renderCode;
    
  return (    
    <div className="checkOptionContainer">
      <input type="checkbox" className="form-check-input" id={`${currencyCode}dropdownCheck`} defaultValue={`${currencyCode}`}></input>
      <label className="form-check-label" htmlFor={`${currencyCode}dropdownCheck`}>
        <img className={`small_flag`} src={`/image/flags/${currencyCode}.png`}></img>
        {currencyCode} - {currencyName}
      </label>
    </div>
  )
}



const GroupOption = (props) => {
  const {
    onClick,   
    groupName
  } = props;

  return (
    <button className="dropdown-item" onClick={onClick} value={groupName}>
      {groupName} 
    </button>
  )
} 



class Group$ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupCollection : groupCollection,
      selectedGroup : 'MAIN',
      latestFetchJson: '',
      baseCurrencyCode: ''
    };  
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sayState = this.sayState.bind(this);  
  }

  componentDidMount () {
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${this.props.baseCurrencyCode}`)
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

  sayState () {
    console.log(this.state.latestFetchJson);
  }

  
  
  

  handleSelection(event) {    
    const selectedGroup = event.target.value;
    console.log('selectedGroup: ' + selectedGroup);
    this.setState( { selectedGroup : selectedGroup });
    console.log(this.state.selectedGroup);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newGroupName = $('#newGroupNameInput').val();
    console.log('newGroupName: ' + newGroupName);
    console.log(this.state.results);
    let checkedArr = [];

    $('input[type="checkbox"]:checked').each(function() {    // $(':checkbox:checked')
      let value = $(this).val();
      checkedArr.push(value);               // $(this).val()
      });    
    console.log(checkedArr);

    groupCollection.type.currency[newGroupName] = checkedArr;

    this.setState({ groupCollection : groupCollection });

    console.log(groupCollection);

    $('input[type="checkbox"]:checked').each(function() {
      $( this ).prop('checked', false);
    })
        
    $('#newGroupNameInput').val('');
  }




  render() {
    return (
      <div className="group" id="group_wrapper">
        <div id="group_selection">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Group Select 
            </button>            
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {groupListRender( groupCollection.type.currency , this.handleSelection )}            
            </div>
          </div>
          <div className="btn-group">
            
            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              New Group
            </button>
            <div className="dropdown-menu">
              <form className="px-4 py-3 addGroupForm">
                <div className="form-group">
                  <label htmlFor="newGroupNameInput">Group Name</label>
                  <input type="text" className="form-control" id="newGroupNameInput" placeholder="group name"></input>
                </div>
                <div id="currencyCheckOptionList">
                  CURRENCY LIST
                </div>
               
                <div className="form-check" id="newGroupCheckOptionContainer">
                  {currencyCheckOptionRender( currencyCollection.code )}
                </div>
                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Add Group</button>
              </form>
            </div>
          </div>
        </div>
        <div id="group_inner">
          BASE CURRENCY: {this.props.baseCurrencyCode}
          <p>{this.state.selectedGroup}</p>
          {(() => {
            let selectedGroup = this.state.selectedGroup;
            let groupArr = groupCollection.type.currency[selectedGroup];
            return currencyGroupElementRender( groupArr , this.props.latestFetchJson , this.props.baseCurrencyCode);
          })()}
        </div>
        UPDATED: {this.props.date} AT 16:00 CET
      </div>
    )
  }
}

export default Group$;