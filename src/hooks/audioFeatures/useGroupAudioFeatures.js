import { useState, useEffect } from "react";
import exampleAudioFeaturesGroup from "../../examples/audio_features_group_example.json";

const useGroupAudioFeatures = (optionalParams, filteredAudioFeatures) => {
  //sum of filtered audio features of tracks grouped in buckets of 10
  const [filteredGroupAudioFeatures, setFilteredGroupAudioFeatures] = useState(
    exampleAudioFeaturesGroup
  );

  useEffect(() => {
    const features = Object.keys(optionalParams);

    let original = {};
    features.forEach(
      (feature) =>
        (original[feature] = [...Array(10).keys()].map((index) => {
          return { sum: 0, group: `${index}-${index + 1}` };
        }))
    );

    filteredAudioFeatures.forEach((element) => {
      features.forEach((feature) => {
        let value = element[feature];
        if (value <= 1) original[feature][Math.floor(value / 0.1)]["sum"] += 1;
      });
    });
    setFilteredGroupAudioFeatures(original);
  }, [filteredAudioFeatures]);

  return filteredGroupAudioFeatures;
};

export default useGroupAudioFeatures;
