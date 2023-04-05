import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell,faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
const NavigationBar = () => {
  return (
    <div className="navbar_main">
      <div className="netflix_logo">
        <img
          src="https://thewhitonline.com/wp-content/uploads/2020/09/netflix-logo.png"
          alt="neflix_logo"
          height="60px"
        ></img>
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
        <FontAwesomeIcon icon={faSearch} className="icon"/>
        <FontAwesomeIcon icon={faBell} className="icon"/>
        <FontAwesomeIcon icon={faUserCircle} className="icon"/>
      </div>
    </div>
  );
};
export default NavigationBar;
