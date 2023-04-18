import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getSearchResults } from "../store";
import "./index.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Handle search logic here
    console.log("hey")
    dispatch(getSearchResults(query));
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Titles, people, genres"
          value={query}
          onChange={handleQueryChange}
          className="search-input"
        />
        <Link to={`/search`} className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </Link>
      </div>
    </form>
  );
};

export default SearchBar;
