import { useEffect, useState } from "react";

function useFetchToken(code) {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (code) {
          let response = await fetch(
            "http://localhost:5000/spotify_api/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code }),
            }
          );
          if (!response.ok) {
            let responseData = await response.json();
            throw new Error(responseData.message);
          } else {
            let responseData = await response.json();
            setAccessToken(responseData.access_token);
          }
        } else {
          console.log("No code yet");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [code]);
  return accessToken;
}

export default useFetchToken;
