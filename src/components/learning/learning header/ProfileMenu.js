import React, { useState } from 'react'
import { Button, ClickAwayListener, Popover } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import ProfileDialog from './ProfileDialog'
import ContactPopover from '../../header/ContactPopover'
import Leaderboard from '../../leaderboard/Leaderboard'
import httpClient from '../../../httpClient'

export default function ProfileMenu({anchorEl,handleClose,toggleOpenPricing,width, data, userPlace, userEmail}) {

    const open = Boolean(anchorEl)
    const [openDialog,setOpenDialog] = useState(false)
    const [anchorElContact,setAnchorElContact] = useState(null)
    
    const toggleAnchorElContact = (event) => setAnchorElContact(event.currentTarget)

    const handleCloseContact = () => setAnchorElContact(null)
    const toggleDialog = () => setOpenDialog(prevState => !prevState)

    const navigate = useNavigate()
    const handleLogOut = async () => {
        try {
            const resp = await httpClient.get('http://localhost:5000/users/logout')
            if(resp.data.succes === true)
                navigate('/')
        } catch (err) {
            alert("Something went wrong with the server")
        }   
    }
    
    // const handlePortal = async () => {
    //     try {
    //         const resp = await httpClient.post("http://localhost:5000/stripe/customer-portal", {
    //             email: data.email
    //         })
    //         window.location(resp.data.url)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    return (
        
            <Popover
                container={() => document.getElementById('user-info-header')}
                open = {open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    style: {
                    width: 350,
                },
            }}
            >
                <ClickAwayListener onClickAway={!openDialog ? handleClose : () => null}>
                    <div className='popover-content'>
                        <div className='top-section'>

                            <h4 className='plan-type'>{data.planType} plan</h4>
                            <p className='popover-email'>{data.email}</p>
                            <div className='plans-information'>
                                <span><i className="fa-solid fa-scroll"></i> {data.planNumber === -1 ? "Unlimited" : data.planNumber}</span>
                                <Button onClick={toggleOpenPricing}>Buy plans</Button>
                            </div>
                        </div>
                        <div className='bottom-section'>
                            <ul className='menu'>
                                <li className='menu-action'><Button  className = "menu-button" onClick={toggleDialog}>Account settings</Button></li>
                                <li className='menu-action'><Link to = "/pricing"><Button className = "menu-button" >Pricing</Button></Link></li>
                                <li className='menu-action'><Link to = "/your-plans"><Button className = "menu-button" >Your plans</Button></Link></li>
                                <li className='menu-action' id = "leaderboard-container"><Leaderboard data = {data} userPlace = {userPlace} /></li>
                                <li className='menu-action'> <a target = "_blank" href = "https://discord.gg/KZeXgW3ZXB" rel="noreferrer" className='link'><Button className='menu-button'>Join Discord</Button></a></li>
                                <li className='menu-action' id = "contact-profile">
                                    <Button className = "menu-button"  onClick={toggleAnchorElContact}>Contact us</Button>
                                    <ContactPopover anchorEl = {anchorElContact} containerId={'contact-profile'} handleClose = {handleCloseContact} />
                                </li>
                                {/* <li onClick = {handlePortal} className='menu-action'><Button className='menu-button'>Configure payment plan</Button></li> */}
                                <li className='menu-action'><Link to = "/faq"><Button className = "menu-button" >FAQ</Button></Link></li>
                            </ul>
                            <div className='log-out-container'>
                                <Button onClick = {handleLogOut} className = "menu-button" id = 'log-out'>Log out</Button>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
                <ProfileDialog open = {openDialog} handleClose = {toggleDialog} width = {width} data = {data}/>
            </Popover>
   
  ) 
}
