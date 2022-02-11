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
import BattleOne from "./Components/BattleOne";
import BattleTwo from "./Components/BattleTwo";

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
          <Route path="/battleone" element={<BattleOne player={player} setPlayer={setPlayer}/> }/>
          <Route path="/battletwo" element={<BattleTwo player={player} setPlayer={setPlayer}/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
