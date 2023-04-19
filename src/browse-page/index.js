import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./index.css";

const BrowsePage = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState([]);
  const query = searchParams.get("query");
  const NORMAL = `https://api.themoviedb.org/3/${query}/top_rated?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&language=en-US`
  const COLLECTIONS =  `https://api.themoviedb.org/3/search/multi?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&query=${query}`
  const API = query === "collection" ? COLLECTIONS : NORMAL
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSearchResults(data.results.filter((movie) => movie.poster_path));
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/keyword?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchKeywords(data.results);
      });
  }, []);

  return (
    <div className="search-page">
      {searchKeywords.length > 0 && (
        <div className="search-keywords">
          Explore titles related to:{" "} 
          {searchKeywords.map((keyword, index) => (
            <span key={index}>
              {keyword.name}
              {index !== searchKeywords.length - 1 && " | "}
            </span>
          ))}
        </div>
      )}
      <div className="movie-grid">
        {searchResults.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h2 className="movie-title">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;
