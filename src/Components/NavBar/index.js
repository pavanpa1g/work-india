import React, { useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import "./index.css";
import { setSearchInput, setSlider } from "../../store/features/searchSlice";
import { navLinksData } from "../../helper/data";


const NavBar = () => {
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const router = useNavigate()

  const dispatch = useDispatch();

  const handleSearchClick = () => {
    dispatch(setSearchInput(inputValue));
  };

  const handleKeyDownEnter = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <nav className="nav-bg-container">
      <h1 className="movie-head" onClick={() => router("/")}>
        MovieDb
      </h1>
      <ul className="nav-ul-container">
        {navLinksData.map((data) => {
          return (
            <li key={data.link}>
              <Link
                to={data.link}
                className={`link ${
                  location.pathname === data.link ? "active" : ""
                }`}
              >
                {data.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="input-container">
        <input
          type="search"
          placeholder="Search"
          className="search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDownEnter}
        />
        <button className="search-icon-button" onClick={handleSearchClick}>
          <IoIosSearch color="#000" className="search-icon" size={18} />
        </button>
      </div>

      <button onClick={handleSearchClick} className="search-button">
        Search
      </button>

      <GiHamburgerMenu
        className="hamburger"
        color="#000"
        size={30}
        onClick={() => dispatch(setSlider())}
      />
    </nav>
  );
};

export default NavBar;
