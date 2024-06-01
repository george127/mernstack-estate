import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <h1 className="logo">
            <span className="text-rose-200">Mern</span>
            <span className="">Estate</span>
          </h1>
        </Link>
        <form className="forms-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type to search..."
            className="input bg-rose-200" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
          <span className="material-symbols-outlined">search</span>
          </button>
        </form>
        <ul className="link-container">
          <Link to="/"> 
            <li className="nav-item text-red-200">
              <p className="nav-link">Home</p>
            </li>
          </Link>

          <Link to="/about">
            <li className="nav-item text-red-200">
              <p className="nav-link">About</p>
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img className="Image" src={currentUser.avatar} alt="profile" />
            ) : (
              <li className="nav-item text-red-200">
                <p className="nav-link">Sign In</p>
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
