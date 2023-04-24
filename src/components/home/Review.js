import React from 'react'

export default function Review({data}) {


  const {name,image,text,rating} = data
  return (
    <div className='review'>
      <div className='review-user-info'>
        <img alt = "Profile"src = {image} />
        <h3>{name}</h3>
      </div>
      <div className='stars'>
        <i className='fa-solid fa-star'></i>
        <i className='fa-solid fa-star'></i>
        <i className='fa-solid fa-star'></i>
        <i className='fa-solid fa-star'></i>
        {rating !== 5 ? <i className = "fa-regular fa-star-half-stroke"></i> : <i className='fa-solid fa-star'></i>}
        <span>({rating})</span>
      </div>
      <span className='review-text'>
        {text}
      </span>
    </div>
  )
}
