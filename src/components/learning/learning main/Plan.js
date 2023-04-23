import { Button } from '@mui/material'
import React, { useState } from 'react'
import {animated} from '@react-spring/web'
import Succes from '../Succes'
export default function Plan({aiResponse,responseGenerating,width,props, savePlan, succes, toggleSucces}) {

  const [planSaved,setPlanSaved] = useState(false)
  const handleSave = () => {
    setPlanSaved(prevState => !prevState)
  }

  const handleChange = (event) => {
      event.preventDefault()
  }
  const handleCopy = (event) => {
    event.preventDefault()
    return
  }
  return (
    <animated.div style={width < 1000 ? props : null} className='plan'>
     {aiResponse && <div className='plan-header'>
        <Button onClick={() => {
          handleSave()
          savePlan()
        }}><i className={`${planSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark`}></i>Save plan</Button>
        <Succes
          open = {succes}
          handleClose={toggleSucces}
          text = "Plan saved successfully" 
        />
      </div>}
      {!responseGenerating && <div className='loading'>Generating your plan</div>}
      {!responseGenerating && <span className="loader"></span>} 
      {aiResponse && <textarea onCopy = {handleCopy} readOnly onChange = {handleChange} value={aiResponse}/>}
    </animated.div> 
  )
}
