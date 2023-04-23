import React,{useContext} from 'react'

import { GetStartedContext } from '../../App'
import appSample from '../../images/appSample.gif'
import Slide from './Slide'
export default function Sample({width}) {

  const { toggleGetStarted } = useContext(GetStartedContext)
  return (
    <div className='sample'>
        <Slide 
          width={width}
          number={0}
          elementClass={'text-container'}
          element = {
            <div className='left-side'>
            <h2 className='sample-title'>Exactly how to improve yourself by learning new skills.</h2>
            <p className='sample-description'>Level up with instant feedback and customized recommendations.</p>
            <button onClick = {toggleGetStarted} className='sample-button'>Start learning</button>
          </div>
          }
        />
        <Slide
          width={width}
          image={true}
          number={width > 1000 ? 2 : 1}
          elementClass='image-container'
          element={ 
            <div className='right-side'>
              <img src={appSample} alt = "Application example gif"/>
            </div>
          }    
      />
      </div>
  )
}


