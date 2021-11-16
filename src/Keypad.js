import React from 'react';
import $ from 'jquery';
import './Keypad.css';

const divide = String.fromCharCode(247);
const multiply = String.fromCharCode(215);

const KeypadKey = (props) => {
  const {
    dataAttribute,
    keyCode,
    keyText,
    onClick,
  } = props;
  
  let dataNumberRequired = false;
  let dataOperatorRequired = false;
  let dataDeleteRequired = false;
  let dataAllClearRequired = false;
  let dataEqualRequired = false;

  switch (dataAttribute) {
    case 'dataDelete' :
      dataDeleteRequired = true;
      break
    case 'dataNumber' :
      dataNumberRequired = true;
      break
    case 'dataOperator' :
      dataOperatorRequired = true;
      break
    case 'dataAllClear' :
      dataAllClearRequired = true;
      break
    case 'dataEqual' :
      dataEqualRequired = true;
      break
  }

  return (
    <div className="col-3 .g-0 keypad_key_container">
      <button className="keypad_key" data-number={dataNumberRequired} data-operator={dataOperatorRequired} data-delete={dataDeleteRequired} data-all-clear={dataAllClearRequired} data-equal={dataEqualRequired} onClick={onClick} id={`${keyCode}_keypad_key`}>
          {keyText}
      </button>
    </div>
  )
}



