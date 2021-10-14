import { useState } from "react";

function useHttpHook() {
  const [error, setError] = useState();

  const sendRequest = async ({
    url,
    method = "GET",
    body = null,
    headers = {},
  }) => {
    // console.log(url, method, body, headers);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      return responseData;
    } catch (err) {
      setError(err);
      throw new Error(err);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { sendRequest, error, clearError };
}

export default useHttpHook;
