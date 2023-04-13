import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPopularMovies, getLatest } from "../store";
import SliderComponent from "./SliderComponent";
import "./index.css";

const HomeComponent = () => {
  const popularmovies = useSelector((state) => state.bingeit.popularmovies);
  const dispatch = useDispatch();
  const latestMovie = useSelector((state) => state.bingeit.latest);
  const [trailer, setTrailer] = useState(null);
  const getTrailer = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${latestMovie.id}/videos?api_key=8ed01ac7fe8bdfc25206f1bcbd4d22ab`
    )
      .then((res) => res.json())
      .then((data) => {
        const ytTrailer = data.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        if (ytTrailer) {
          setTrailer(ytTrailer.key);
        }
      });
  };
  useEffect(() => {
    dispatch(getLatest());
    getTrailer();
    dispatch(getPopularMovies());
  }, [latestMovie,trailer]);
  return (
    <div className="home-slider">
      {latestMovie && (
        <div className="video-container">
          <div className="buttons-container">
            <a href="/play" className="play-button">
              <i className="fas fa-play"></i> Play
            </a>
            <a href="/info" className="info-button">
              <i className="fas fa-info-circle"></i> Info
            </a>
          </div>
          <iframe
            title="trailer"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}
      <h2 className="text-white">What's Popular</h2>
      <SliderComponent movies={popularmovies} />
      <h2 className="text-white">Trending This Week</h2>
      <SliderComponent movies={popularmovies} />
      <h2 className="text-white">Top 10 TV Shows Today</h2>
      <SliderComponent movies={popularmovies} />
      <h2 className="text-white">My List</h2>
      <SliderComponent movies={popularmovies} />
    </div>
  );
};

export default HomeComponent;
