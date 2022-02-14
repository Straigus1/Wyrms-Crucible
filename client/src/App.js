import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Beginning from "./Components/Beginning";
import Beginning2 from "./Components/Beginning2";
import Transition from "./Components/Transition"
import Transition2 from "./Components/Transition2";
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
          <Route path="/beginning-discover" element={<Beginning player={player} setPlayer={setPlayer}/> }/>
          <Route path="/beginning-entrance" element={<Beginning2 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/transition-one" element={<Transition player={player} setPlayer={setPlayer}/> }/>
          <Route path="/transition-two" element={<Transition2 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battleone" element={<Battle1 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battletwo" element={<Battle2 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battlethree" element={<Battle3 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battlefour" element={<Battle4 player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battlefive" element={<Battle5 player={player} setPlayer={setPlayer}/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
