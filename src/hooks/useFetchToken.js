import { useEffect, useState } from "react";
import useHttpHook from "./useHttpHook";

function useFetchToken(code) {
  // const [accessToken, setAccessToken] = useState(null);
  // const [refreshToken, setRefreshToken] = useState(null);
  // const [expirationDate, setExpirationDate] = useState(null);

  const [creds, setCreds] = useState(null);

  const { sendRequest, error, clearError } = useHttpHook();

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        try {
          const responseData = await sendRequest({
            url: `${process.env.REACT_APP_SPOTIFY_API_URL}/login`,
            method: "POST",
            body: JSON.stringify({ code }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          setCreds({
            accessToken: responseData.access_token,
            refreshToken: responseData.refresh_token,
            tokenExpirationDate: responseData.expiration_date,
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("No code yet");
      }
    };
    fetchData();
  }, [code]);
  return creds;
}

export default useFetchToken;
