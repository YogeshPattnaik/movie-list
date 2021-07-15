import React from "react";
import image from "../images/favicon.jpg";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  console.log("movies:", props.movies);
  // const setPlay = props.setPlay

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="col-4 text-center p-3">
          <div
            className="image-container d-flex justify-content-start text-align-center"
            key={movie.id}
            style={{ padding: 0 }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movie"
              style={{ width: "100%" }}
            ></img>

            <div
              className="overlay d-flex"
              style={{ justifyContent: "space-between" }}
            >
              <div onClick={() => props.handleFavouritesClick(movie)}>
                <FavouriteComponent movieName={movie.title} />
              </div>
              <button className="button" onClick={() => props.setPlay(true)}>
                Preview
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
