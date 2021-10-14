import ChartContainer from "./ChartContainer";

import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import useGroupAudioFeatures from "../../hooks/audioFeatures/useGroupAudioFeatures";
import useFilterAudioFeatures from "../../hooks/audioFeatures/useFilterAudioFeatures";
import useFetchAudioFeatures from "../../hooks/audioFeatures/useFetchAudioFeatures";

function ChartContainerGrid({
  optionalParams,
  setOptionalParams,
  filteredAudioFeatures,
  setFilteredAudioFeatures,
}) {
  let { accessToken } = useContext(AuthContext);
  // const [tracks, setTracks] = useState([]); //this can be with useMemo and useCallback instead of useEffect
  // const [originalAudioFeatures, setOriginalAudioFeatures] = useState([]); //this can be with useMemo and useCallback instead of useEffect

  // useEffect(() => {
  //   console.log("CHART CONTAINER GRID GOT RENDERED");
  // });

  const filteredGroupAudioFeatures = useGroupAudioFeatures(
    optionalParams,
    filteredAudioFeatures
  );

  const originalAudioFeatures = useFetchAudioFeatures(
    setFilteredAudioFeatures,
    accessToken
  );

  useFilterAudioFeatures(
    setFilteredAudioFeatures,
    originalAudioFeatures,
    optionalParams
  );

  return (
    <div class="row">
      {Object.keys(optionalParams).map((option) => (
        <div class="col-sm-12 col-md-6">
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
