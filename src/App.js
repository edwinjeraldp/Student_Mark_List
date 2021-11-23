import logo from './logo.svg';
import './App.css';
import ProgressBarComponent from './ProgressBarComponent';
import data from "./jsonSample";
function App() {
  return (
    <div className="App">
      <ProgressBarComponent dataToPass = {data}/>
    </div>
  );
}

export default App;
