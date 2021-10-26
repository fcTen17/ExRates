import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Base$ } from './Base$';
import { Pair$ } from './Pair$';
import './App.css';



const App = () => {
  return (
    <Router>
      <div className="App">                
          
          <nav className="navbar fixed-top navbar-light main_frame" >
          
            <Link className="navbar-brand px-2" to="/">
              ExRates
            </Link>
            
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-outline-primary">
              <Link className="nav-link" to="/">
                <input type="radio" name="options" id="option1" autocomplete="off"></input>
                Base Currency</Link>
              </label>
              <label class="btn btn-outline-primary">
              <Link className="nav-link" to="/pair$">
                <input type="radio" name="options" id="option2" autocomplete="off"></input>
                Pair Comparison</Link>
              </label>              
            </div>
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

export default App;


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
