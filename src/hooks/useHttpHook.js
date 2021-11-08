import { useState, useEffect } from "react";

function useHttpHook() {
  const [notification, setNotification] = useState();

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification();
      }, 4000);
    }
  }, [notification]);

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
        setNotification({ message: responseData.message, status: "danger" });
        throw new Error(responseData.message);
      }
      if (responseData.message) {
        setNotification({ message: responseData.message, status: "success" });
      }
      return responseData;
    } catch (err) {
      throw new Error(err);
    }
  };

  return { sendRequest, notification, setNotification };
}

export default useHttpHook;
