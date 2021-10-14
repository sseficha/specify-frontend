import { AuthContext } from "../../context/AuthContext";
import { useEffect, useContext, useState } from "react";
import "../../style/selection.scss";
import useHttpHook from "../../hooks/useHttpHook";

function TopSelectionContainer({ type, setSelectedSeed }) {
  const [options, setOptions] = useState([]);
  let { accessToken } = useContext(AuthContext);
  const { sendRequest, error, clearError } = useHttpHook();

  // useEffect(() => {
  //   console.log("TopSelection Container got rendered");
  // });

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
        let responseData = await sendRequest({
          url: `${process.env.REACT_APP_SPOTIFY_API_URL}/${endpoint}`,

          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        responseData = Object.values(responseData)[0];
        setOptions(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div class="row justify-content-center" style={{ marginTop: "5px" }}>
      <div class="col-12 col-sm-8">
        <select
          class="form-select form-select-md bg-dark text-white"
          aria-label="Default select example"
          onChange={(e) => setSelectedSeed(e.target.value)}
        >
          <option disabled selected>
            Open this {type} select menu
          </option>
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
