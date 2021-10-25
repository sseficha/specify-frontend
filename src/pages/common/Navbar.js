import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);
  return (
    // <nav class="navbar navbar-expand-sm navbar-dark bg-dark bg-gradient">
    <nav class="navbar navbar-expand navbar-dark bg-dark bg-gradient">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarNavAltMarkup"
      >
        <div class="navbar-nav">
          <Link to="/" class="nav-item nav-link">
            Specify
          </Link>

          <Link to="/about" class="nav-item nav-link">
            About
          </Link>
        </div>
        <div class="navbar-nav">
          <Link to="#" class="nav-item nav-link" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
