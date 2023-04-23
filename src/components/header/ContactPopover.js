import React from 'react'
import {MenuItem, Popover} from '@mui/material'
export default function ContactPopover({anchorEl,handleClose,containerId}) {

    const open = Boolean(anchorEl)

  return (
    <Popover
        open = {open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={() => document.getElementById(containerId)}
        // transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
            top: containerId === 'contact-profile' ? '50px' : '30px',
            left: containerId === 'contact-profile' || containerId === 'contact-support' ? '-10px' : '20px'
        }}
    >
        <MenuItem>Contact us at <a className='gmail' target = "_blank" rel="noreferrer" href='https://mail.google.com/mail/u/0/#sent?compose=new'> skillify.ai7@gmail.com</a></MenuItem>
    </Popover>
  )
}
