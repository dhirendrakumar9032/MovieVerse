import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import noData from './resources/not-found.svg'
import './styles/App.scss';
import { useFetchData } from './hooks/useFetchData';
import { Movie } from './types/movie';
import LoadingComp from './components/LoadingComp';


const App = () => {

  const { moviesList, isLoading, page, searchQuery, setSearchQuery, setPage } = useFetchData();

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      {isLoading ? <LoadingComp /> : <main className="main-content">
        {moviesList.length ? <div className="movies-grid">
          {moviesList.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div> : <div className='noData'>
          <img src={noData} alt='noData' />
          <span className='text'>Sorry no result found!</span>
        </div>}
      </main>}
      <footer className='footer'>
          <button disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>Previous</button>
          <button onClick={() => setPage(prev => prev + 1)}>Next</button>
        </footer>
    </div>
  );
}

export default App;
