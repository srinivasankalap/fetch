import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies]= useState([]);
  const [isLoading, setIsLoading]=useState(false);

  async function fetchHandler(){
    setIsLoading(true);
    const response= await fetch('https://swapi.dev/api/films/');
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
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
