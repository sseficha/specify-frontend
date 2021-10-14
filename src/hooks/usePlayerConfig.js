import { useState } from "react";

function usePlayerConfig() {
  const [playerConfig, setPlayerConfig] = useState(null);

  return { playerConfig, setPlayerConfig };
}

export default usePlayerConfig;
