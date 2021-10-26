import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { json, checkStatus } from './utils';
import './Base$.css';

const host = 'altexchangerateapi.herokuapp.com'

const Currency = (props) => {
    const Code$ = props.pairArr[0];
    const Rate$ = props.pairArr[1];
        

    return (
        <div className="row">
          <div className="col-4 col-md-2 col-lg-1 mb-3">
            <h5>{Code$}</h5>
          </div>
          <div className="col-8 col-md-10 col-lg-11 mb-3">
            <h5>{Rate$}</h5>
          </div>
        </div>
      )
}

class Base$ extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: '',
        results: [],
        error: '',
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({ searchTerm: event.target.value });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      
  
      
  
      fetch(`https://${host}/latest`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          if (data) {
            console.log(data);
            const { rates } = data;
            const ratesArr = Object.entries(rates);
            this.setState({ results: ratesArr})
            console.log(this.state.results);  
          }
        })
        .catch((error) => {
          this.setState({ error: error.message });
          console.log(error);
        })
    }
  
    render() {
      const { searchTerm, results, error } = this.state;
  
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form onSubmit={this.handleSubmit} className="form-inline my-4">
                <input
                  type="text"
                  className="form-control mr-sm-2"
                  placeholder="frozen"
                  value={searchTerm}
                  onChange={this.handleChange}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              {(() => {
                    if (error) {
                    return error;
                    }
                    return results.map((pairArr) => {
                    return <Currency key={pairArr[0]} pairArr={pairArr} />;
                    }) 
                })()} 
            </div>
          </div>
        </div>
      )
    }
  }





export { Base$ };
/*

{(() => {
    if (error) {
      return error;
    }
    return results.map((pairArr) => {
    return <Movie key={pairArr[0]} pairArr={pairArr} />;
    }) 
})()} 

*/