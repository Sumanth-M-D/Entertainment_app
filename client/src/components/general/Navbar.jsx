import { Link } from "react-router-dom";
import { MdWindow, MdLocalMovies } from "react-icons/md";
import { GiTv } from "react-icons/gi";
import { FaBookmark, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="">
      <p className="text-3xl text-primary"> Navbar</p>
      <div>
        <img src="logo-removebg.png" alt="logo" />
      </div>
      <div>
        <Link to="/">
          <MdWindow />
        </Link>
        <Link to="/movies">
          <MdLocalMovies />
        </Link>
        <Link to="/tvshows">
          <GiTv />
        </Link>
        <Link to="/bookmarks">
          <FaBookmark />
        </Link>
      </div>
      <div>
        <Link to="">
          <FaUserCircle />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
