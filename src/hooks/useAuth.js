import { useCallback, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import useHttpHook from "./useHttpHook";

//have to watch out for token expiration
//if token is expired (Date.now >= tokenExpirationDate) then make a call to refresh it and set new token

let refreshTimer;

function useAuth() {
  // let history = useHistory();

  const { sendRequest, error, clearError } = useHttpHook();

  const [creds, setCreds] = useState({}); //as object, insted of states cause of complications when updated at the same time separately

  const login = useCallback((creds) => {
    setCreds(creds);
    localStorage.setItem("userData", JSON.stringify(creds));
    // history.push("/");
  }, []);

  const logout = useCallback(() => {
    setCreds({});
    localStorage.removeItem("userData");
    clearTimeout(refreshTimer);
  }, []);

  const refreshAccessToken = () => {
    console.log("time to refresh access token");
    const fetchToken = async () => {
      try {
        const responseData = await sendRequest({
          url: `${process.env.REACT_APP_SPOTIFY_API_URL}/refresh_token`,
          method: "POST",
          body: JSON.stringify({ refreshToken: creds.refreshToken }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        login({
          accessToken: responseData.access_token,
          refreshToken: responseData.refresh_token,
          tokenExpirationDate: responseData.expiration_date,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchToken();
  };

  useEffect(() => {
    let remainingTime;
    if (creds.accessToken && creds.tokenExpirationDate) {
      console.log(
        "access token is " +
          creds.accessToken +
          "expiration is " +
          new Date(creds.tokenExpirationDate)
      );
      let now = new Date().getTime();
      let expiration = new Date(creds.tokenExpirationDate).getTime();
      remainingTime = expiration - now;
      refreshTimer = setTimeout(refreshAccessToken, remainingTime);
    }
    // else {
    //   clearTimeout(refreshTimer);
    // }

    console.log(remainingTime / 1000 / 60);
  }, [creds]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.accessToken) {
      //&&token expiration date...
      login(userData);
    }
  }, []);

  return {
    accessToken: creds.accessToken || null,
    refreshToken: creds.refreshToken || null,
    tokenExpirationDate: creds.tokenExpirationDate || null,
    login: login,
    logout: logout,
  };
}

export default useAuth;
