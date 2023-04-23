import React, {useEffect, useState} from 'react';
import {useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '../../images/GoogleLogo.png'
import httpClient from '../../httpClient';
import {useNavigate} from 'react-router-dom'

export default function LoginGoogle ({handleClose}) {
 
    const [user, setUser] = useState()
    const [error, setError] = useState()

    const navigate = useNavigate()

    useEffect( () => {

        const getData = async () => {
            if (user) {
                try {
                    const res =  await httpClient.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {withCredentials: false})

                    const data = res.data
                    const {name, email, picture} = data
                    const resp = await httpClient.post("http://localhost:5000/users/google-login",{
                        name: name,
                        email: email,
                        picture: picture
                    })
                    console.log(resp.data);
                    navigate('/dashboard')
                    handleClose()
                } catch (err) {
                    console.log(err);
                    setError(err.response.data.error)
                }
              
            }
        }
        getData()
    
    },[user, navigate]);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed: ', error)
    })
    return (
        <>
            <div className = "google-sign-in" >
                <button type = "button" onClick = {() => login()}><img alt = "Google logo" src={GoogleLogo} /> Continue with Google</button>
            </div>
            {error && <span className='error'>{error}</span>}
        </>
    )
}