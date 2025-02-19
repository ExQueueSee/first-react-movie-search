import React from 'react'

const MovieCard = ({ movie:
  { id,imdb_id, title, vote_average, poster_path, release_date, original_language } }) => {
  
  const tmdbUrl = `https://www.themoviedb.org/movie/${id}`;
  const imdbUrl = `https://www.imdb.com/title/${imdb_id}`;

  return (
    <div className="movie-card">
      <a href={tmdbUrl} target="_blank" rel="noopener noreferrer">
        <img
          className="movie-poster"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : `public/no-movie.png`
          }
          alt={title}
        />
      </a>
      <div className="mt-4">
        <a href={tmdbUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
          <h3>{title}</h3>
        </a>
        <div className="content flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="rating flex items-center space-x-1">
              <img src="star.svg" alt="Star Icon" />
              <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>
            <span>•</span>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          </div>
          <a href={imdbUrl} target="_blank" rel="noopener noreferrer">
            <img src="/imdb_logo.png" alt="IMDB Icon" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default MovieCard