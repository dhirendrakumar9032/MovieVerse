import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import noData from './resources/not-found.svg'
import loadingImg from './resources/laoding.svg'
import './styles/App.scss';
import { useFetchData } from './hooks/useFetchData';
import { Movie } from './types/movie';


function App() {

  const {moviesList,isLoading,page,searchQuery,setSearchQuery,setPage,}=useFetchData();
  console.log({isLoading})
  
  if(isLoading){
    return <div className='loading'>
      <img src={loadingImg} alt='loading'/>
      <span>Loading</span>
    </div>
  }

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="main-content">
       {moviesList.length? <div className="movies-grid">
          {moviesList.map((movie:Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>:<div className='noData'>
        <img src={noData} alt='noData'/>
        <span className='text'>Sorry no result found!</span>
          </div>}
        
        <footer className='footer'>
          <button disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>Previous</button>
          <button onClick={() => setPage(prev => prev + 1)}>Next</button>
        </footer>
      </main>
    </div>
  );
}

export default App;
