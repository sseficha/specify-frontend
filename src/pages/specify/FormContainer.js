import ChartContainerGrid from "./ChartContainerGrid";
import { useState, useEffect } from "react";
import SubmissionOverview from "./SubmissionOverview";
import TopSelectionContainer from "./TopSelectionContainer";
import audioFeatures from "../../examples/audio_features.json";
import topTracks from "../../examples/top_tracks.json";
import topArtists from "../../examples/top_artists.json";
import genres from "../../examples/genres.json";

function FormContainer() {
  let originalAudioFeatures = audioFeatures.audio_features; //result of api call for audio features of tracks

  const [optionalParams, setOptionalParams] = useState({
    danceability: {
      min: 0,
      max: 1,
    },
    energy: {
      min: 0,
      max: 1,
    },
    acousticness: {
      min: 0,
      max: 1,
    },
  });

  const [selectedTrackSeed, setSelectedTrackSeed] = useState("");
  const [selectedArtistSeed, setSelectedArtistSeed] = useState("");
  const [selectedGenreSeed, setSelectedGenreSeed] = useState("");

  //filtered audio features of tracks based on slider values
  const [filteredAudioFeatures, setFilteredAudioFeatures] = useState(
    originalAudioFeatures
  );

  return (
    <>
      <ChartContainerGrid
        optionalParams={optionalParams}
        setOptionalParams={setOptionalParams}
        filteredAudioFeatures={filteredAudioFeatures}
        setFilteredAudioFeatures={setFilteredAudioFeatures}
      />

      {/* artistis tracks and genres */}
      <TopSelectionContainer
        type="tracks"
        options={topTracks.items}
        setSelectedSeed={setSelectedTrackSeed}
      />
      <TopSelectionContainer
        type="artists"
        options={topArtists.items}
        setSelectedSeed={setSelectedArtistSeed}
      />
      <TopSelectionContainer
        type="genres"
        options={genres.genres}
        setSelectedSeed={setSelectedGenreSeed}
      />

      <SubmissionOverview optionalParams={optionalParams} />
    </>
  );
}

export default FormContainer;
