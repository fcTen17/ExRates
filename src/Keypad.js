import React from 'react';
import $ from 'jquery';
import './Keypad.css';

const divide = String.fromCharCode(247);
const multiply = String.fromCharCode(215);

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
      console.log('ENTER!');
      element = $('#NumpadEqual_keypad_key');
    }
    element.addClass('pressed');
    let text = element.text()
    if (element.is('[data-number]')) {
      this.handleNumberClick(text);
    } else if (element.is('[data-all-clear]')) {
      this.allClearClick();
    } else if (element.is('[data-operator]')) {
      this.operatorClick(text);
    } else if (element.is('[data-delete]')) {
      this.deleteClick();
    } else if (element.is('[data-equal]')) {
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
    if (bottomDisplayValue.length > 0) {
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
    
    
    
    /*
    var userLang = navigator.language || navigator.userLanguage; 
    alert ("The language is: " + userLang);
    */

    

    
    $(window).on('keydown', (e) => {
      let keyPressedCode = e.originalEvent.code;
      let keyPressedKey = e.originalEvent.key;
      console.log('keyPressedCode: ' + keyPressedCode);
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
          <div className="top-display">{this.state.topDisplayValue + ' ' + this.state.operator}</div>
          <div className="bottom-display">{this.state.bottomDisplayValue}</div>
        </div>
        <div className="row">
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-all-clear  onClick={this.allClearClick} id={`NumLock_keypad_key`}>
                  AC
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-operator onClick={this.operatorClick} id={`NumpadDivide_keypad_key`}>
                  {divide}
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-operator onClick={this.operatorClick} id={`NumpadMultiply_keypad_key`}>
                  {multiply}
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-delete onClick={this.deleteClick} id={`Backspace_keypad_key`}>
                  del
              </button>
          </div>
        </div>
        <div className="row">
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`Numpad7_keypad_key`}>
                  7
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`Numpad8_keypad_key`}>
                  8
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`Numpad9_keypad_key`}>
                  9
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-operator onClick={this.operatorClick} id={`NumpadSubtract_keypad_key`}>
                  -
              </button>
          </div>          
        </div>
        <div className="row">
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`Numpad4_keypad_key`}>
                  4
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`Numpad5_keypad_key`}>
                  5
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`Numpad6_keypad_key`}>
                  6
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-operator onClick={this.operatorClick} id={`NumpadAdd_keypad_key`}>
                  +
              </button>
          </div>
        </div>
        <div className="row">
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`Numpad1_keypad_key`}>
                  1
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`Numpad2_keypad_key`}>
                  2
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`Numpad3_keypad_key`}>
                  3
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-equal onClick={this.equalClick} id={`NumpadEqual_keypad_key`}>
                  =
              </button>
          </div>        
        </div>
        <div className="row">
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" id={`FAV`}>
                  FAV
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`Numpad0_keypad_key`}>
                  0
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" data-number onClick={this.handleNumberClick} id={`NumpadDecimal_keypad_key`}>
                  .
              </button>
          </div>
          <div className="col-3 .g-0 keypad_key_container">
              <button className="keypad_key" id={`Percentage_keypad_key`}>
                  %
              </button>
          </div>
        </div>
      </div>    
    )
  }
}

export default Keypad;