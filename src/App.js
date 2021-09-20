import "./App.css";
import FormContainer from "./components/FormContainer";
import Navbar from "./components/Navbar";
import RecommendationContainer from "./components/RecommendationContainer";

function App() {
  return (
    // Navbar component
    <div class="container">
      <Navbar />
      <FormContainer />
      <RecommendationContainer />
    </div>
  );
}

export default App;
