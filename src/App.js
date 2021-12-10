import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Base } from './Base';
import { Pair } from './Pair';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: 'baseCurrencyNav',
    };

    
    
  }
  

  render() {

    return (
      <Router>
        <div className="App">                  
          <nav className="navbar fixed-top main_frame" >           
            <Link className="navbar-brand px-2" to="/">
              <span><i className="fas fa-globe"></i> GLOBAL RATES</span>
            </Link>              
            <ul className="nav">
              <li className="nav-item">
                <Link id="baseCurrencyNav" className="nav-link"  to="/">Base Currency</Link>
              </li>
              <li className="nav-item">
                <Link id="pairComparisonNav" className="nav-link" to="/pair$">Pair Comparison</Link>
              </li>
            </ul>
          </nav>
          <div className="app-container">            
            <Switch>
              <Route path="/" exact component={Base} />
              <Route path="/pair$" component={Pair} />
            </Switch>
          </div>
          <footer className="footer_wrapper main_frame">
            <div className="inner-footer">
              <div className="inner-element copyright">
                <i>copyright &copy; 2021</i>
              </div>
              <div className="inner-element authorship">
                <i>developed by fcTen</i>
              </div>
              <div className="contact">
                <a href="https://github.com/fcTen17"><i className="fab fa-github"></i></a>
                <a href="http://linkedin.com/in/fernando-cesar-tenório-206a0a2b"><i className="fab fa-linkedin"></i></a>              
              </div>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;



