import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Transition1 from "./Components/Transition1";
import Transition2 from "./Components/Transition2";
import Transition3 from "./Components/Transition3";
import Transition4 from "./Components/Transition4";
import Transition5 from "./Components/Transition5";
import TitleScreen from "./Components/TitleScreen";
import SignupPage from "./Components/SignupPage";
import LoginPage from "./Components/LoginPage";
import Battle1 from "./Components/Battle1";
import Battle2 from "./Components/Battle2";
import Battle3 from "./Components/Battle3";
import Battle4 from "./Components/Battle4";
import Battle5 from "./Components/Battle5";

function App() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch('/me')
    .then((r) => {
      if (r.ok) {
        r.json().then((player) => setPlayer(player));
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitleScreen player={player} setPlayer={setPlayer}/> }/>
          <Route path="/login" element={<LoginPage player={player} setPlayer={setPlayer}/> }/>
          <Route path="/signup" element={<SignupPage player={player} setPlayer={setPlayer}/> }/>
          <Route path="/transition-one" element={<Transition1 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/transition-two" element={<Transition2 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/transition-three" element={<Transition3 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/transition-four" element={<Transition4 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/transition-five" element={<Transition5 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battle-one" element={<Battle1 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battle-two" element={<Battle2 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battle-three" element={<Battle3 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battle-four" element={<Battle4 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battle-five" element={<Battle5 player={player} setPlayer={setPlayer}/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
