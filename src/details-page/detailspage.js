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
import queryString from "query-string";
import { toast } from "react-toastify";


import YouTube from 'react-youtube';

import { addFavorite, removeFavorite } from "./userSlice";
import CastSlide from "./CastSlide";
import Container from "./Container";
import RecommendSlide from "./RecommendSlide";
import MediaReview from "./MediaReview";
import favoriteApi from "./api/favorite.api";

import mediaApi from "./api/media.api";
import reviewApi from "./api/review.api";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Dialog, Stack, Typography } from "@mui/material";


const Movie = () => {



    const newUser = {
            displayName: "manjot1111",
            id: "643d9a4bc7505a8c239555c6",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjQzZDlhNGJjNzUwNWE4YzIzOTU1NWM2IiwiaWF0IjoxNjgxNzY3ODQyLCJleHAiOjE2ODE4NTQyNDJ9.KYczeUXCdTDKpuaM4e2M00E-4YpgbEOaIykMCNZroGU",
            username: "manjot1111",
            _id: "643d9a4bc7505a8c239555c6",
          };

        const [user, setUser] = useState(newUser);

            console.log("user")
            console.log(user)

            const [listFavorites,setFavourites] = useState([])




    const [media, setMovie] = useState()
    const [trailer, setTrailer] = useState(null);
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    const [genres, setGenres] = useState([]);
    const [onRequest, setOnRequest] = useState(false);
    const [showVideo, setShowVideo] = useState(false);


    const [isFavorite, setIsFavorite] = useState(false);
    const [casts, setCasts] = useState([]);
    const videoRef = useRef(null);

    const [recommendations, setRecommendations] = useState([]);

    const [reviews, setReviews] = useState();

      const dispatch = useDispatch();



    const { id } = useParams()

    const mediaType = "movie";

    console.log("id-video")
    console.log(videoRef)











    useEffect(() => {



            window.scrollTo(0,0)
            const getMedia = async () => {

                  const { response, err } = await mediaApi.getDetail({ mediaType, id });


                  if (err) {
                  console.log("err");
                  }

                  if (response) {

                            console.log("MediaDetail : " , response);

                    setMovie(response);
                    setIsFavorite(response.isFavorite);
                    setGenres(response.genres.splice(0, 2));
                  }

                  if (err) toast.error(err.message);
                };


                const getReviews = async () => {

                    console.log("reviews")
                    console.log(id)
                    const { response, err } = await mediaApi.getReviews({ mediaType, id });
                    console.log("reviews",response)
                    if (err) toast.error(err.message);
                    if (response) setReviews(response);
                }

                const getRecommendations = async () => {
                    const { response, err } = await mediaApi.getRecommendations({ mediaType, id });
                    if (err) toast.error(err.message);
                    if (response) setRecommendations(response);
                }

                const getCasts = async () => {
                    const { response, err } = await mediaApi.getCredits({ mediaType, id });
                    if (err) toast.error(err.message);
                    if (response) setCasts(response.cast);
                }

                const getTrailer = async () => {
                    const { response, err } = await mediaApi.getVideos({ mediaType, id });

                    const ytTrailer = response.results.find(
                                            (video) => video.site === 'YouTube' && video.type === 'Trailer'
                                        );
                                        if (ytTrailer) {
                                            setTrailer(ytTrailer.key);
                                        }
                    if (err) toast.error(err.message);
                }

            window.scrollTo(0, 0);
            getMedia();
            getTrailer();
            getCasts();
            getRecommendations();
            getReviews();

        }, [id, dispatch])





        try {
        console.log("media1234",trailer)
        } catch (error) {


        }
        console.log("user: ", user)







        const onFavoriteClick = async () => {


           if (!user) {

                console.log("Please login to add favorite");
                return;

           }
           console.log("onrequest: ", onRequest)

            if (onRequest) return;

            if (isFavorite) {
              onRemoveFavorite();
              return;
            }

            setOnRequest(true);

            console.log("onrequest: ", onRequest)


            const body = {
              mediaId: media.id,
              mediaTitle: media.title || media.name,
              mediaType: mediaType,
              mediaPoster: media.poster_path,
              mediaRate: media.vote_average
            };

            const { response, err } = await favoriteApi.add(body);

            console.log("in favorite")


            setOnRequest(false);

            if (err) toast.error(err.message);
            if (response) {


              dispatch(addFavorite(response));
              setIsFavorite(true);
              console.log("Add favorite success");
            }
          };

            console.log("onrequest2: ", isFavorite)

            console.log("onrequest1: ", listFavorites)


          const onRemoveFavorite = async () => {


                              setIsFavorite(false);

//              if (onRequest) return;
//              setOnRequest(true);
//
//              const favorite = listFavorites.find(e => e.mediaId.toString() === media.id.toString());
//
//
//              const { response, err } = await favoriteApi.remove({ favoriteId: favorite.id });
//
//              setOnRequest(false);
//
//              if (err) toast.error(err.message);
//              if (response) {
//                dispatch(removeFavorite(favorite));
//                setIsFavorite(false);
//                toast.success("Remove favorite success");
//              }
            };





   console.log(reviews)
           console.log("Genres: ", genres);





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

        const handleClose = () => {
            setShowVideo(false);
          };






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
                    {media.genres && media.genres ? (media.genres.map((genre, index) => (
                      <Chip
                        label={genre.name}
                        variant="filled"
                        color="primary"
                        key={index}
                      />
                    ))) : null}
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
                    startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onFavoriteClick}

                    />
                     <Button
                              variant="contained"
                              sx={{ width: 'max-content' }}
                              size="large"
                              startIcon={<PlayArrowIcon />}
                              onClick={() => setShowVideo(!showVideo)}
                            >
                              Watch now
                            </Button>
                  </Stack>
                  {showVideo && trailer && (
                          <YouTube
                            videoId={trailer}
                            opts={{
                              height: '390',
                              width: '640',
                              playerVars: {
                                autoplay: 1,
                              },
                            }}
                          />
                        )}
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

                        {/* media reviews */}
                        {
                          reviews && reviews ? (
                            <MediaReview reviews={reviews.results} media={media} mediaType={"movie"} />
                          ) : null
                        }
                        {/* media reviews */}

                          {/* media recommendation */}
                      {
                        media && media.recommend && media.recommend.length > 0 ? (
                          <Container header="you may also like">
                            <RecommendSlide medias={media.recommend} mediaType={"movie"} />
                          </Container>
                        ) : null
                      }

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