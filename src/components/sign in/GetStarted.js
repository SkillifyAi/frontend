import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material';
import {Link} from 'react-router-dom' 

import '../../css/login.css'
import LoginGoogle from './LoginGoogle';

export default function Login({handleClose,open}) {

 

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      container={() => document.getElementById("root")}
      sx={{
        padding: '0.5rem'
      }}
    > 
        <DialogTitle>Log in or sign up<span>Sign up for free, or continue with Google</span></DialogTitle>
        <DialogContent>
            <Button onClick = {handleClose}><i className = "fa-solid fa-xmark"></i></Button>
            <DialogActions>
              <Link className='login-link' to='/login' ><Button onClick = {handleClose} className='email-button'>Continue with e-mail</Button></Link>
            </DialogActions>
            <LoginGoogle handleClose = {handleClose}/>
            <span className='terms-agree'>By continuing, you agree to Skillify.ai's <Link to = "/terms-of-service">Terms of Use</Link>. 
             Read our <Link to= "/privacy-policy">Privacy Policy.</Link></span>
        </DialogContent>
       
      </Dialog>
  )
}
