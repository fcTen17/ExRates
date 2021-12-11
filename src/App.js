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
          <nav className="navbar main_frame" >           
            <Link className="navbar-brand px-2" to="/">
              <i className="fas fa-globe"></i> <span>GLOBAL RATES</span>
            </Link>              
            <ul className="nav">
              <li className="nav-item">
                <Link id="baseCurrencyNav" className="nav-link"  to="/">Base <span>Currency</span></Link>
              </li>
              <li className="nav-item">
                <Link id="pairComparisonNav" className="nav-link" to="/pair$">Pair <span>Comparison</span></Link>
              </li>
            </ul>
          </nav>
          <div className="app-container">            
            <Switch>
              <Route path="/" exact component={Base} />
              <Route path="/pair$" component={Pair} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;



