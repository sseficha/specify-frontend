import "./App.css";
import Specify from "./pages/specify/Specify";
import Home from "./pages/home/Home";
import Navbar from "./pages/common/Navbar";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { PlayerContext } from "./context/PlayerContext";
import "./style/app.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login/Login";
import useAuth from "./hooks/useAuth";
import usePlayerConfig from "./hooks/usePlayerConfig";

//DIV CLASS CONTAINER ON TOP

function App() {
  const { accessToken, refreshToken, tokenExpirationDate, login, logout } =
    useAuth();

  const { playerConfig, setPlayerConfig } = usePlayerConfig();

  return (
    <AuthContext.Provider
      value={{
        accessToken: accessToken,
        refreshToken: refreshToken,
        tokenExpirationDate: tokenExpirationDate,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter style={{ minHeight: "100vh" }}>
        {accessToken ? (
          <PlayerContext.Provider value={{ playerConfig, setPlayerConfig }}>
            <Navbar />
            <div class="container-fluid text-white">
              <Switch>
                <Route path="/specify">
                  <Specify />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Redirect to="/" />
              </Switch>
            </div>
          </PlayerContext.Provider>
        ) : (
          <div class="container-fluid bg-dark bg-gradient text-white">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Redirect to="/login" />
            </Switch>
          </div>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
