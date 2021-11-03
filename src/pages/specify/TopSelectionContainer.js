import { AuthContext } from "../../context/AuthContext";
import { useEffect, useContext, useState } from "react";
import "../../style/selection.scss";
import useHttpHook from "../../hooks/useHttpHook";

function TopSelectionContainer({ type, setSelectedSeeds, selectedSeeds }) {
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

  const handleClick = (checked, item) => {
    // let seeds = selectedSeeds;
    if (checked) {
      setSelectedSeeds(selectedSeeds.concat([item]));
    } else {
      setSelectedSeeds(selectedSeeds.filter((val) => val != item));
    }
  };

  return (
    // <div class="row justify-content-center" style={{ marginTop: "5px" }}>
    <div class="col-12 col-sm-4">
      {/* <a
        class="btn btn-dark w-100"
        data-bs-toggle="collapse"
        href={`#multiCollapseExample-${type}`}
        role="button"
        aria-expanded="false"
        aria-controls={`multiCollapseExample-${type}`}
      >
        Toggle {type} element
      </a> */}

      {/* <div class="collapse multi-collapse " id={`multiCollapseExample-${type}`}> */}
      <h5>{type} selection</h5>
      <ul class="list-group ">
        {options.map((option) => (
          <li
            class="list-group-item bg-dark text-white"
            key={type == "artists" || type == "tracks" ? option.id : option}
          >
            <input
              onChange={(e) =>
                handleClick(
                  e.target.checked,
                  type == "artists" || type == "tracks" ? option.id : option
                )
              }
              class="form-check-input me-1"
              type="checkbox"
              value=""
              aria-label="..."
            />
            {type == "artists" || type == "tracks" ? option.name : option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopSelectionContainer;
