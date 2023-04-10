import React from 'react';
import {useEffect, useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import './movie.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';



const Movie = () => {

    const [currentMovieDetail, setMovie] = useState()
    const [trailer, setTrailer] = useState(null);
    const [showTrailerModal, setShowTrailerModal] = useState(false);

    const { id } = useParams()

    console.log(id)
    console.log(currentMovieDetail)

    useEffect(() => {
            getData()
            getTrailer();
            window.scrollTo(0,0)
        }, [])

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

   <div className="movie">
                   <div className="movie__intro">
                       <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
                   </div>
                   <div className="movie__detail">
                       <div className="movie__detailLeft">
                           <div className="movie__posterBox">
                               <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                           </div>
                       </div>
                       <div className="movie__detailRight">
                           <div className="movie__detailRightTop">
                               <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                               <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                               <div className="movie__rating">
                                   {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                                   <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                               </div>
                               <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                               <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                               <div className="movie__genres">
                                   {
                                       currentMovieDetail && currentMovieDetail.genres
                                       ?
                                       currentMovieDetail.genres.map(genre => (
                                           <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                       ))
                                       :
                                       ""
                                   }
                               </div>
                           </div>
                           <div className="movie__detailRightBottom">
                               <div className="synopsisText">Synopsis</div>
                               <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                               <br></br>
                                   <div className="movie__buttons">

                               <button className="movie__trailerButton movie__Button" onClick={playTrailer}>
                                                  <FontAwesomeIcon icon={faPlay} className="movie__playIcon" />
                                                    Trailer
                                               </button>
                       <button className="movie__trailerButton movie__Button" onClick={playTrailer}>
                                                                         <FontAwesomeIcon icon={faPlay} className="movie__playIcon" />
                                                                           Watch Now
                                                                      </button>

                              </div>
                                           </div>
                                           <div
                                               className="trailerModal"
                                               style={{
                                                   display: showTrailerModal ? 'block' : 'none',
                                                   position: 'fixed',
                                                   top: 0,
                                                   left: 0,
                                                   width: '100%',
                                                   height: '100%',
                                                   backgroundColor: 'rgba(0,0,0,0.8)',
                                                   zIndex: 1000,
                                               }}
                                               onClick={() => setShowTrailerModal(false)}
                                           >
                                               <div
                                                   style={{
                                                       width: '80%',
                                                       maxWidth: '800px',
                                                       height: '80%',
                                                       margin: '5% auto',
                                                       position: 'relative',
                                                   }}
                                               >
                                                   <iframe
                                                       title="trailer"
                                                       width="100%"
                                                       height="100%"
                                                       src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
                                                       frameBorder="0"
                                                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                       allowFullScreen
                                                   ></iframe>
                                               </div>

                           </div>

                       </div>
                   </div>
                   <div className="movie__links">
                       <div className="movie__heading">Useful Links</div>

                   </div>
                   <div className="movie__heading">Production companies</div>
                   <div className="movie__production">
                       {
                           currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                               <>
                                   {
                                       company.logo_path
                                       &&
                                       <span className="productionCompanyImage">
                                           <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                           <span>{company.name}</span>
                                       </span>
                                   }
                               </>
                           ))
                       }
                   </div>
               </div>



    );
};

export default Movie;