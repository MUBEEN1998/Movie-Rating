import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie,setSelectedMovie]=useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

 useEffect(() =>{
  fetch("http://127.0.0.1:8000/api/movies",{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Token 09a327c8316ecf7b1d994add5bb46d3cb149bf4b'
    }
  })
  .then(resp => resp.json())
  .then(resp => setMovies(resp))
  .catch(error => console.log(error))
 }, [])

 const movieClicked=movie =>{
  setSelectedMovie(movie);
 }

 const loadMovie = movie => {
  setSelectedMovie(movie);
}

const editClicked = movie => {
  setEditedMovie(movie);
  setSelectedMovie(null);

}

const removeClicked = movie => {
  const newMovies = movies.filter( mov => mov.id !== movie.id);
  setMovies(newMovies);
}
 
  return (
    <div className="App">
      <header className="App-header">
        <h1> Movie Rater</h1>
        </header>
        <div className="layout">
          <MovieList movies={movies} movieClicked={movieClicked}  editClicked={editClicked}
              removeClicked={removeClicked}/>
           
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
          { editedMovie ? 
          <MovieForm movie={editedMovie} /> 
          : null}
        </div>
      
    </div>
  );
}

export default App;
