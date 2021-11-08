import { createContext } from "react";

export const HttpContext = createContext({
  sendRequest: () => {},
  notification: null,
  setNotification: () => {},
});
