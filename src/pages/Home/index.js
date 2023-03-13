import { useEffect, useState} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

function Home(){
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(()=>{

    async function loadMovies(){
      const response = await api.get("movie/now_playing", {
        params:{
         api_key: "28fc232cc001c31e8a031f419d0a14ca",
         language: "pt-BR",
         page: 1,
        }
      })
      setMovies(response.data.results.slice(0, 20))
      setIsLoading(false);
    }

    loadMovies();
  }, [])

  return(
    <>
    { isLoading ? (
          <div className="loading">
            <h2>Carregando filmes...</h2>
          </div>
    ) :
    (
    <div className="container">
      <h1 className="title-home">Filmes em cartaz</h1>
      <div className="movie-list">
        {movies.map((movie) => {
          return(
            <div key={movie.id} className="movie">
              <Link to={`/filme/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
              </Link>
              <Link to={`/filme/${movie.id}`}><div className="detail-movie">Acessar</div></Link>
            </div>
          )
        })}
      </div>
    </div>
    )}
    </>
  )
}

export default Home;