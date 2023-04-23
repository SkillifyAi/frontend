import React from 'react'
import ReactCodeInput from 'react-code-input'

import '../../css/CodeInput.css'

export default function CodeInput({handleChange, code}) {


  return (
    <div className='number-code'>
      <ReactCodeInput onChange = {handleChange} value={code} className = "code-input" type='number' fields={6}/>
    </div>
  )
}
