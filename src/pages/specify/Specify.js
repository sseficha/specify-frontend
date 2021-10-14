import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import FormContainer from "./FormContainer";
import RecommendationContainer from "./RecommendationContainer";
import "../../style/specify.scss";

function Specify() {
  const [recommendations, setRecommendations] = useState([]);
  return (
    <div class="container">
      <FormContainer setRecommendations={setRecommendations} />
      <RecommendationContainer recommendations={recommendations} />
    </div>
  );
}

export default Specify;
