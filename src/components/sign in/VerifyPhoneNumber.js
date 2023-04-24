import React,{useState, useEffect} from 'react'
import {Button} from '@mui/material'

import {useSpring,animated,} from '@react-spring/web'
import {Link, useNavigate} from 'react-router-dom'
import CodeInput from './CodeInput';
import httpClient from '../../httpClient'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';

export default function VerifyPhoneNumber({userData}) {

    const [code, setCode] = useState("")
    const [succes, setSucces] = useState(false)
    const [sendMessage, setSendMessage] = useState(false)
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const props = useSpring({
        opacity: loaded ? 1 : 0,
        transform: !loaded ? 'scale(0.2)' : 'scale(1)',
        config:{mass: 1,tension:100,friction:20},
      })

      useEffect(() => {
        setLoaded(true)
      },[])

      console.log(userData);
      const navigate = useNavigate()

      const handleCodeChange = code => {
          setCode(code)
      }
      const handleChange = (value)=> {
        setPhoneNumber(value)
      }

      const handleSendMessage = async () => {
      
        if(!phoneNumber)
        { 
          setError("Phone number can`t be empty")
          return
        }
        
        try {
          await httpClient.post("http://localhost:5000/users/send-message", {
            phoneNumber: phoneNumber
          })
          setSucces("Message sent successfully")
          setSendMessage(true)
        } catch (err) {
          console.log(error);
          setError(err.response.data.message)
        } 
      }
      const handleSubmit = async () => {
        if(code.length !== 6) {
          setError("Please enter a valid 6 digit code")
          return
        }

        try {
          const resp = await httpClient.post("http://localhost:5000/users/verify-number/", {
              code: code,
              username: userData.name,
              email: userData.email,
              password: userData.password,
              number: phoneNumber
        })
         console.log(resp.data);
          setSucces("Register completed")
          navigate('/dashboard')
        } catch (err) {
          console.log(err);
          setError(err.response.data.message)
        }
  }

  return (
    <div className='form-container sign-up-container'>
            <animated.form style = {props} className='login-form sign-up-form' onSubmit = {handleSubmit}>
                    <div className='login-text'>
                        <h1 className='form-title'>Verify account</h1>
                        <span className='create-account'>Already have an account? <Link to='/login'>Log in</Link></span>
                    </div>
                   
                    <PhoneInput
                      placeholder = "Enter the phone number"
                      value={phoneNumber}
                      onChange={handleChange}
                      defaultCountry="US"
                    />
                
                    <button type = "button" className = "send-message" onClick={handleSendMessage}>Send message</button>
                    {sendMessage && <CodeInput handleChange={handleCodeChange}/>} 
                    {error && <span className='error'>{error}</span> }
                    {succes && <span className='succes'>{succes}</span>}
                    <Button onClick = {handleSubmit} className='form-button'>Create account</Button>
            </animated.form> 
    </div>
)}

