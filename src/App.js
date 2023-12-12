import logo from './img/estiam.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width={450} height={130}/>
        <h1>Matthieu</h1>
        <h6>{process.env.REACT_APP_API_URL}</h6>
      </header>
    </div>
  );
}

export default App;
