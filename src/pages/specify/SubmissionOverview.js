function SubmissionOverview({ optionalParams, track, artist, genre }) {
  return (
    <div class="row">
      {/* <div class="col-12">
        <h2>Selected filters</h2>
        <h5>Optional filters</h5>
        <ul>
          {Object.keys(optionalParams).map((option) => (
            <li>
              {option}: min:{optionalParams[option].min}, max:
              {optionalParams[option].max}
            </li>
          ))}
        </ul>
        <h5>Required filters</h5>
        <ul>
          <li>track: {track}</li>
          <li>artist: {artist}</li>
          <li>genre: {genre}</li>
        </ul>
      </div> */}
      <div class="col-12">
        <input class="btn btn-primary" type="submit" value="Submit"></input>
      </div>
    </div>
  );
}

export default SubmissionOverview;
