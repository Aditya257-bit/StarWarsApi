import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './styles/character.css'

export default function Character({match}) {

  const id = match.params.id;

  const [character, setCharacter] = useState();
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState([]);

  const getCharacter = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `https://swapi.dev/api/people/${id}`
    }).then((response) => {
      setCharacter(response.data);
      totalFilms(response.data)
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }

  const totalFilms = (data) => {
    data && data.films.map((url) => axios.get(url).then((resp) => {
      setFilms((preVal) => [...preVal, resp.data])
    }).catch((error) => {
      console.log(error);
    }))
  }

  useEffect(() => {
    getCharacter();
  }, [id])

  return (
    <>
      <div className='loading'>{loading && 'Loading...'}</div>
      <div className='character__container'>
        <div className='characterDetails__container'>
          {
            character &&
            <div class="card">
              <h2>Name: {character.name}</h2>
              <p><b>Gender</b>: {character.gender}</p>
              <p><b>Eye color:</b> {character.eye_color}</p>
              <p><b>Hair Color:</b> {character.hair_color}</p>
            </div>
          }
        </div>
        {
          films && character &&
          <div className='films__container'>
          {
            <p className='text'>{character.name} is appeared in {character.films.length} films</p>
          }
          {
            films.map((film, index) => (
              <p className='filmNames'>{film.title}</p>
            ))
          }
        </div>
        }
      </div>
    </>
  )
}
