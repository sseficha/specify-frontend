import "bootstrap/dist/js/bootstrap.js";
import { useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { HttpContext } from "../../context/HttpContext";

// import useHttpHook from "../../hooks/useHttpHook";

function PlaylistModal({ uris }) {
  const inputText = useRef(null);
  const modal = useRef(null);
  const { accessToken } = useContext(AuthContext);
  // const { sendRequest, text } = useHttpHook();
  const { sendRequest, setNotification } = useContext(HttpContext);

  const handeClick = () => {
    const createPlaylist = async () => {
      try {
        const responseData = await sendRequest({
          url: `${process.env.REACT_APP_SPOTIFY_API_URL}/create_playlist?name=${inputText.current.value}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uris: uris }),
        });
        modal.current.click(); //close modal

        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    createPlaylist();
  };

  return (
    <div
      ref={modal}
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Playlist name
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              ref={inputText}
              class="form-control bg-dark text-white"
            ></input>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button onClick={handeClick} type="button" class="btn btn-success">
              Save playlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistModal;
