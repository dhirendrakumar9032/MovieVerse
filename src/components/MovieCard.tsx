import React from 'react';
import { Star } from 'lucide-react';
import { Movie } from '../types/movie';
import '../styles/MovieCard.scss';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  
  return (
    <>
    <div className="movie-card" >
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-overlay">
          <div className="movie-rating">
            <Star className="star-icon" size={16} />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="release-date">{new Date(movie.release_date).getFullYear()}</p>
      </div>
    </div>
    </>
  );
};

export default MovieCard;