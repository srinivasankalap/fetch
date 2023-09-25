import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies]= useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [error, setError]=useState(null);

  const fetchHandler=useCallback(async()=>{
    setIsLoading(true);
    setError(null);
    try{
      const response= await fetch('https://swapi.dev/api/films/');
      if (!response.ok){
        throw new Error('Something went wrong.....Retrying');
      }
      const data =await response.json();

      const transformed=data.results.map((movie)=>{
        return {id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date}
      })
      setMovies(transformed);
      setIsLoading(false);
    }
    catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  },[]);
  useEffect(()=>{
    fetchHandler();
  },[fetchHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
