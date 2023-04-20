import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularRate from "./CircularRate";
import { useSelector } from "react-redux";


const MediaItem = ({ media, mediaType }) => {

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);
      console.log(mediaType)
      console.log(media)


  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setPosterPath(`url(https://image.tmdb.org/t/p/w500/${(media.poster_path || media.backdrop_path || media.mediaPoster || media.profile_path)})`);

    setReleaseDate(media.release_date && media.release_date.split("-")[0] || media.first_air_date && media.first_air_date.split("-")[0])


    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);


  console.log(posterPath)
  console.log(title)
    console.log(releaseDate)
    console.log(rate)

  return (

        <Link to={mediaType !== "people" ? `/details/${media.id}` : `/person/${media.id}`}>

          <Box sx={{
            position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "darkgrey",
          backgroundImage: posterPath,
            paddingTop: "160%",
            "&:hover .media-info": { opacity: 1, bottom: 0 },
            "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
            color: "primary.contrastText"
          }}>
                  {/* movie or tv item */}

                   {mediaType !== "people" && (
                  <>
                  {/* check for favourite pending */}

                  <FavoriteIcon
                  color="primary"
                                  sx={{
                                    position: "absolute",
                                    top: 2,
                                    right: 2,
                                    fontSize: "2rem"
                                  }}
                                />

                  <Box className="media-back-drop" sx={{
              opacity: { xs: 1, md: 0 },
              transition: "all 0.3s ease",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
            }} />
            <Button
              className="media-play-btn"
              variant="contained"
              startIcon={<PlayArrowIcon />}
              sx={{
                display: { xs: "none", md: "flex" },
                opacity: 0,
                transition: "all 0.3s ease",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                "& .MuiButton-startIcon": { marginRight: "-4px" }
              }}
                        />
                    <Box
              className="media-info"
              sx={{
                transition: "all 0.3s ease",
                opacity: { xs: 1, md: 0 },
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                width: "100%",
                height: "max-content",
                boxSizing: "border-box",
                padding: { xs: "10px", md: "2rem 1rem" }
              }}
            >
            <Stack spacing={{ xs: 1, md: 2 }}>
                            {rate && <CircularRate value={rate} />}

                            <Typography>{releaseDate}</Typography>

                            <Typography
                              variant="body1"
                              fontWeight="700"
                              sx={{
                                fontSize: "1rem",
                                textAlign: "left",
                                      display: "-webkit-box",
                                      overflow: "hidden",
                                      WebkitBoxOrient: "vertical",
                                      WebkitLineClamp: 1
                              }}
                            >
                              {title}
                            </Typography>
                          </Stack>
                        </Box>


                  </>

                  )}
                  {/* movie or tv item */}



                  {/* people */}
                    {mediaType === "people" && (

                            <Box sx={{
                              position: "absolute",
                              width: "100%",
                              height: "max-content",
                              bottom: 0,
                              padding: "10px",
                              backgroundColor: "rgba(0,0,0,0.6)"
                            }}>
                              <Typography sx={{ textAlign: "left",
                                                      display: "-webkit-box",
                                                      overflow: "hidden",
                                                      WebkitBoxOrient: "vertical",
                                                      WebkitLineClamp: 1 }}>
                                {media.name}
                              </Typography>
                            </Box>

                  )}
                  {/* people */}



          </Box>

        </Link>

  );
};

export default MediaItem;