import React,{useContext} from 'react'
import {Button } from '@mui/material'
import { GetStartedContext } from '../../App'

export default function MainHome() {

  const { toggleGetStarted } = useContext(GetStartedContext);
  return (
    <div className='main-container'>
          <div className='main-content'>
            <div className='left-side'>
              <h1 className = 'main-title'>Unlock your potential with Skillify.Ai</h1>
              <div className='main-input'>
                <input
                  placeholder='Get your first plan'
                  type='text'
                />
                <Button onClick = {toggleGetStarted} className='main-button'>Generate</Button>
              </div>
            </div>
            <div className='right-side'>
              <p className='main-quote'>
                “Just as a skilled captain navigates a boat through stormy waters, a knowledgeable person navigates through the complexities of life.”
                <span>— A Wise Man —</span>
              </p>
            </div>
        </div>
      </div>
  )
}
