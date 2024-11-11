import './App.css';
import React, { useRef } from 'react';
import Grid from './Components/Grid';
import Sidebar from './Sidebar';

function App() {
  const exportGrid = useRef(
    Array(32).fill(Array(32).fill(" ").join(""))
    .join("\n")
  )

  const storeGrid = (array) => {
    let str = ""
    for(let i; i < 32; i++) {
      str += array.slice(i, i+32) + "\n";
    }
    return str;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Sidebar/>
        <Grid storeGrid={storeGrid}/>
      </header>
    </div>
  );
}

export default App;
