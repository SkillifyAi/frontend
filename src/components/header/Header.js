import React,{useState,useRef,useContext} from 'react'
import {Link} from 'react-router-dom'
import { Button} from '@mui/material';
import {useSpring,animated} from '@react-spring/web'

import { GetStartedContext } from '../../App'
import ProfileMenu from './ProfileMenu';
import '../../css/header.css'
import logo from '../../images/logo.jpg'
import ContactPopover from './ContactPopover';

export default function Header({width, isAuthentificated}) {

    
    const [anchorEl,setAnchorEl] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
      setIsOpen(prevState => !prevState)
    }
    const ref = useRef()

    const props = useSpring({
      display: !isOpen ? 'none' : 'flex',
      clipPath: !isOpen ? 'inset(10% 50% 90% round 10px)' : 'inset(0% 0% 0% round 10px)',
    })
    const liProps = useSpring({
      delay: isOpen ? 400 : 0,
      opacity: !isOpen ? '0' : '1',
      transform: !isOpen ? 'translateY(50px)' : 'translateY(0)',
      config:{mass:1 ,tension:200,friction:20}
    })


    const { toggleGetStarted } = useContext(GetStartedContext);
    
    const toggleAnchorEl = (event) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    

    return (
        <header className='header'>
         <nav className={'navbar'}>
            <Link to = "/"><img alt = "logo" src = {logo} /></Link>
          {width < 1000 && 
            <animated.div ref = {ref} style = {props}  className='hamburger-menu'>
              <ul> 
                <animated.li ref = {ref} style = {liProps}>
                  <Link to = "/"><img alt = "logo" src = {logo} /></Link>
                  <i onClick = {toggleMenu} className="fa-solid fa-xmark"></i>
                </animated.li>
                <animated.li ref = {ref} style = {liProps}>
                {!isAuthentificated && <Button variant="contained" onClick={toggleGetStarted}>Get Started</Button>}
                {isAuthentificated && <Link to = "/dashboard"><Button variant="contained">Dashboard</Button></Link>}
                </animated.li>
                <animated.li ref = {ref} style = {liProps} className='text-link'>
                  <Link to="/pricing" className='link'>Pricing</Link>
                </animated.li>
                <animated.li ref = {ref} style = {liProps} className="text-link">
                  <Link to="/contact" className = 'link'>Contact Us</Link> 
                </animated.li>
                <animated.li ref = {ref} style = {liProps} className="text-link">
                  <a target = "_blank" href = "https://discord.gg/KZeXgW3ZXB" rel="noreferrer" className='link'>Discord</a>
                </animated.li>
              </ul>
            </animated.div>
            }
           {width >= 1000 && 
            <ul className='right-nav'>
              <li>
                <Link to="/pricing" className='link'>Pricing</Link>
              </li>
              <li id = "contact-header">
                  <Link className = 'link' onClick={toggleAnchorEl} >Contact Us</Link> 
                  <ContactPopover anchorEl = {anchorEl} containerId={'contact-header'} handleClose = {handleClose}/>
              </li>
              <li>
              <a target = "_blank" href = "https://discord.gg/KZeXgW3ZXB" rel="noreferrer" className='link'>Discord</a>
              </li>
            </ul>
           }
           {width >= 1000 && <div className='left-nav' id='nav-menu-container'>      
                <ProfileMenu />
              {!isAuthentificated && <Button variant="contained" onClick={toggleGetStarted}>Get Started</Button>}
              {isAuthentificated && <Link to = "/dashboard"><Button variant="contained">Dashboard</Button></Link>}
            </div> }
            {width < 1000 && <i onClick = {toggleMenu} className="fa-solid fa-bars"></i>}
          </nav> 
        </header>
      )
}
