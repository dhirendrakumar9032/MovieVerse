import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import { Movie } from './types/movie';
import './styles/App.scss';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const API_BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMovies(movies);
      return;
    }

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="main-content">
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;