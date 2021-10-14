import { useContext, useEffect, useState } from "react";
import { loginUrl } from "../../config/spotify";
import useFetchToken from "../../hooks/useFetchToken";
import { AuthContext } from "../../context/AuthContext";

import "../../style/login.scss";

function Login() {
  let { token, login, logout } = useContext(AuthContext);
  const [code, setCode] = useState(null);

  let creds = useFetchToken(code);

  //
  useEffect(() => {
    console.log("Login component rendered");
    const code = new URLSearchParams(window.location.search).get("code");
    setCode(code);
  }, []);

  //
  useEffect(() => {
    // console.log("access token is: " + accessToken);
    if (creds) {
      login(creds);
    }
    // history.push("/");
    //set token context with login function from custom hook
  }, [creds]);

  return (
    <div
      class="row justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div class="col-8 col-sm-4 d-flex flex-column justify-content-between">
        <h2 class="text-center">Specify</h2>
        <div class="text-center margin" style={{ marginBottom: "8px" }}>
          Some words about the super killer specify app! :)
        </div>
        <a href={loginUrl} class="btn btn-success btn-lg" role="button">
          Connect with spotify
        </a>
      </div>
    </div>
  );
}

export default Login;
