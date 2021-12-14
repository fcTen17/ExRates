import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Base } from './Base';
import { Pair } from './Pair';
import  { CurrencyChart }  from './CurrencyChart';
import Chart from 'chart.js';
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
                <Link id="baseCurrencyNav" className="nav-link"  to="/"><span>Base</span> <i class="fas fa-search-dollar"></i></Link>
              </li>
              <li className="nav-item">
                <Link id="pairComparisonNav" className="nav-link" to="/pair$"><span>Pair Calc</span> <i class="fas fa-calculator"></i></Link>
              </li>
              <li className="nav-item">
                <Link id="ChartNav" className="nav-link" to="/chart"><span>Chart</span> <i class="fas fa-chart-line"></i></Link>
              </li>
            </ul>
          </nav>
          <div className="app-container">            
            <Switch>
              <Route path="/" exact component={Base} />
              <Route path="/pair$" component={Pair} />
              <Route path="/chart" component={CurrencyChart} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;