class Keypad extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      operator : '',
      bottomDisplayValue : '',
      topDisplayValue : '',
      bottomIsResult : false,
    };

    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.operatorClick = this.operatorClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.allClearClick = this.allClearClick.bind(this);
    this.operationExecution = this.operationExecution.bind(this);
    this.equalClick = this.equalClick.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
  }

  

  keyDown = (keyPressed) => {
    let element = $(`#${keyPressed}_keypad_key`);
    if (keyPressed === 'NumpadEnter') {
      element = $('#NumpadEqual_keypad_key');
    }
    element.addClass('pressed');
    let text = element.text()
    if (element.is('[data-number=true]')) {
      this.handleNumberClick(text);
    } else if (element.is('[data-all-clear=true]')) {
      this.allClearClick();
    } else if (element.is('[data-operator=true]')) {
      this.operatorClick(text);
    } else if (element.is('[data-delete=true]')) {
      this.deleteClick();
    } else if (element.is('[data-equal=true]')) {
      this.equalClick();
    }
  }

  keyUp = (keyPressed) => {
    $(`#${keyPressed}_keypad_key`).removeClass('pressed');
    if (keyPressed === 'NumpadEnter') {
      $('#NumpadEqual_keypad_key').removeClass('pressed');
    }
  }
  
  handleNumberClick (e) {
    let text;
    if (e.hasOwnProperty('target')) {
      console.log('event has target')
      text = e.target.innerText;
    } else {
      text = e
    }
    if (this.state.bottomIsResult) {
      this.setState({ bottomDisplayValue : text });
      this.setState({ bottomIsResult : false });
      console.log('result is true');
      return
    }
    if (text === '.' && this.state.bottomDisplayValue.includes('.')) {
      return
    };
    let bottomDisplayValue = this.state.bottomDisplayValue + text;
    this.setState({ bottomDisplayValue : bottomDisplayValue })
    this.setState({ bottomIsResult : false });
  }

  equalClick () {
    let result = this.operationExecution(this.state.bottomDisplayValue, this.state.topDisplayValue, this.state.operator);
    this.setState({ bottomDisplayValue : result });
    this.setState({ bottomIsResult : true });
    this.setState({ topDisplayValue : ''});
    this.setState({ operator : ''});
  }

  deleteClick () {
    let bottomDisplayValue = this.state.bottomDisplayValue;
    if (bottomDisplayValue.length) {
    let newBottomDisplayValue = bottomDisplayValue.slice(0, -1);
    this.setState({ bottomDisplayValue : newBottomDisplayValue });
    }
  }

  allClearClick() {
    console.log('allClear!');
    this.setState({ bottomDisplayValue : '' });
    this.setState({ topDisplayValue : '' });
    this.setState({ operator : '' });
    this.setState({ perviousOperator : '' });
  }

  operatorClick (e) {
    if (!this.state.bottomDisplayValue) {
      return
    }
    let  operatorValue;
    if (e.hasOwnProperty('target')) {
      console.log('event has target')
      operatorValue = e.target.innerText;
    } else {
      operatorValue = e
    }
    
    if (this.state.operator) {
      console.log('operator here!');
      let result = this.operationExecution(this.state.bottomDisplayValue, this.state.topDisplayValue, this.state.operator);
      this.setState({ bottomDisplayValue : '' });
      this.setState({ topDisplayValue : result });
      this.setState({ operator : operatorValue });
      this.setState({ previousOperator : ''});
    }
    else {
    this.setState({ operator : operatorValue });
    this.setState({ previousOperator : operatorValue });
    let bottomDisplayValue = this.state.bottomDisplayValue;
    let topDisplayValue = bottomDisplayValue;
    this.setState({ topDisplayValue : topDisplayValue });
    this.setState({ bottomDisplayValue : ''});
    }
  }

  operationExecution = (bottomDisplayValue, topDisplayValue, operator) => {
    let bottomDisplayValueNumber = Number(bottomDisplayValue);
    let topDisplayValueNumber = Number(topDisplayValue);
    let result;

    switch (operator) {
      case '+':
        result =  bottomDisplayValueNumber + topDisplayValueNumber;
        break
      case '-':
        result = topDisplayValueNumber - bottomDisplayValueNumber;
        break
      case multiply:
        result = bottomDisplayValueNumber * topDisplayValueNumber;
        break
      case divide:
        result = topDisplayValueNumber / bottomDisplayValueNumber;
        break
      default :
        return
    }
    console.log('result: ' + result);
    return result;
  }

  

  componentDidMount() {  
    $(window).on('keydown', (e) => {
      let keyPressedCode = e.originalEvent.code;
      this.keyDown(keyPressedCode);            
    }); 
    $(window).on('keyup', (e) => {
      let keyPressedCode = e.originalEvent.code;
      this.keyUp(keyPressedCode);
    });
  };

  componentWillUnmount() {
    $(window).off('keydown');
    $(window).off('keyup')
  }
  

  render () {
    return (
      
      <div className= "keypad">
        <div className="display">
          
          <div className="top-display" >{this.state.topDisplayValue + ' ' + this.state.operator}</div>
          <div className="bottom-display"  >{this.state.bottomDisplayValue}</div>
        </div>
        <div className="row">
          <KeypadKey onClick={this.allClearClick} dataAttribute={'dataAllClear'} keyCode={'NumLock'} keyText={'AC'}/>
          <KeypadKey onClick={this.operatorClick} dataAttribute={'dataOperator'} keyCode={'NumpadDivide'} keyText={divide}/>
          <KeypadKey onClick={this.operatorClick} dataAttribute={'dataOperator'} keyCode={'NumpadMultiply'} keyText={multiply}/>
          <KeypadKey onClick={this.deleteClick} dataAttribute={'dataDelete'} keyCode={'Backspace'} keyText={'del'}/>
        </div>
        <div className="row">
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'Numpad7'} keyText={'7'}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'Numpad8'} keyText={'8'}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'Numpad9'} keyText={'9'}/>
          <KeypadKey onClick={this.operatorClick} dataAttribute={'dataOperator'} keyCode={'NumpadSubtract'} keyText={'-'}/>        
        </div>
        <div className="row">
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'Numpad4'} keyText={'4'}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'Numpad5'} keyText={'5'}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'Numpad6'} keyText={'6'}/>
          <KeypadKey onClick={this.operatorClick} dataAttribute={'dataOperator'} keyCode={'NumpadAdd'} keyText={'+'}/>
        </div>
        <div className="row">
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'Numpad1'} keyText={'1'}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'Numpad2'} keyText={'2'}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'Numpad3'} keyText={'3'}/>
          <KeypadKey onClick={this.equalClick} dataAttribute={'dataEqual'} keyCode={'NumpadEqual'} keyText={'='}/>      
        </div>
        <div className="row">
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'FAV'} keyText={'FAV'}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'Numpad0'} keyText={'0'}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'NumpadDecimal'} keyText={'.'}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'%'} keyText={'%'}/>
        </div>
      </div>    
    )
  }
}

export default Keypad;

