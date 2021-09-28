import React from "react";
import ReactDOM from "react-dom";

// import "../node_modules/jquery/dist/jquery.min.js";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.css"; //import bootstrap css
import "./index.css"; //import custom css

import App from "./App";
import reportWebVitals from "./reportWebVitals";

//Browser Router or Hash router

//Extra config for express when serving production build!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
