import React,{useContext} from 'react'
import { Button } from '@mui/material'
import { GetStartedContext } from '../../App'
export default function Card({data}) {

  const { toggleGetStarted } = useContext(GetStartedContext)
  const {title,image,description} = data
  return (
    <div className='card'>
        <div className='text-area'>
            <h2 className='title'>{title}</h2>
            <p className='description'>{description}</p>
        </div>
        <img src = {image}/>
        <button className='card-button' onClick={toggleGetStarted}>Get started</button>
    </div>
  )
}
