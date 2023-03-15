import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.css';
import Join from './Components/Join/Join.js';
import Chat from './Components/Chat/Chat.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Join/>}></Route>
          <Route exact path="/chat" element={<Chat/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
