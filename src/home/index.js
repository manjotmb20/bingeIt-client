import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPopularMovies, getLatest, getTrailer, getTrendingThisWeek, getTopTVShows } from "../store";
import SliderComponent from "./SliderComponent";
import "./index.css"; //kaizer

const HomeComponent = () => {
  const dispatch = useDispatch();
  const latestMovie = useSelector((state) => state.bingeit.latest);
  const trailer = useSelector((state) => state.bingeit.trailer);
  const latestMovieLoaded = useSelector((state) => state.bingeit.trailerLoaded);
  const popularmovies = useSelector((state) => state.bingeit.popularmovies);
  const trending = useSelector((state) => state.bingeit.trending);
  const tvshows = useSelector((state) => state.bingeit.tvshows);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getLatest());
    dispatch(getPopularMovies());
    dispatch(getTrendingThisWeek());
    dispatch(getTopTVShows());
  }, [latestMovie]);

  useEffect(() => {
    dispatch(getTrailer(latestMovie.id));
  }, [latestMovieLoaded, latestMovie]);
  return (
    <div className="home-slider">
      {user && (
        <h2 className="text-white">Hello {user.username},</h2>
      )}
      {latestMovieLoaded && (
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
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}
      <h2 className="text-white">What's Popular</h2>
      <SliderComponent movies={popularmovies} />
      <h2 className="text-white">Trending This Week</h2>
      <SliderComponent movies={trending} />
      <h2 className="text-white">Top Rated TV Shows</h2>
      <SliderComponent movies={tvshows} />
    </div>
  );
};

export default HomeComponent;
