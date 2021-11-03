import { useEffect, useState } from "react";
import Modal from "./Modal";
import "../../style/recommendation.scss";
function RecommendationContainer({ recommendations }) {
  const [currentSong, setCurrentSong] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [audio, setAudio] = useState();

  const handleClick = (uri, url) => {
    if (url) {
      if (currentSong != uri) {
        setCurrentSong(uri);
        setAudio(new Audio(url));
        setIsSelected(true);
      } else {
        if (audio.paused) {
          audio.play();
          setIsSelected(true);
        } else {
          audio.pause();
          setIsSelected(false);
        }
      }
    }
  };

  useEffect(() => {
    if (audio) {
      audio.pause();
      audio.addEventListener("canplay", (event) => {
        audio.play();
      });
      return () => {
        audio.pause();
      };
    }
  }, [audio]);

  return (
    recommendations && (
      <>
        <div class="d-flex flex-row justify-content-between align-items-center">
          <h2>Recommendations</h2>
          {recommendations.length > 0 && (
            <button
              class="btn btn-success btn-sm "
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Create Playlist
            </button>
          )}
        </div>
        {recommendations.length == 0 && (
          <div>No songs available for selected filters</div>
        )}

        {recommendations.length > 0 && (
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">Track</th>
                <th scope="col">Artist</th>
                <th scope="col">Album</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((track) => (
                <tr
                  class={currentSong == track.uri && isSelected ? "active" : ""}
                  key={track.uri}
                  onClick={() => {
                    handleClick(track.uri, track.preview_url);
                  }}
                >
                  <td>{track.name}</td>
                  <td>
                    {track.artists.map((artist, index, array) =>
                      index != array.length - 1 ? (
                        <span>{artist.name + ", "}</span>
                      ) : (
                        <span>{artist.name}</span>
                      )
                    )}
                  </td>
                  <td>{track.album.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Modal
          uris={recommendations.map((recommendation) => recommendation.uri)}
        />
      </>
    )
  );
}

export default RecommendationContainer;
