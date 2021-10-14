import { useEffect } from "react";

const useFilterAudioFeatures = (
  setFilteredAudioFeatures,
  originalAudioFeatures,
  optionalParams
) => {
  // //effect for filtering tracks audio features   CUSTOM HOOK
  useEffect(() => {
    setFilteredAudioFeatures(
      originalAudioFeatures.filter(
        (element) =>
          element.danceability >= optionalParams.danceability.min &&
          element.danceability <= optionalParams.danceability.max &&
          element.energy >= optionalParams.energy.min &&
          element.energy <= optionalParams.energy.max &&
          element.acousticness >= optionalParams.acousticness.min &&
          element.acousticness <= optionalParams.acousticness.max &&
          element.instrumentalness >= optionalParams.instrumentalness.min &&
          element.instrumentalness <= optionalParams.instrumentalness.max
      )
    );
  }, [optionalParams]);
};

export default useFilterAudioFeatures;
