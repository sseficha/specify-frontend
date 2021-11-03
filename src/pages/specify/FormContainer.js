import ChartContainerGrid from "./ChartContainerGrid";
import { useState, useEffect, useContext } from "react";
import SubmissionOverview from "./SubmissionOverview";
import TopSelectionContainer from "./TopSelectionContainer";
import { AuthContext } from "../../context/AuthContext";
import useHttpHook from "../../hooks/useHttpHook";

function FormContainer({ setRecommendations }) {
  const { sendRequest, error, clearError } = useHttpHook();

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
    instrumentalness: {
      min: 0,
      max: 1,
    },
  });

  const [selectedTrackSeeds, setSelectedTrackSeeds] = useState([]);
  const [selectedArtistSeeds, setSelectedArtistSeeds] = useState([]);
  const [selectedGenreSeeds, setSelectedGenreSeeds] = useState([]);

  const { accessToken } = useContext(AuthContext);
  //filtered audio features of tracks based on slider values
  const [filteredAudioFeatures, setFilteredAudioFeatures] = useState(
    // originalAudioFeatures
    []
  );

  const handleSubmit = () => {
    // if (!(selectedTrackSeed && selectedArtistSeed && selectedGenreSeed)) {
    //   alert("Track, message and artist fields are mandatory");
    // } else {
    if (
      (selectedTrackSeeds.length > 0 ||
        selectedGenreSeeds.length > 0 ||
        selectedArtistSeeds.length > 0) &&
      selectedTrackSeeds.length +
        selectedGenreSeeds.length +
        selectedArtistSeeds.length <=
        5
    ) {
      let payload = {
        ...optionalParams,
        trackSeeds: selectedTrackSeeds,
        artistSeeds: selectedArtistSeeds,
        genreSeeds: selectedGenreSeeds,
      };
      const fetchRecommendations = async () => {
        try {
          const responseData = await sendRequest({
            url: `${process.env.REACT_APP_SPOTIFY_API_URL}/recommendations`,
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          setRecommendations(responseData.tracks);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRecommendations();
      // }
    } else {
      alert("Combination of selections has to be at least 1 and at most 5");
    }
  };

  return (
    <>
      <ChartContainerGrid
        optionalParams={optionalParams}
        setOptionalParams={setOptionalParams}
        filteredAudioFeatures={filteredAudioFeatures}
        setFilteredAudioFeatures={setFilteredAudioFeatures}
      />

      <div class="row justify-content-center" style={{ marginTop: "5px" }}>
        {/* artistis tracks and genres */}
        <TopSelectionContainer
          type="tracks"
          setSelectedSeeds={setSelectedTrackSeeds}
          selectedSeeds={selectedTrackSeeds}
        />
        <TopSelectionContainer
          type="artists"
          setSelectedSeeds={setSelectedArtistSeeds}
          selectedSeeds={selectedArtistSeeds}
        />
        <TopSelectionContainer
          type="genres"
          setSelectedSeeds={setSelectedGenreSeeds}
          selectedSeeds={selectedGenreSeeds}
        />
      </div>

      {/* <SubmissionOverview optionalParams={optionalParams} /> */}
      <div class="row" style={{ marginTop: "5px" }}>
        <div class="col-12">
          <input
            class="btn btn-primary"
            type="submit"
            value="Submit"
            onClick={handleSubmit}
          ></input>
        </div>
      </div>
    </>
  );
}

export default FormContainer;
