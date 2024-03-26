import React from 'react';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/* <div className="container mx-auto mt-8 py-14">
        <h1 className="text-3xl font-bold mb-4">Now Playing</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-700">{movie.overview}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600">{movie.release_date}</span>
                  <span className="text-gray-600">{movie.vote_average}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Browse;
