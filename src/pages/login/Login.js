import { useContext, useEffect, useState } from "react";
import { loginUrl } from "../../config/spotify";
import useFetchToken from "../../hooks/useFetchToken";

import { AuthContext } from "../../context/AuthContext";

function Login() {
  let { token, login, logout } = useContext(AuthContext);
  const [code, setCode] = useState(null);
  let accessToken = useFetchToken(code);

  //
  useEffect(() => {
    console.log("Login component rendered");
    const code = new URLSearchParams(window.location.search).get("code");
    setCode(code);
  }, []);

  //
  useEffect(() => {
    console.log("access token is: " + accessToken);
    if (accessToken) {
      login(accessToken);
    }
    // history.push("/");
    //set token context with login function from custom hook
    //if accessToken != null ->>>
  }, [accessToken]);

  return (
    <>
      <a href={loginUrl}>Login</a>
    </>
  );
}

export default Login;
