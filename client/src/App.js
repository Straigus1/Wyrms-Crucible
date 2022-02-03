import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TitleScreen from "./Components/TitleScreen";

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
        <Switch>
          <Route>
            <TitleScreen player={player} setPlayer={setPlayer} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
