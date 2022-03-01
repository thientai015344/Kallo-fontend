import React from 'react'
import './App.scss';

import AppBar from '../src/components/appBar/appBar.js'
import BoardBar from '../src/components/boardBar/boardBar.js'
import BoardContent from '../src/components/boardContent/boardContent.js'

function App() {
  return (
    <div className="App-kallo">

     <AppBar />  
     <BoardBar />
     <BoardContent />
     
    </div>
  );
}

export default App;
