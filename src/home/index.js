import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPopularMovies } from "../store";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const HomeComponent = () => {
  const movies = useSelector((state) => state.bingeit.movies);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies());
  }, []);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4
  };
  return (
    <>
      <div className="slider-wrapper">
        <h2 className="text-white">Popular</h2>
        <Slider {...settings}>
         
          {movies.map((movie) => (
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ height: "250px", width: "200px" }} // Set the height and width of the image
              />
              </div>
          ))}
          
        </Slider>
      </div>
    </>
  );
};

export default HomeComponent;
