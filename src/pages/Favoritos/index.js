import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

function Favorites(){
  const [movies, setMovies] = useState([])

  useEffect(()=>{
    const myList = localStorage.getItem("@12movies");
    setMovies(JSON.parse(myList) || [])

  }, [])

  function deleteMovie(id){
    let filterMovies = movies.filter( (item) => {
      return (item.id !== id)
    })

    setMovies(filterMovies);
    localStorage.setItem("@12movies", JSON.stringify(filterMovies) )
    toast.success("Filme removido com sucesso")
  }

  return(
    <>
      <div className="my-movies">
        <h1 className="title">Meus filmes</h1>
        {movies.length === 0 && <div className="message">Você não possui nenhum filme salvo :( </div>}
        <ul>
          {movies.map((item) => {
            return(
              <li key={item.id} className="movie">
                <Link to={`/filme/${item.id}`}>
                  <div className="infos">
                    <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt={item.title} />
                    <div className="movie-title">{item.title}</div>
                  </div>
                </Link>
                <div className="options">
                  <Link to={`/filme/${item.id}`}>
                    Detalhes
                  </Link>
                  <div onClick={() => deleteMovie(item.id) }>
                    <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Favorites;