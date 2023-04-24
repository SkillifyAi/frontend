import React from 'react'


import {cardsData} from './data'
import Card from './Card'
import Slide from './Slide'

export default function Cards({width}) {
  return (
    <div className='cards-container'>
      <h1>Exactly what Skillify can teach you</h1>
      <div className = "cards">
        <Slide width = {width} number = {0} elementClass = "card-container" element={<Card data = {cardsData[0]} />}/>
        <Slide width = {width} number = {1} elementClass = "card-container" element={<Card data = {cardsData[1]} /> }/>
        <Slide width = {width} number= {2} elementClass = "card-container" element={<Card data = {cardsData[2]}  />}/>
      </div>
    </div>
  )
}
