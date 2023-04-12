import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPopularMovies } from "../store";
import SliderComponent from "./SliderComponent";
import SimpleSliderComponent from "./SimpleSliderComponent"
import "./index.css";

const HomeComponent = () => {
  const popularmovies = useSelector((state) => state.bingeit.popularmovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies());
  }, []);

  return (
    <div className="home-slider">
      <SimpleSliderComponent movies={popularmovies}/>
      <h2 className="text-white">What's Popular</h2>
      <SliderComponent movies={popularmovies} />
      <h2 className="text-white">Trending This Week</h2>
      <SliderComponent movies={popularmovies} />
      <h2 className="text-white">Top 10 TV Shows Today</h2>
      <SliderComponent movies={popularmovies} numbering={true}/>
      <h2 className="text-white">New Releases</h2>
      <SliderComponent movies={popularmovies} />
      <h2 className="text-white">My List</h2>
      <SliderComponent movies={popularmovies} />
      <h2 className="text-white">Action & Adventure</h2>
      <SliderComponent movies={popularmovies} />
      <h2 className="text-white">Romantic Favorites</h2>
      <SliderComponent movies={popularmovies} />
    </div>
  );
};

export default HomeComponent;
