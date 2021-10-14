import { createContext } from "react";

export const PlayerContext = createContext({
  playerConfig: null,
  setPlayerConfig: () => {},
});
