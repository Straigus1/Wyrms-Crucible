import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TitleScreen from "./Components/TitleScreen";
import SignupPage from "./Components/SignupPage";
import LoginPage from "./Components/LoginPage";

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

  // # Potential refactoring attempt for later

  // function routePath(path, component) {
  //   <Route path={`/${path}`}
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginPage player={player} setPlayer={setPlayer} />
          </Route>
          <Route path="/signup">
            <SignupPage player={player} setPlayer={setPlayer} />
          </Route>
          <Route path="/">
            <TitleScreen player={player} setPlayer={setPlayer} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
