import React from 'react'
import Search from './components/Search'
import { useState, useEffect } from 'react'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { updateSearchCount } from './appwrite';
import { getTrendingMovies } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
}

export const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 1000, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (data.response === 'False') {
        setErrorMessage(data.Error || 'Error fetching movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
        await loadTrendingMovies();
      }
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error loading trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <>
      <main>
        <div className='pattern' />
        <div className='wrapper'>
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1} </p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className='all-movies'>
            <h2>All Movies</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <footer className="footer text-center text-white">
        <p style={{ display: 'inline-flex', alignItems: 'center' }}>
          This product uses the
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <img
              src="/tmdb_logo.svg"
              alt="TMDB Logo"
              style={{
                height: '1em',
                verticalAlign: 'middle',
                marginLeft: '0.5em',
                display: 'inline'
              }}
            />
          </a>
          ‎ API but is not endorsed or certified by 
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <img
              src="/tmdb_logo.svg"
              alt="TMDB Logo"
              style={{
                height: '1em',
                verticalAlign: 'middle',
                marginLeft: '0.5em',
                display: 'inline'
              }}
            />
          </a>
        </p>
      </footer>
    </>
  )
}



// import { use, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// const Card = ({title}) => {
//   const[count, setCount] = useState(0);
//   const [hasLiked, setHasLiked] = useState(false);

//   useEffect(() => {
//       if(hasLiked)
//         console.log(`${title} has been liked`);
//       else
//         console.log(`${title} has been unliked`);
//   } , [hasLiked, title]);

//   return (
//     <div className="card" onClick={() => setCount(count + 1)}>
//       <h2>{title} <br /> {count ? count : null}</h2>

//       <button onClick={() => setHasLiked(!hasLiked)}>
//         {hasLiked ? '❤️' : '🤍'}
//       </button>
//     </div>
//   )
// }


// const App = () => {  
//   return (
//     <div className= "card-container">

//       <Card title="Star Wars" rating={5} isCool = {true} actors= {[{name: 'Actors' }]} />
//       <Card title= "Avatar" />
//       <Card title="The Lion King"/>
//     </div>
//   )
// }

export default App

