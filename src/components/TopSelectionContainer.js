function TopSelectionContainer({ type, options, setSelectedSeed }) {
  return (
    <div class="row">
      <div class="col-4 offset-4">
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => setSelectedSeed(e.target.value)}
        >
          <option selected>Open this {type} select menu</option>
          {options.map((option) =>
            type == "artists" || type == "tracks" ? (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ) : (
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
}

export default TopSelectionContainer;
