import { AuthContext } from "../../context/AuthContext";
import { useEffect, useContext, useState } from "react";

function TopSelectionContainer({ type, setSelectedSeed }) {
  const [options, setOptions] = useState([]);
  let { token } = useContext(AuthContext);

  useEffect(() => {
    let endpoint;
    switch (type) {
      case "tracks":
        endpoint = "top_tracks";
        break;
      case "artists":
        endpoint = "top_artists";
        break;
      case "genres":
        endpoint = "genres";
        break;
      default:
        break;
    }
    const fetchData = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/spotify_api/${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          let responseData = await response.json();
          throw new Error(responseData.message);
        } else {
          let responseData = await response.json();
          responseData = Object.values(responseData)[0];
          console.log(responseData);
          setOptions(responseData);
          //genres: responseData.genres
          //topTracks: responseData.map(element=>element.name)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
