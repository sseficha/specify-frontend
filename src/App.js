import "./App.css";
import Specify from "./pages/specify/Specify";
import Home from "./pages/home/Home";
import Navbar from "./pages/common/Navbar";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login/Login";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react/cjs/react.development";

//DIV CLASS CONTAINER ON TOP

function App() {
  const { token, login, logout } = useAuth();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.token) {
      login(userData.token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: token, login: login, logout: logout }}
    >
      <BrowserRouter>
        {token ? (
          <>
            <Navbar />
            <div class="container">
              <Switch>
                <Route path="/specify">
                  <Specify />
                </Route>
                {/* <Route path="/login">
            <Login />
          </Route> */}
                <Route exact path="/">
                  <Home />
                </Route>
                <Redirect to="/" />
              </Switch>
            </div>
          </>
        ) : (
          <div class="container">
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
