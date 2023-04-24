import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import SearchBar from "./search-bar";
import { NotificationDropdown } from "../dropdown-bar/notification";
import ProfileDropdown from "../dropdown-bar/profile";
import { profiles, notifications } from "../data";

const NavigationBar = () => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handleBellIconClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const handleUserIconClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleTVShowsClick = () => {
    const query = "tv"
    const searchParams = new URLSearchParams({ query });
    navigate(`/browse?${searchParams.toString()}`);
  };

  const handleMoviesClick = () => {
    const query = "movie"
    const searchParams = new URLSearchParams({ query });
    navigate(`/browse?${searchParams.toString()}`);
  };

  const handleNewsClick = () => {
    const query = "collection"
    const searchParams = new URLSearchParams({ query });
    navigate(`/browse?${searchParams.toString()}`);
  };

  const handleMyListClick = () => {
    navigate("/favorites");
  };

  const handleProviderList = () => {
    navigate("/provider");
  };

  return (
    <div className="navbar_main">
      <div className="netflix_logo">
        <img src="../images/logo.png" alt="neflix_logo" height="60px"></img>
      </div>
      <div className="nav_items">
        <div className="item" onClick={handleHomeClick}>
          Home
        </div>
        <div className="item" onClick={handleTVShowsClick}>
          TV Shows
        </div>
        <div className="item" onClick={handleMoviesClick}>
          Movies
        </div>
        <div className="item" onClick={handleNewsClick}>
          News &amp; Popular
        </div>
        <div className="item" onClick={handleMyListClick}>
          My Favorites
        </div>
        {user.type === "PROVIDER" && (
          <div className="item" onClick={handleProviderList}>
            Provider List
          </div>
        )}
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
        <FontAwesomeIcon
          icon={faBell}
          className="icon"
          onClick={handleBellIconClick}
        />
        {showNotificationDropdown && (
          <NotificationDropdown notifications={notifications} />
        )}
        <FontAwesomeIcon
          icon={faUserCircle}
          className="icon"
          onClick={handleUserIconClick}
        />
        {showProfileDropdown && <ProfileDropdown profiles={profiles} />}
      </div>
    </div>
  );
};
export default NavigationBar;
