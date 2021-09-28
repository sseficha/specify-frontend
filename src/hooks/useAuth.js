import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

function useAuth() {
  // let history = useHistory();
  const [token, setToken] = useState(null);

  const login = useCallback((token) => {
    setToken(token);
    localStorage.setItem("userData", JSON.stringify({ token: token }));
    //also has to be in local storage or else it's lost when navigating
    // history.push("/");
  }, []);

  const logout = useCallback(() => {
    console.log("logout");
  }, []);

  return { token, login, logout };
}

export default useAuth;
