import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

const SearchPage = () => {
  const searchResults = useSelector((state) => state.bingeit.searchResults);
  console.log(searchResults)
  return (
    <div className="search-page">
        <h2 className="movie-title">hi</h2>
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

export default SearchPage;
