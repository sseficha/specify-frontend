import ChartContainer from "./ChartContainer";
import audioFeatures from "../examples/audio_features.json";
import exampleAudioFeaturesGroup from "../examples/audio_features_group_example.json";

import { useState, useEffect } from "react";

function ChartContainerGrid({
  optionalParams,
  setOptionalParams,
  filteredAudioFeatures,
  setFilteredAudioFeatures,
}) {
  let originalAudioFeatures = audioFeatures.audio_features; //result of api call for audio features of tracks

  //sum of filtered audio features of tracks grouped in buckets of 10
  const [filteredGroupAudioFeatures, setFilteredGroupAudioFeatures] = useState(
    exampleAudioFeaturesGroup
  );

  useEffect(() => {
    const features = Object.keys(optionalParams);
    let temp = JSON.parse(JSON.stringify(exampleAudioFeaturesGroup)); // THIS HAS TO BE INITIALISED CORRECTLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    filteredAudioFeatures.forEach((element) => {
      features.forEach((feature) => {
        let value = element[feature];
        if (value != 0 && value != 1)
          temp[feature][Math.floor(value / 0.1)]["sum"] += 1;
      });
    });
    setFilteredGroupAudioFeatures(temp);
  }, [filteredAudioFeatures]);

  useEffect(() => {
    setFilteredAudioFeatures(
      originalAudioFeatures.filter(
        (element) =>
          element.danceability >= optionalParams.danceability.min &&
          element.danceability <= optionalParams.danceability.max &&
          element.energy >= optionalParams.energy.min &&
          element.energy <= optionalParams.energy.max
      )
    );
  }, [optionalParams]);

  return (
    <div class="row">
      {Object.keys(optionalParams).map((option) => (
        <div class="col-sm-12 col-md-6" style={{ height: "200px" }}>
          <ChartContainer
            key={option}
            title={option}
            optionalParams={optionalParams}
            setOptionalParams={setOptionalParams}
            data={filteredGroupAudioFeatures}
          />
        </div>
      ))}
    </div>
  );
}
export default ChartContainerGrid;
