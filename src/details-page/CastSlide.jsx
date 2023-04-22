import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';


const CastSlide = ({ casts }) => {
  return (
    <Box sx={{
      "& .swiper-slide": {
        width: { xs: "50%", md: "25%", lg: "20.5%" },
        color: "primary.contrastText"
      }
    }}>
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={`/person/${cast.id}`}>
              <Box sx={{
                paddingTop: "120%",
                color: "text.primary",
                position: "relative",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "darkgrey",
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${cast.profile_path})`
              }}>
                <Box sx={{
                  position: "absolute",
                  width: "100%",
                  height: "max-content",
                  bottom: 0,
                  padding: "10px",
                  backgroundColor: "rgba(0,0,0,0.6)"
                }}>
                  <Typography sx={{textAlign: "left",
                                         display: "-webkit-box",
                                         overflow: "hidden",
                                         color: "white",
                                         WebkitBoxOrient: "vertical",
                                         WebkitLineClamp: 1}}>
                    {cast.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;