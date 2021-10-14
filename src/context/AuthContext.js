import { createContext } from "react";

export const AuthContext = createContext({
  accessToken: null,
  refreshToken: null,
  tokenExpirationDate: null,
  login: () => {},
  logout: () => {},
  playerConfig: null,
  setPlayerConfig: () => {},
});
