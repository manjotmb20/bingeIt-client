import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const SliderComponent = ({movies}) => {
  const settings = {
    focusOnSelect: true,
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="slider-wrapper">
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

export default SliderComponent;
