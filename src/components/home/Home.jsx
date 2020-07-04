import React, { useState, useEffect } from 'react'
import {fetchMovies, fetchGenre, fetchMovieByGenre, fetchPersons, fetchTopratedMovie, fetchLatestMovies, fetchPopularMovies, fetchUpcomingMovies, fetchSearch} from '../../service/index';
import RBCarousel from 'react-bootstrap-carousel';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';







export function Home() {
    //folosim use state pt urm variabile unde vom lua datele din api
    const [nowPlaying, setNowPlaying] = useState([]);
    const [latestM, setLatestM] = useState([]);
    const [popularM, setPopularM] = useState([]);
    const [upcomingM, setUpcomingM] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [persons, setPersons] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieGenre, setMovieGenre] = useState([]);
    const [search, setSearch] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };

    useEffect(() => {
        const fetchApi = async () => {
            setNowPlaying(await fetchMovies());
            setLatestM(await fetchLatestMovies());
            setPopularM(await fetchPopularMovies());
            setUpcomingM(await fetchUpcomingMovies());
            setTopRated( await fetchTopratedMovie());
            setPersons(await fetchPersons());
            setGenres(await fetchGenre());
            setMovieGenre(await fetchMovieByGenre(28));
            setSearch(await fetchSearch());
        };

        fetchApi();
    }, []);


    const handleGenreClick = async (genre_id) =>{
        setMovieGenre( await fetchMovieByGenre(genre_id));
    }


    const movies = nowPlaying.slice(5,10).map((item,index) => {
        return(
            <div style={{height: 500, width: "100%"}} key={index} >
                <div className="carousel-center">
                    <img style={{height:600}} src={item.backPoster} alt={item.title} />
                </div>

                <div style={{textAlign:'center',fontSize: 35}} className="carousel-caption">
                    {item.title}
                </div>
            </div>
        )
    })

    const nowPlayingMovies = nowPlaying.slice(0,4).map((item,index) => {
        return(
            <div style={{height: 500, width: "100%"}} key={index} >
                <div className="carousel-center">
                    <img style={{height:600}} src={item.backPoster} alt={item.title} />
                </div>

                <div style={{textAlign:'center',fontSize: 35}} className="carousel-caption">
                    {item.title}
                </div>
            </div>
        )
    })

    const genreList = genres.map((item,index) => {
        return(
            <li className="list-inline-item" key={index}>
                <button type="button" className="btn btn-outline-info" onClick={() => {
                    handleGenreClick(item.id)
                }}>
                    {item.name}
                </button>
            </li>
        )
    })

    const genreMovieList = movieGenre.slice(0,20).map((item, index) => {
        return(
            // <div className="col-md-3 col-sm-6" key={index}>
                <div key={index}>
                {/* <div className="card"> */}
                    <div>
                    <Link to={`/movie/${item.id}`}>
                        <img style={{height:300}} className="img-fluid" src={item.poster} alt={item.title}></img>

                    </Link>
                </div>
                <div className="mt-3">
        <p style={{fontWeight: 'bolder'}}>{item.title}</p>
        <p>Rated: {item.rating}</p>
        <ReactStars count={item.rating} size={20} color1={'#f4c10f'}></ReactStars>
                </div>
            </div>
        )
    })

    const popularMovies = popularM.slice(0,4).map((item,index) => {
        return(
            <div className="col-md-3" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title} />
                    </Link>
                </div>

                <div className="mt-3">
        <p style={{fontWeight: 'bolder'}}>{item.title}</p>
        <p>Rated: {item.rating}</p>
        <ReactStars count={item.rating} size={20} color1={'#f4c10f'}></ReactStars>
                </div>
            </div>
        )
    })

    // const upcomingMovies = upcomingM.slice(0,4).map((item,index) => {
    //     return(
    //         <div className="col-md-3" key={index}>
    //             <div className="card">
    //                 <Link to={`/movie/${item.id}`}>
    //                     <img className="img-fluid" src={item.poster} alt={item.title} />
    //                 </Link>
    //             </div>

    //             <div className="mt-3">
    //     <p style={{fontWeight: 'bolder'}}>{item.title}</p>
    //     <p>Rated: {item.rating}</p>
    //     <ReactStars count={item.rating} size={20} color1={'#f4c10f'}></ReactStars>
    //             </div>
    //         </div>
    //     )
    // })

     const upcomingMovies = upcomingM.slice(0,10).map((item,index) => {
         return(
            <div  key={index}>
                         <div>
                             <Link to={`/movie/${item.id}`}>
                                 <img style={{height: 300, witdh: 100+'%'}} className="img-fluid" src={item.poster} alt={item.title} />
                             </Link>
                         </div>

                         <div className="mt-3">
                 <p style={{fontWeight: 'bolder'}}>{item.title}</p>
                 <p>Rated: {item.rating}</p>
                 <ReactStars count={item.rating} size={20} color1={'#f4c10f'}></ReactStars>
                         </div>
                     </div>


         )
     })

     const topRatedList = topRated.slice(0,10).map((item,index) => {
        return (
            // <div className="col-md-3" key={index}>
                <div key={index}>
                {/* <div className="card"> */}
                    <div>
                    <Link to={`/movie/${item.id}`}>
                        <img style={{height: 300}} className="img-fluid" src={item.poster} alt={item.title} />
                    </Link>
                </div>

                <div className="mt-3">
        <p style={{fontWeight: 'bolder'}}>{item.title}</p>
        <p>Rated: {item.rating}</p>
        <ReactStars count={item.rating} size={20} color1={'#f4c10f'}></ReactStars>
                </div>
            </div>
        )
    })


    const trendingPersons = persons.slice(0,4).map((p,i) => {
        return(
            <div className="col-md-3 text-center" key={i}>
                <img className="img-fluid rounded-circle mx-auto d-block" src={p.profileImg} alt={p.name} />
        <p className="font-weight-bold text-center">{p.name}</p>
        <p className="font-weight-light text-center" style={{color:"5a606b"}}>
            Trending for {p.known}
        </p>

            </div>
        )
    });

    return (
        //returning the carousel on the web page
        //genre button
        //list of filme

    <div>
        {/* <NavBar /> */}


        <div className='container'>
            <div className="row mt-2" >
                <div className="col">
                    <RBCarousel
                    autoplay={true}
                    pauseOnVisibility={true}
                    slideShowSpeed={5000}
                    version={4}
                    indicators={false}
                    >
                        {movies}
                    </RBCarousel>
                </div>
            </div>
        <hr style={{color: '#a8afba',border: 0, height: 1+'px',backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0),rgba(0,0,0,0.75),rgba(0,0,0,0))'}} />


            <div className="row mt-3">
            <div className="col">

                <p className="font-weight-bold" style={{color:'#5a606b'}}>
                    POPULAR MOVIES
                </p>
            </div>
            </div>

            <div className="row mt-3">
                {popularMovies}
            </div>
            <hr style={{color: '#a8afba',border: 0, height: 1+'px',backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0),rgba(0,0,0,0.75),rgba(0,0,0,0))'}} />

            <div className="row mt-3">
            <div className="col">
                <p className="font-weight-bold" style={{color:'#5a606b'}}>
                    TRENDING PERSONS ON THIS WEEK
                </p>
            </div>
        </div>

        <div className="row mt-3">{trendingPersons}</div>





        <hr style={{color: '#a8afba',border: 0, height: 1+'px',backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0),rgba(0,0,0,0.75),rgba(0,0,0,0))'}} />
            <div className="row mt-3">
            <div className="col">

                <p className="font-weight-bold" style={{color:'#5a606b'}}>
                    UPCOMING MOVIES
                </p>
            </div>
            </div>

            {/* <div className="row mt-3"> */}
                <div >

            <Slider {...settings}>
                        {upcomingMovies}
                        </Slider>

            </div>

            <hr style={{color: '#a8afba',border: 0, height: 1+'px',backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0),rgba(0,0,0,0.75),rgba(0,0,0,0))'}} />

            <div className="row mt-3">
            <div className="col">

                <p className="font-weight-bold" style={{color:'#5a606b'}}>
                    TOP RATED MOVIES
                </p>
            </div>
            </div>

            {/* <div className="row mt-3"> */}
                <div >

            <Slider {...settings}>
                        {topRatedList}
                        </Slider>
            </div>
            <hr style={{color: '#a8afba',border: 0, height: 1+'px',backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0),rgba(0,0,0,0.75),rgba(0,0,0,0))'}} />
            <p></p>


            <div className="row mt-3">
            <div className="col">

                <p className="font-weight-bold" style={{color:'#5a606b'}}>
                    BROWSE MOVIES BY GENRE
                </p>
            </div>
            </div>
            <div className="row mt-3">
                <div className="cel">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            <div>
            <Slider {...settings}>
            {genreMovieList}
            </Slider>
        </div>


            </div>
    </div>


    )
}