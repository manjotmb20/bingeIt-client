import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import SearchBar from "./search-bar";
const NavigationBar = () => {
  const [showSearchBox, setShowSearchBox] = useState(false);

  const handleSearchIconClick = () => {
    setShowSearchBox(!showSearchBox);
  };

  return (
    <div className="navbar_main">
      <div className="netflix_logo">
        <img src="../images/logo.png" alt="neflix_logo" height="60px"></img>
      </div>
      <div className="nav_items">
        <div className="item">Home</div>
        <div className="item">TV Shows</div>
        <div className="item">Movies</div>
        <div className="item">News & Popular</div>
        <div className="item">My List</div>
        <div className="item">Browse by Languages</div>
      </div>
      <div className="right-icons">
        {!showSearchBox && (
          <FontAwesomeIcon
            icon={faSearch}
            className="icon"
            onClick={handleSearchIconClick}
          />
        )}
        {showSearchBox && <SearchBar />}
        <FontAwesomeIcon icon={faBell} className="icon" />
        <FontAwesomeIcon icon={faUserCircle} className="icon" />
      </div>
    </div>
  );
};
export default NavigationBar;
