import React from 'react'
import { Link } from 'react-router-dom'
import './styles/header.css'

export default function Header() {
  return (
    <div className='header_component'>
      <div className='title_component'>
        <h1>Star Wars</h1>
      </div>
      <div className='list_container'>
        <ul>
          <li className='home'>
            Home
          </li>
          <li className='home'>
            About Us
          </li>
          <li className='home'>
            Contact Us
          </li>
        </ul>
      </div>
    </div>
  )
}