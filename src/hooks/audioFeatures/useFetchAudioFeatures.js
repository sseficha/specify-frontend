import { useEffect, useState } from "react";
import useHttpHook from "../useHttpHook";

const useFetchAudioFeatures = (setFilteredAudioFeatures, accessToken) => {
  const [tracks, setTracks] = useState([]); //this can be with useMemo and useCallback instead of useEffect
  const [originalAudioFeatures, setOriginalAudioFeatures] = useState([]); //this can be with useMemo and useCallback instead of useEffect
  const { sendRequest, error, clearError } = useHttpHook();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let responseData = await sendRequest({
          url: `${process.env.REACT_APP_SPOTIFY_API_URL}/top_tracks`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        responseData = Object.values(responseData)[0];
        setTracks(responseData.map((element) => element.id));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (tracks.length > 0) {
      const fetchData = async () => {
        try {
          let responseData = await sendRequest({
            url: `${process.env.REACT_APP_SPOTIFY_API_URL}/analysis`,
            method: "POST",
            body: JSON.stringify({ tracks: tracks }),
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          responseData = Object.values(responseData)[0];
          setFilteredAudioFeatures(responseData);
          setOriginalAudioFeatures(responseData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [tracks]);
  return originalAudioFeatures;
};

export default useFetchAudioFeatures;
