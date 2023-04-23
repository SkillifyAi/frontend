import React from 'react'

import { reviewsData } from './data'
import Review from './Review'
import Slide from './Slide'

export default function Reviews({width}) {
  return (
    <div className='reviews'>
        <Slide width = {width} number={0} elementClass = "review-container" element={<Review data = {reviewsData[0]}/>}/>
        <Slide width = {width} number={1} elementClass = "review-container" element={<Review data = {reviewsData[1]}/>}/>
        <Slide width = {width} number={2} elementClass = "review-container" element={<Review data = {reviewsData[2]}/>}/>
    </div>
  )
}
