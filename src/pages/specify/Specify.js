import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import FormContainer from "./FormContainer";
import RecommendationContainer from "./RecommendationContainer";
// import Modal from "../common/Modal";
import "../../style/specify.scss";

function Specify() {
  const [recommendations, setRecommendations] = useState(null);
  return (
    <div class="container">
      <FormContainer setRecommendations={setRecommendations} />
      <RecommendationContainer recommendations={recommendations} />
      {/* <Modal></Modal> */}
    </div>
  );
}

export default Specify;
