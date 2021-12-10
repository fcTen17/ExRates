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
    colNumber,
    double,
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
    <div className={`col-${colNumber} .g-0 keypad_key_container`}>
      <button className={`keypad_key ${double}`} data-number={dataNumberRequired} data-operator={dataOperatorRequired} data-delete={dataDeleteRequired} data-all-clear={dataAllClearRequired} data-equal={dataEqualRequired} onClick={onClick} id={`${keyCode}_keypad_key`}>
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
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay (bottomDisplayValue, topDisplayValue, operator) {
    this.props.parentCallback(Number(bottomDisplayValue), topDisplayValue, operator);
    if(topDisplayValue !== undefined) {
      this.setState({ topDisplayValue : topDisplayValue });
    }
    if(operator !== undefined) {
      this.setState({ operator : operator});
    }
    this.setState({ bottomDisplayValue : bottomDisplayValue });
  }

  keyDown = (keyPressedCode, keyPressedKey) => {
    let element;
    if (keyPressedKey === '0') {
      element = $(`#${keyPressedKey}_keypad_key`);
    } else if (Number(keyPressedKey)) {
      element = $(`#${keyPressedKey}_keypad_key`);
    } else {
      element = $(`#${keyPressedCode}_keypad_key`);
    }
    if (keyPressedCode === 'NumpadEnter') {
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

  keyUp = (keyPressedCode, keyPressedKey) => {
    let element;
    if (keyPressedKey === '0') {
      element = $(`#${keyPressedKey}_keypad_key`);
    } else if (Number(keyPressedKey)) {
      element = $(`#${keyPressedKey}_keypad_key`);
    } else {
      element = $(`#${keyPressedCode}_keypad_key`);
    }
    if (keyPressedCode === 'NumpadEnter') {
      element = $('#NumpadEqual_keypad_key');
    }
    element.removeClass('pressed');
    if (keyPressedCode === 'NumpadEnter') {
      $('#NumpadEqual_keypad_key').removeClass('pressed');
    }
  }
  
  handleNumberClick (e) {  
    let text;
    if (e.hasOwnProperty('target')) {
      text = e.target.innerText;
    } else {
      text = e
    }
    if (this.state.bottomIsResult) {
      this.updateDisplay(text);
      this.setState({ bottomIsResult : false });
      return
    }
    if (text === '.' && this.state.bottomDisplayValue.includes('.')) {
      return
    };
    let bottomDisplayValue = this.state.bottomDisplayValue + text;
    this.updateDisplay(bottomDisplayValue)
    this.setState({ bottomIsResult : false });
  }

  equalClick () {    
    let topDisplay = this.state.topDisplayValue;
    let operator = this.state.operator;
    if (!operator && !topDisplay && !operator) {
      return
    }
    let result = this.operationExecution(this.state.bottomDisplayValue, this.state.topDisplayValue, this.state.operator);
    let resultString = result.toString();
    result = resultString.toLocaleString();
    this.updateDisplay(result, '', '');
    this.setState({ bottomIsResult : true });
  }

  deleteClick () {
    let bottomDisplayValue = this.state.bottomDisplayValue;
    if (typeof bottomDisplayValue === 'number') {
      let stringTransform = bottomDisplayValue.toString();
      bottomDisplayValue = stringTransform;
    }
    if (bottomDisplayValue) {
    let slicedBottomDisplayValue = bottomDisplayValue.slice(0, -1);
    this.updateDisplay(slicedBottomDisplayValue)
    }
  }

  allClearClick() {
    this.updateDisplay('', '', '');
    this.setState({ perviousOperator : '' });
  }

  operatorClick (e) {
    if (!this.state.bottomDisplayValue) {
      return
    }
    let  operatorValue;
    if (e.hasOwnProperty('target')) {
      operatorValue = e.target.innerText;
    } else {
      operatorValue = e
    }
    
    if (this.state.operator) {
      let result = this.operationExecution(this.state.bottomDisplayValue, this.state.topDisplayValue, this.state.operator);
      this.updateDisplay('', result, operatorValue);
      this.setState({ previousOperator : ''});
    }
    else {
    this.setState({ previousOperator : operatorValue });
    let bottomDisplayValue = this.state.bottomDisplayValue;
    let topDisplayValue = bottomDisplayValue;
    this.updateDisplay('', topDisplayValue, operatorValue);
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
    return result;
  }

  

  componentDidMount() {  
    $(window).on('keydown', (e) => {
      let keyPressedCode = e.originalEvent.code;
      let keyPressedKey = e.originalEvent.key;
      this.keyDown(keyPressedCode , keyPressedKey);            
    }); 
    $(window).on('keyup', (e) => {
      let keyPressedCode = e.originalEvent.code;
      let keyPressedKey = e.originalEvent.key;
      this.keyUp(keyPressedCode, keyPressedKey);
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
         
        </div>
        <div className="row">
          <KeypadKey onClick={this.allClearClick} dataAttribute={'dataAllClear'} keyCode={'NumLock'} keyText={'AC'} double={''}/>
          <KeypadKey onClick={this.operatorClick} dataAttribute={'dataOperator'} keyCode={'NumpadDivide'} keyText={divide} double={''}/>
          <KeypadKey onClick={this.operatorClick} dataAttribute={'dataOperator'} keyCode={'NumpadMultiply'} keyText={multiply} double={''}/>
          <KeypadKey onClick={this.deleteClick} dataAttribute={'dataDelete'} keyCode={'Backspace'} keyText={'del'} double={''}/>
        </div>
        <div className="row">
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'7'} keyText={'7'} double={''}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'8'} keyText={'8'} double={''}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'9'} keyText={'9'} double={''}/>
          <KeypadKey onClick={this.operatorClick} dataAttribute={'dataOperator'} keyCode={'NumpadSubtract'} keyText={'-'} double={''}/>        
        </div>
        <div className="row">
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'4'} keyText={'4'} double={''}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'5'} keyText={'5'} double={''}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'6'} keyText={'6'} double={''}/>
          <KeypadKey onClick={this.operatorClick} dataAttribute={'dataOperator'} keyCode={'NumpadAdd'} keyText={'+'} double={''}/>
        </div>
        <div className="row">
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'1'} keyText={'1'} double={''}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'2'} keyText={'2'} double={''}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'3'} keyText={'3'} double={''}/>
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'NumpadDecimal'} keyText={'.'} double={''}/>
                
        </div>
        <div className="row">  
          <KeypadKey onClick={this.handleNumberClick} dataAttribute={'dataNumber'} keyCode={'0'} keyText={'0'} colNumber={'6'} double={'double'}/>
          <KeypadKey onClick={this.equalClick} dataAttribute={'dataEqual'} keyCode={'NumpadEqual'} keyText={'='} colNumber={'6'} double={'double'}/>  
        </div>
      </div>    
    )
  }
}

export default Keypad;
