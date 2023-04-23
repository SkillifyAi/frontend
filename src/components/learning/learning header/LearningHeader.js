import React,{useState} from 'react'

import logo from '../../../images/logo.jpg'
import { Button } from '@mui/material'
import ProfileMenu from './ProfileMenu';
import userBasic from '../../../images/userBasic.jpg'

export default function LearningHeader({toggleOpenPricing,width,toggleIsCollapsed, data, userPlace}) {


    const [anchorEl,setAnchorEl] = useState(null);
   
    const toggleAnchor = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => {
        if(anchorEl)
            setAnchorEl(null)
    }

  return (
    <header className='learning-header'>
        <nav className='learning-nav'>
            <div className='left-side'>
                {width < 1000 && <i onClick = {toggleIsCollapsed} className='fa-solid fa-bars'></i>}
                <img src = {logo} alt = "Company logo" />
                {/* Your plans */}
                {/* Join Discord */}
            </div>
            <div className='right-side' >
               {width > 700 && <Button className='header-button-plans' onClick={toggleOpenPricing}>Get Plans</Button>}
                <div onClick={toggleAnchor} id = "user-info-header"className='learning-user-info'>
                    <div className='learning-text-info'>
                        <p className='user-name'>{data.username}</p>
                        <span className='user-plans'>{data.planNumber === -1 ? "Unlimited" : data.planNumber} {data.planNumber === 1 ? 'plan' : 'plans'}</span>
                    </div>
                    <img className = 'profile-picture' src={data.image ? data.image : userBasic} alt='Profile'/>
                    <ProfileMenu 
                        data = {data}
                        width={width}
                        toggleOpenPricing={toggleOpenPricing}
                        anchorEl = {anchorEl} 
                        toggleAnchor = {toggleAnchor} 
                        handleClose = {handleClose}
                        userPlace = {userPlace}
                    />
                </div>
            </div>
        </nav>
    </header> 
  )
}
