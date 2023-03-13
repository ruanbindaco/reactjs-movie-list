import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify'

function Filme(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
        }
      })
      .then((response)=>{
        setMovie(response.data);
        setIsLoading(false);
      })
      .catch(()=>{
        navigate("/", { replace: true });
        return;
      })
    }

    loadFilme();
  }, [navigate, id])

  function saveMovie(){
    const myList = localStorage.getItem("@12movies");
    let savedMovies = JSON.parse(myList) || [];
    const hasFilme = savedMovies.some( (savedMovie) => savedMovie.id === movie.id)

    if(hasFilme){
      toast.warn("Esse filme já está na sua lista!")
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@12movies", JSON.stringify(savedMovies));
    toast.success("Filme salvo com sucesso!")
  }

  return(
    <>
    { isLoading ? (
      <div className="loading">
        <h2>Carregando detalhes...</h2>
      </div>
    )
    : (
      <div className="container">
      <div className="movie-info">
        <h1 className="title">{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
        <h3 className="sinopse">Sinopse</h3>
        <span className="overview">{movie.overview}</span>
        <strong className="rating">Avalição: {(Math.round(movie.vote_average * 100) / 100).toFixed(1)} / 10</strong>
        <div className="area-buttons">
          <button onClick={saveMovie}>Salvar</button>
          <button>
            <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
              Trailer
            </a>
          </button>
        </div>
      </div>
      </div>)}
    </>
  )
}

export default Filme;