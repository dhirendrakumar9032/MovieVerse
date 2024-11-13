import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import { Movie } from './types/movie';
import './styles/App.scss';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const API_BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      let url;
      if (searchQuery.trim()) {
        url = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=en-US&page=${page}`;
      } else {
        url = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [searchQuery, page]); 

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="main-content">
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <footer className='footer'>
          <button disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>Previous</button>
          <button onClick={() => setPage(prev => prev + 1)}>Next</button>
        </footer>
      </main>
    </div>
  );
}

export default App;
