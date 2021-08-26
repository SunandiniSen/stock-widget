import { AutoSuggest } from './components/AutoSuggest';
import { StockDetails } from './components/StockDetails/StockDetails';
import { Navigation } from './components/Navigation/Navigation';
import { AutoRefresh } from "./components/AutoRefresh/AutoRefresh";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">Intuit Design Problem</header>
      <div className="container">
        <div className="container-left">
          <AutoSuggest />
          <AutoRefresh />
        </div>
        <div className="container-right">
          <StockDetails />
          <Navigation />
        </div>
      </div>
    </div>
  );
}

export default App;
