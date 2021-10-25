import logo from './logo.svg';
import './App.css';



function App() {
  return (   
    <div className="App">                
        
        <nav className="navbar fixed-top navbar-light main_frame" >
          <a className="navbar-brand px-2" href="#">
            ExRates
          </a>
          <nav className="nav nav-pills">
            <a className="nav-link" href="#baseCurrency">Base Currency</a>
            <a className="nav-link" href="#pairComparison">Pair Comparison</a>
          </nav>
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
        
        

        <div className="testBase" id="baseCurrency">
          <p>Base Currency App <i className="fas fa-hashtag"></i> </p>
        </div>

        <div className="testPair" id="pairComparison">
          <p>Pair Comparison App <i className="fab fa-twitter"></i> </p>
        </div>

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
  );
}

export default App;
