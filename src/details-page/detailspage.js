import React from 'react';
import {useEffect, useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import './movie.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import  { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { CircularProgress } from "@mui/material";
import CircularRate from "./CircularRate";



import CastSlide from "./CastSlide";
import Container from "./Container";
import RecommendSlide from "./RecommendSlide";


import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";


const Movie = () => {

    const [media, setMovie] = useState()
    const [trailer, setTrailer] = useState(null);
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    const [genres, setGenres] = useState([]);
    const [onRequest, setOnRequest] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [casts, setCasts] = useState([]);
    const videoRef = useRef(null);

    const [recommendations, setRecommendations] = useState([]);










    const { id } = useParams()

    console.log(id)
    console.log(media)


    useEffect(() => {
            getData()
            getTrailer();
            getGenres();
            getCasts();
            getRecommendations();
            window.scrollTo(0,0)
        }, [id])


   const getRecommendations = () => {

        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=8ed01ac7fe8bdfc25206f1bcbd4d22ab`)
                                    .then((res) => res.json())
                                    .then((data) => {
                                        const recommendations = data.results.splice(0, 10);
                                        console.log(recommendations)

                                        setRecommendations(recommendations);
                                    } );
   }

   const getGenres = () => {

            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=8ed01ac7fe8bdfc25206f1bcbd4d22ab`)
                            .then((res) => res.json())
                            .then((data) => {
                                const genres = data.genres.splice(0, 3);

                                setGenres(genres);
                            });
   }

   console.log("dsddssd")
       console.log(recommendations.length)

   console.log(genres)



   const getCasts = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=8ed01ac7fe8bdfc25206f1bcbd4d22ab`)
                               .then((res) => res.json())
                               .then((data) => {
                                      const casts = data.cast.splice(0, 10);

                                      setCasts(casts);
                               } );
   }



    const getTrailer = () => {
            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=8ed01ac7fe8bdfc25206f1bcbd4d22ab`)
                .then((res) => res.json())
                .then((data) => {
                    const ytTrailer = data.results.find(
                        (video) => video.site === 'YouTube' && video.type === 'Trailer'
                    );
                    if (ytTrailer) {
                        setTrailer(ytTrailer.key);
                    }
                });
        };

    const playTrailer = () => {
            if (trailer) {
                setShowTrailerModal(true);
            }
        };

    const getData = () => {
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=8ed01ac7fe8bdfc25206f1bcbd4d22ab`)
            .then(res => res.json())
            .then(data => setMovie(data))
        }

   return (
       <>
         {media ? (
           <>
           <Box sx={{
                 zIndex: "-1",
                 position: "relative",
                 paddingTop: { xs: "60%", sm: "40%", md: "35%" },
                 backgroundPosition: "top",
                 backgroundSize: "cover",
                 backgroundImage: `url(https://image.tmdb.org/t/p/original/${( media.backdrop_path || media.poster_path)})`,
                 backgroundAttachment: "fixed",
                 "&::after": {
                   content: '""',
                   position: "absolute",
                   left: 0,
                   bottom: 0,
                   width: "100%",
                   height: "100%",
                   pointerEvents: "none",
                   backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
                 }
               }} />
               <Box sx={{
                         color: "primary.contrastText",
                         maxWidth: "1366px",
                               margin: "auto",
                               padding: 2
                       }}>
                        {/* media content */}
              <Box sx={{
              marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" }
              }}>
            <Box sx={{
                          display: "flex",
                          flexDirection: { md: "row", xs: "column" }
                        }}>

            {/* poster */}
                          <Box sx={{
                            width: { xs: "70%", sm: "50%", md: "40%" },
                            margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
                          }}>
                          <Box sx={{
                                            paddingTop: "140%",
                                            position: "relative",
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center",
                                                  backgroundColor: "darkgrey",
                                                  backgroundImage: `url(https://image.tmdb.org/t/p/original//${(media.poster_path || media.backdrop_path)})`,
                                          }} />
                          </Box>
                         {/* poster */}
                         {/* media info */}
                         {/* media info */}
                          <Box sx={{
                            width: { xs: "100%", md: "60%" },
                            color: "text.primary"
                          }}>
                          {/* title */}
                          <Stack spacing={5}>
                  {/* title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                    fontWeight="700"
                    sx={{ textAlign: "left" || "justify",
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                color: "primary.contrastText" }}
                  >
                    {`${media.title || media.name} ${media.release_date.split("-")[0]}`}
                  </Typography>
                  {/* title */}

                  {/* rate and genres */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rate */}
                    <CircularRate value={media.vote_average} />
                    {/* rate */}
                    <Divider orientation="vertical" />
                    {/* genres */}
                    {genres.map((genre, index) => (
                      <Chip
                        label={genre.name}
                        variant="filled"
                        color="primary"
                        key={index}
                      />
                    ))}
                    {/* genres */}
                  </Stack>
                  {/* rate and genres */}

                   {/* overview */}
                  <Typography
                    variant="body1"
                    fontSize={{ xs: "1rem", md: "1rem", lg: "1.5rem" }}
                    marginY={2}
                    sx={{ textAlign: "justify",
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 5,
                                 color: "primary.contrastText"}}
                  >
                    {media.overview}
                  </Typography>
                  {/* overview */}

                   {/* buttons */}
                  <Stack direction="row" spacing={1}>
                    <LoadingButton
                      variant="text"
                      sx={{
                        width: "max-content",
                        "& .MuiButon-starIcon": { marginRight: "0" }
                      }}
                      size="large"
                      startIcon={<FavoriteBorderOutlinedIcon /> }
                      loadingPosition="start"
                      loading={onRequest}

                    />
                    <Button
                      variant="contained"
                      sx={{ width: "max-content" }}
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      onClick={playTrailer}
                    >
                      Watch now
                    </Button>
                  </Stack>
                  {/* buttons */}

                  {/* cast */}
                <Container header="Cast">
                  <CastSlide casts={casts} />
                </Container>
                {/* cast */}

                  </Stack>

                          </Box>
                          {/* media info */}
                          </Box>
                          </Box>
                          {/* media content */}

                          {/* media recommendation */}
                      <Container header="you may also like">
                                  {recommendations.length > 0 && (
                                    <RecommendSlide medias={recommendations} mediaType={"movie"} />
                                  )}



                  </Container>
                  {/* media recommendation */}


                          </Box>


             <div>
               <h1 className="movie-title">{media.title}</h1>
             </div>
           </>
         ) : null}
       </>
     );
   };

export default Movie;