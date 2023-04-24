import React, { useState,useEffect} from 'react'

import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Button, TextField,IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../../css/login.css'
import { Link } from 'react-router-dom';
import {useSpring,animated,} from '@react-spring/web'
import ClassNames from 'classnames'
import httpClient from '../../httpClient'
import VerifyPhoneNumber from './VerifyPhoneNumber';

export default function SignUp() {

    const [formData,setFormData] = useState({
        email:"",
        password:"",
        name:"",
        confirmPassword:"",
      })
      const [verifyPassword,setVerifyPassword] = useState({
        lowerCase:false,
        upperCase:false,
        number:false,
        length:false,
    })
      const [verifiyPhone, setVerifyPhone] = useState(false)
      const [showVerifyPassword,setShowVerifyPassword] = useState(false)
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword,setShowConfirmPassword] = useState(false)
      const [loaded,setLoaded] = useState(false)
      const [error,setError] = useState("")
      const handleTogglePassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
      const handleToggleConfirmPassword = () => setShowConfirmPassword((prevState) => !prevState)
      const theme = createTheme({
        palette: {
          primary: {
            main: '#f78000',
          },
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                '& $notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover $notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&$focused $notchedOutline': {
                  borderColor: green[500],
                  borderWidth: 2,
                },
              },
            },
          },
        },
      });
      
      const verifyPasswordFunction = (name,value) => {
        if(name === 'password') {
            if(/^(?=.*[a-z])/.test(value) === true)
                setVerifyPassword((prevState) => ({
                    ...prevState,
                    lowerCase:true
                }))
            else
                setVerifyPassword((prevState) => ({
                    ...prevState,
                    lowerCase:false
                }))
            if(/^(?=.*[A-Z])/.test(value) === true)
                setVerifyPassword((prevState) => ({
                    ...prevState,
                    upperCase:true
                }))
            else
                setVerifyPassword((prevState) => ({
                    ...prevState,
                    upperCase:false
                }))
            if(/^(?=.*[0-9])/.test(value) === true)
                setVerifyPassword((prevState) => ({
                    ...prevState,
                    number:true
                }))
            else
                setVerifyPassword((prevState) => ({
                    ...prevState,
                    number:false
                }))
            if(value.length >= 8)
                setVerifyPassword((prevState) => ({
                    ...prevState,
                    length:true
                }))
            else
                setVerifyPassword((prevState) => ({
                    ...prevState,
                    length:false
                }))
        }
      }

      const handleChange = (event) => {
        
        const {name,value} = event.target

        if(name === "password") {
            setShowVerifyPassword(true)
            verifyPasswordFunction(name,value)
        }

        setFormData(prevState => ({
          ...prevState,
          [name]:value
        }))
      } 


    const handleSubmit = async (event) => {
        event.preventDefault()

        setError("")

        const {email, password, confirmPassword, name} = formData
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

        if(!emailRegex.test(email)) {
          setError("Please enter a valid email")
        } else if(name.length === 0) {
          setError("Please enter a name")
        }else if(!passwordRegex.test(password) || password.length < 8) {
          setError("Please enter a valid password")
        } else if(password !== confirmPassword) {
            setError("Passwords do not match")
        } else {
            try {
               await httpClient.post("http://localhost:5000/users/register",{
                email:email,
                password: password,
                username: name,
              })

              setVerifyPhone(true)

            }
            catch(err) {
                if(err.response.status === 400)
                  setError(err.response.data.error)
                else {
                  console.error(err)
                }
                console.log(err)
            }


        }
      
        
    }

      useEffect(() => {
        setLoaded(true);
      }, []);

      const props = useSpring({
        opacity: loaded ? 1 : 0,
        transform: !loaded ? 'scale(0.2)' : 'scale(1)',
        config:{mass: 1,tension:100,friction:20},
      })

      const passwordCheckProps = useSpring({
        opacity:  showVerifyPassword ? 1 : 0,
        transform : !showVerifyPassword ? 'translateY(20px)' : 'translateY(0)',
      })
    return (
      <>
       {!verifiyPhone && <div className='form-container sign-up-container'>
            <animated.form style = {props} className='login-form sign-up-form' onSubmit = {handleSubmit}>
                    <div className='login-text'>
                        <h1 className='form-title'>Sign up</h1>
                        <span className='create-account'>Already have an account? <Link to='/login'>Log in</Link></span>
                    </div>
                    <ThemeProvider theme={theme}>
                    <TextField 
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        name='email'
                    />
                    <TextField 
                        label= "Full name"
                        value={formData.name}
                        onChange={handleChange}
                        name='name'
                    />
                    <TextField 
                        label="Password" 
                        type={!showPassword ? "password" : 'text'} 
                        value={formData.password}
                        onChange={handleChange}
                        name='password'
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword}>
                                {!showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                    />
                    {showVerifyPassword && <animated.div style = {passwordCheckProps} className='password-contain'>
                        <ul>    
                            <li className={ClassNames('verify-password', {"true": verifyPassword.lowerCase } )}>
                                <i 
                                 className = {ClassNames("fa-solid",{"fa-circle-exclamation":!verifyPassword.lowerCase},{"fa-circle-check":verifyPassword.lowerCase})}>
                                </i>
                               One lowercase character</li>
                            <li className={ClassNames('verify-password', {"true": verifyPassword.upperCase } )}>
                                <i
                                    className ={ClassNames("fa-solid",{"fa-circle-exclamation":!verifyPassword.upperCase},{"fa-circle-check":verifyPassword.upperCase})}>
                                </i>
                                One uppercase character
                            </li>
                            <li className={ClassNames('verify-password', {"true": verifyPassword.number } )}>
                                <i 
                                    className ={ClassNames("fa-solid",{"fa-circle-exclamation":!verifyPassword.number},{"fa-circle-check":verifyPassword.number})}>
                                </i>
                                One number
                            </li>
                            <li className={ClassNames('verify-password', {"true": verifyPassword.length} )}>
                                <i 
                                    className ={ClassNames("fa-solid",{"fa-circle-exclamation":!verifyPassword.length},{"fa-circle-check":verifyPassword.length})}>
                                </i>
                                8 characters minimum
                            </li>
                        </ul>
                    </animated.div> }
                    <TextField 
                        label="Confirm password" 
                        type={!showConfirmPassword ? "password" : 'text'} 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        name='confirmPassword'
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={handleToggleConfirmPassword}>
                                {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                    />
                    </ThemeProvider>
                    {error && <span className='error'>{error}</span> }
                    <Button onClick = {handleSubmit} className='form-button'>Create account</Button>
            </animated.form> 
        </div>}
        {verifiyPhone && <VerifyPhoneNumber userData = {formData}/>}
      </>
  )
}
