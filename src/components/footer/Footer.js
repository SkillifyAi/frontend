import React, { useState } from 'react'
import logo from '../../images/logo.jpg'
import { Link } from 'react-router-dom'

import ContactPopover from '../header/ContactPopover'
import '../../css/footer.css'
export default function Footer() {

  const [anchorEl,setAnchorEl] = useState(null)

  const toggleAnchorEl = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <div className='footer'>
        <img src={logo} />
        <div className='social-media'>
            <a target='_blank' rel="noreferrer" href='https://www.instagram.com/skillify_ai/'><i className="fa-brands fa-instagram"></i></a>
            <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/skillify-ai-ba371b271/'><i className="fa-brands fa-linkedin"></i></a>
            <a target='_blank' rel="noreferrer" href='https://www.tiktok.com/@skillify_ai'><i className="fa-brands fa-tiktok"></i></a>
            <a target = "_blank" rel="noreferrer" href='https://www.facebook.com/profile.php?id=100091545584529&is_tour_dismissed=true'><i className="fa-brands fa-facebook"></i></a>
        </div>
        <div className='footer-links' id = "contact-footer">
            <Link onClick={toggleAnchorEl}>Contact us</Link>
            <ContactPopover anchorEl = {anchorEl} containerId={'contact-header'} handleClose = {handleClose}/>
            <Link to = "/privacy-policy">Privacy policy</Link>
            <Link to = "/terms-of-service">Terms of service</Link>
            <Link to = "/faq">FAQ</Link>
        </div>
        <span className='rights'>©2023 Skillify.ai all rights reserved</span>
    </div>
  )
}
