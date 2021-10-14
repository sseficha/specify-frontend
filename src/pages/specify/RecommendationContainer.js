import { useEffect, useContext, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { AuthContext } from "../../context/AuthContext";
import Modal from "./Modal";
import useHttpHook from "../../hooks/useHttpHook";
function RecommendationContainer({ recommendations }) {
  const { accessToken } = useContext(AuthContext);

  // const [player, setPlayer] = useState(undefined);
  // const [deviceId, setDeviceId] = useState(undefined);

  const { playerConfig, setPlayerConfig } = useContext(PlayerContext);
  const { sendRequest, error, clearError } = useHttpHook();

  const play = ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken },
    },
  }) => {
    getOAuthToken((access_token) => {
      fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${playerConfig.deviceId}`,
        {
          method: "PUT",
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    });
  };

  useEffect(() => {
    let player;
    if (!playerConfig) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
          volume: 0.5,
        });

        // setPlayer(player);

        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          setPlayerConfig({ deviceId: device_id, player: player });

          // setDeviceId(device_id);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.connect();
      };
    } else {
      console.log("already have player config");
      player = playerConfig.player;
      player.connect();
    }
    return function cleanup() {
      player.disconnect();
    };
  }, []);

  return (
    <>
      <div class="d-flex flex-row justify-content-between align-items-center">
        <h2>Recommendations</h2>
        <button
          class="btn btn-success btn-sm "
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create Playlist
        </button>
      </div>
      <iframe
        src="https://open.spotify.com/embed/track/1MLVUnu8S4DZIN9HtQNkDc"
        width="100%"
        height="80"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
      <table class="table table-dark table-striped table-hover">
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
              key={track.uri}
              onClick={() =>
                play({
                  playerInstance: playerConfig.player,
                  spotify_uri: track.uri,
                })
              }
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
      <Modal
        uris={recommendations.map((recommendation) => recommendation.uri)}
      />
    </>
  );
}

export default RecommendationContainer;
