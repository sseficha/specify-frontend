import recommendedTracks from "../examples/recommended_tracks.json";

function RecommendationContainer() {
  return (
    <>
      <h2>Recommendations</h2>
      {recommendedTracks.tracks.map((track) => (
        <div class="row">
          <div class="col-4">{track.name}</div>
          <div class="col-4">
            {track.artists.map((artist, index, array) =>
              index != array.length - 1 ? (
                <span>{artist.name + ", "}</span>
              ) : (
                <span>{artist.name}</span>
              )
            )}
          </div>
          <div class="col-4">{track.album.name}</div>
        </div>
      ))}
    </>
  );
}

export default RecommendationContainer;
