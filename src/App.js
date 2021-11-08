import "./App.css";
import Specify from "./pages/specify/Specify";
import Home from "./pages/home/About";
import Navbar from "./pages/common/Navbar";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { HttpContext } from "./context/HttpContext";
import "./style/app.scss";
import Modal from "./pages/common/Modal";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login/Login";
import useAuth from "./hooks/useAuth";
import useHttpHook from "./hooks/useHttpHook";

//DIV CLASS CONTAINER ON TOP

function App() {
  const { accessToken, refreshToken, tokenExpirationDate, login, logout } =
    useAuth();

  const { sendRequest, notification, setNotification } = useHttpHook();
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
      <HttpContext.Provider
        value={{
          sendRequest: sendRequest,
          notification: notification,
          setNotification: setNotification,
        }}
      >
        <BrowserRouter style={{ minHeight: "100vh" }}>
          {accessToken ? (
            <>
              <Navbar />
              <div class="container-fluid text-white">
                <Switch>
                  {/* <Route path="/specify">
                  <Specify />
                </Route> */}
                  {/* <Route exact path="/">
                  <Home />
                </Route> */}
                  <Route exact path="/">
                    <Specify />
                  </Route>
                  <Route exact path="/about">
                    <Home />
                  </Route>
                  <Redirect to="/" />
                </Switch>
              </div>
              <Modal
                type={notification && notification.status}
                text={notification && notification.message}
              />
            </>
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
      </HttpContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
