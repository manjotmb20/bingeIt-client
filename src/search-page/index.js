import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import "./index.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const query = searchParams.get("query"); 
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&query=${query}`)
    .then((res) => res.json())
    .then((data) => {
        setSearchResults(data.results)
    });
  }, []);
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
