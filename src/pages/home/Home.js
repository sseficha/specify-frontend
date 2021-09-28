import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/specify">Link to specify page</Link>
    </>
  );
}

export default Home;
