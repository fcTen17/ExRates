import React from 'react';
import './Group.css';
import './Currency.css';
import './Base.css';
import fx from 'money';
import { json, checkStatus, addBaseRate } from './utils';
import { currencyCollection } from './utils.js';
import getSymbolFromCurrency from 'currency-symbol-map'
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
    <div className="group-element group-element-container">
        <div className="group-element group-element-flag-code-name"><img className={`small-flag`} src={`/image/flags/${currencyCode}.png`} alt=""></img>
        <span>{currencyCode} - {currencyName}</span></div> <span className="group-element group-element-rate"><span>{getSymbolFromCurrency(currencyCode)}</span> {currencyRate}</span>   
    </div>
  )
}


const CurrencyCheckOption = (props) => {
  const {               
    currencyCode,
  } = props;
    
  return (    
    <div className="check-option-container">
      <label className="form-check-label" htmlFor={`${currencyCode}dropdownCheck`}>
        <img className={`small_flag`} src={`/image/flags/${currencyCode}.png`} alt=""></img>
        {currencyCode}
      </label>
      <input type="checkbox" className="form-check-input" id={`${currencyCode}dropdownCheck`} defaultValue={`${currencyCode}`}></input>
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

let savedUserGroups;

const refreshPage = ()=>{
  window.location.reload();
}

class Group extends React.Component {
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
    this.clearUserGroups = this.clearUserGroups.bind(this);
    this.mountGroupCollection = this.mountGroupCollection.bind(this);  
  }

  componentDidMount () {
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${this.props.baseCurrencyCode}`)
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
    
    let changeableGroupCollection = groupCollection;
    savedUserGroups = localStorage.getItem('userGroup')
    console.log('savedGroups: ' + savedUserGroups);
    this.mountGroupCollection( changeableGroupCollection, savedUserGroups);
  }

  mountGroupCollection = (groupCollection , savedUserGroups) => {
    if (savedUserGroups) {
      console.log('savedUserGroups is truthy.');
      let groupArr = savedUserGroups.split('-');
      for ( let i = 0; i < groupArr.length ; i++ ) {
        let elementsArr = groupArr[i].split(',');
        let groupName = elementsArr.shift();
        groupCollection.type.currency[groupName] = elementsArr;
      }
    }
    this.setState({ groupCollection : groupCollection})
  }
  

  clearUserGroups() {
    localStorage.setItem('userGroup', '');
    this.setState({ groupCollection : groupCollection});
    refreshPage();
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
    
    let checkedArr = [];

    $('input[type="checkbox"]:checked').each(function() {    
      let value = $(this).val();
      checkedArr.push(value);               
      });    
    console.log(checkedArr);

    let checkedArrToStr = checkedArr.toString();

    console.log(checkedArrToStr);

    let newGroupStr = newGroupName + ',' + checkedArrToStr + '-';

    savedUserGroups = savedUserGroups + newGroupStr;

    localStorage.setItem('userGroup', savedUserGroups);

    console.log('newGroupStr: ' + newGroupStr);
    console.log('handleSubmit SavedGroups: ' + savedUserGroups);

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
      <div className="group group-wrapper" >
        <div className="group-selection">
          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Group Select 
            </button>            
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {groupListRender( this.state.groupCollection.type.currency , this.handleSelection )}
              <button onClick={this.clearUserGroups}>CLEAR USER GROUPS</button>            
            </div>
          </div>
          <div className="btn-group">
            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              New Group
            </button>
            <div className="dropdown-menu">
              <form className="group-add-form">
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
        <div className="group-inner">

          <p> CURRENCY GROUP: <span>{this.state.selectedGroup}</span></p>
          {(() => {
            let selectedGroup = this.state.selectedGroup;
            let groupArr = groupCollection.type.currency[selectedGroup];
            return currencyGroupElementRender( groupArr , this.props.latestFetchJson , this.props.baseCurrencyCode);
          })()}
        </div>
        <div>
          <span className="group-update">UPDATED: {this.props.date} AT 16:00 CET</span>
        </div>
      </div>
    )
  }
}

export default Group;