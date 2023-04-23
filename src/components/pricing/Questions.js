import React,{useState} from 'react'

import ContactPopover from '../header/ContactPopover'
import Question from './Question'
import {questions} from '../home/data'

const questionsElements = questions.map((question,index) => {
    return <Question key={index} {...question}/>
})

  
export default function Questions() {

  const [anchorEl,setAnchorEl] = useState(null)

  const toggleAnchorEl = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)
  
  return (
    <div className='FAQ-pricing FAQ-page'>
            <div className='FAQ-title' id = 'contact-questions'>
                <h2>Frequently Asked Questions</h2>
                <h4>Have questions? Reach via <a target = "_blank"  rel="noreferrer" href = "https://discord.gg/KZeXgW3ZXB">Discord</a> or <a onClick={toggleAnchorEl}>mail</a></h4>
                <ContactPopover  anchorEl = {anchorEl} containerId={'contact-questions'} handleClose = {handleClose}/>
            </div>
            <div className='all-questions'>
               {questionsElements}
            </div>
         </div>
  )
}
