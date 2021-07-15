import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import ReactHlsPlayer from 'react-hls-player';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
  const [play, setPlay] = useState(false)
  // console.log('movies:', movies);

	const getMovieRequest = async (searchValue) => {
		const url = `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1`;
		const response = await fetch(url);
		const responseJson = await response.json();
    // console.log('res:', responseJson.results);
    setMovies(responseJson.results)
	};

	useEffect(() => {
		getMovieRequest();
	}, []);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('favourite-movie')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('favourite-movie', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
    console.log('working')
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== movie.id
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
    <>
      {play && 
      <ReactHlsPlayer
        src="https://content.jwplatform.com/manifests/yp34SRmf.m3u8"
        autoPlay={play}
        controls={true}
        width="100%"
        height="auto"
      />
      }
      <div className='container movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Movies' />
        </div>
        <div className='row d-flex'>
          <MovieList
            movies={movies}
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={AddFavourites}
            setPlay={setPlay}
          />
        </div>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Favourites' />
        </div>
        {favourites.length !== 0 && 
          <div className='row'>
            <MovieList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites}
              setPlay={setPlay}
            />
          </div>
        }
        
      </div>
    </>
	);
};

export default App;
