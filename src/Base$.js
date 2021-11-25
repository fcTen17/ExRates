import React from 'react';
import { json, checkStatus } from './utils';
import './Base$.css';
import Currency$ from './Currency$';
import Group$ from './Group$';

class Base$ extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
        baseCurrencyCode: 'EUR',
        latestFetchJson: '',
      };
      this.handleCallback = this.handleCallback.bind(this);      
    }

    componentDidMount () {
      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${this.state.baseCurrencyCode}`)
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

    handleCallback = (childData) => {
      let baseCurrencyCode = childData;
      this.setState({ baseCurrencyCode: baseCurrencyCode });
      console.log('childData: ' + baseCurrencyCode);
      console.log('baseCurrencyCodeState: ' + this.state.baseCurrencyCode);
      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${baseCurrencyCode}`)
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

    render() {
      return (
        <div className="container">
          <Currency$ parentCallback={this.handleCallback}/>
          <Group$ baseCurrencyCode={this.state.baseCurrencyCode} latestFetchJson={this.state.latestFetchJson} date={this.state.latestFetchJson.date}/>
        </div>
      )
    }
  }

export { Base$ };





