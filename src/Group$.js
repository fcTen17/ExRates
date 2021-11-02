import React from 'react';
import './Group$.css';
import { currencyCollection } from './utils.js';
import $ from 'jquery';


const groupListRender = (  groupCollectionObject , handlerFunction ) => {
  let listArr = []; 
  for (const groupName in groupCollectionObject) {
    let renderGroupName = groupName;            
   //console.log('renderGroupName: ' + renderGroupName); 
   listArr.push(<GroupOption key={renderGroupName} onClick={handlerFunction} groupName={renderGroupName} />)
  };
  return listArr;
}

const groupCollection = {
    
  type : {
    currency : {

      STANDARD : [
      'USD' , 'EUR' , 'GBP' , 'CNY', 'JPY'   
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

const currencyGroupElementRender = ( groupElementObject ) => {
  
}



const CurrencyGroupElement = (props) => {
  const {               
    currencyCode,
  } = props;

  const {
    currencyName,
  } = props.renderCode;
    
  return (    
    <div className="groupElementContainer">
      
        <img className={`small_flag`} src={`/image/flags/${currencyCode}.png`}></img>
        {currencyCode} - {currencyName}      
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
      <input type="checkbox" class="form-check-input" value={`${currencyCode}`} id={`${currencyCode}dropdownCheck`}></input>
      <label class="form-check-label" for={`${currencyCode}dropdownCheck`}>
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
      selectedGroup : 'STANDARD',

    };  
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
  }

  handleSelection(event) {
    console.log('clicked!');
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
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Group Select
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {groupListRender( groupCollection.type.currency , this.handleSelection )}            
            </div>
          </div>
          <div class="btn-group">
            
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              New Group
            </button>
            <div class="dropdown-menu">
              <form class="px-4 py-3 addGroupForm">
                <div class="form-group">
                  <label for="newGroupNameInput">Group Name</label>
                  <input type="text" class="form-control" id="newGroupNameInput" placeholder="group name"></input>
                </div>
                <div id="currencyCheckOptionList">
                  CURRENCY LIST
                </div>
               
                <div class="form-check" id="newGroupCheckOptionContainer">
                  {currencyCheckOptionRender( currencyCollection.code )}
                </div>
                <button type="submit" onClick={this.handleSubmit} class="btn btn-primary">Add Group</button>
              </form>
            </div>
          </div>
        </div>
          
          
        
        <div id="group_inner">


        </div>

      </div>
    )
  }
}

export default Group$;