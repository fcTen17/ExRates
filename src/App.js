import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Base$ } from './Base$';
import { Pair$ } from './Pair$';
import { json, checkStatus } from './utils';
import $ from 'jquery/dist/jquery.min.js';
import './App.css';

let ratesObj = {
  container: {},
  fetch () {
    fetch(`https://altexchangerateapi.herokuapp.com/latest`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.container = data;
      if (data) {
        //console.log(data);
        const { rates } = data;
        ratesArr = Object.entries(rates);
        console.log(ratesArr);
        console.log(ratesObj); 
      }
    })
    .catch((error) => {
      
      console.log(error);
    })
  }
};
let ratesArr = undefined;

$(document).ready(function(){
  ratesObj.fetch()
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: 'baseCurrencyNav',
    };

    
    this.getId = this.getId.bind(this);
  }
  
  getId(thisId) {
    let linkName = thisId;
    this.setState({ link : linkName });
    console.log('linkName: ' + linkName);
    console.log('clicked!');
  } 

  render() {

    return (
      <Router>
        <div className="App">                
            
            <nav className="navbar fixed-top navbar-light main_frame" >
            
              <Link className="navbar-brand px-2" to="/">
                ExRates
              </Link>
              
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <Link id="baseCurrencyNav" className="nav-link active"  to="/">Base Currency</Link>
                </li>
                <li className="nav-item">
                  <Link id="pairComparisonNav" className="nav-link" to="/pair$">Pair Comparison</Link>
                </li>
              </ul>


              
              <div>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button 
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
              </div>          

            </nav>



            <Switch>
              <Route path="/" exact component={Base$} />
              <Route path="/pair$" component={Pair$} />
            </Switch>
            

            

            

          <footer className="footer_wrapper main_frame">
            <div className="inner_footer">
              <div className="copyright">
                <p>copyright</p>
              </div>
              <div className="authorship">
                <p>developed by fcTen</p>
              </div>
              <div className="contact">
                <p>email social</p>
              </div>
            </div>

          </footer>
        </div>
      </Router>
    );
  }
}

export default App;

export { ratesObj };
/* Pills Nav */
/*

<ul className="nav nav-pills">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Base Currency</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pair$">Pair Comparison</Link>
              </li>              
            </ul>

*/
