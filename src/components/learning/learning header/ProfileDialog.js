import React, { useState } from 'react'
import {  Avatar, Button, Dialog, IconButton} from '@mui/material'
import {ContentCopy} from '@mui/icons-material';
import {Link} from 'react-router-dom'
import {useSpring,animated} from '@react-spring/web'
import userBasic from '../../../images/userBasic.jpg'
import Succes from '../Succes';

export default function ProfileDialog({open,handleClose,width, data}) {

    const [copyEmail,setCopyEmail] = useState(false)
    const [hoverEmail,setHoverEmail] = useState(false)
    const [emailCopied,setEmailCopied] = useState(false)


    const handleCloseSnackbar = (event, reason) => {
        if(reason === 'clickaway')
            return

        setEmailCopied(false)
    }
    const props = useSpring({
        transform: !copyEmail ? hoverEmail ? 'scale(105%)' : 'scale(100%)' : 'scale(90%)',
        config: {duration: 100}
    })

    const handleHover = () => {
        setHoverEmail(true)
    }
    const handleClick = () => {
        setCopyEmail(true)
        setEmailCopied(true)
        const textToCopy = data.email
        navigator.clipboard.writeText(textToCopy);
    }
    const handleMouseLeave = () => {
        setHoverEmail(false)
        setCopyEmail(false)
    }
  return (
    <Dialog
        open = {open}
        onClose={handleClose}
        PaperProps={{sx : { 
           borderRadius: '0.75rem',
           width: width > 1200 ? '25%' : width > 576 ? '50%' : '75%'
        }}}

    >
        <div className='profile-top'>
                <Avatar sx={{
                    height: '130px',
                    width: '130px',
                    border: ' 4px solid #fff',
                    position: 'absolute',
                    bottom: '-50px'
            }}><img alt = "Profile" className = 'profile-photo' src= {data.image ? data.image : userBasic} />
                </Avatar>
            <IconButton onClick = {handleClose} >
                <i className="fa-solid fa-xmark"></i>
            </IconButton>
        </div>
        <div className='profile-bottom'>
            <h2 className='username'>{data.username}</h2>
            <div className='email-container'>
                <span className='label'>Email</span>
                <animated.div 
                    onMouseDown = {handleClick} 
                    onMouseEnter={handleHover} 
                    onMouseLeave={handleMouseLeave}
                    onMouseUp = {() => setCopyEmail(false)}
                    style = {props} className='email-information'
                >
                    {data.email}
                    <IconButton>
                        <ContentCopy /> 
                    </IconButton>
                </animated.div>
                <Succes
                    open = {emailCopied}
                    handleClose={handleCloseSnackbar}
                    text = "Email copied to clipboard"
                />

            </div>
            <div className='membership'>
                <p>Memebership</p>
                <Button className='membership-plan'>{data.planType}</Button>
            </div>
            <div className='credit'>
                <p>Plans</p>
                <Button className='credit-button'><i className='fa-solid fa-scroll'></i> {data.planNumber} </Button>
            </div>
            <Button className='delete-button'>Delete account</Button>
            <div className='profile-bottom-detail'>
                <Link to = "/privacy-policy">Privacy policy</Link>
                ·  
                <Link to = "/terms-of-service">Terms</Link> 
            </div>
        </div>

    </Dialog>
  )
}
