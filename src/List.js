import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/list.css'

export default function List() {

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const getAllCharacters = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `https://swapi.dev/api/people/?page=${pageNumber}`
    }).then((response) => {
      const data = response.data;
      setCharacters(data.results);
      setNumberOfPages(Math.ceil(data.count / data.results.length))
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }

  const gotoPrevious = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  useEffect(() => {
    getAllCharacters();
  }, [pageNumber]);

  return (
    <>
      <div className='loading'>{loading && 'Loading...'}</div>
      <div className='List__container'>
        {
          characters.map((character, index) => {
            return(
              <div className='card'>
                <Link to={`/${index+1}`} key={index}>
                  <h2>{character.name}</h2>
                </Link>
              </div>
            )
          })
        }
      </div>
      <div className='btn__container'>
        <button onClick={gotoPrevious}>Previous</button>
        {
          pages.map((pageIndex) => (
            <button key={pageIndex + 1} onClick={() => setPageNumber(pageIndex + 1)}>
              {pageIndex + 1}
            </button>
          ))
        }
        <button onClick={gotoNext}>Next</button>
      </div>
    </>
  )
}