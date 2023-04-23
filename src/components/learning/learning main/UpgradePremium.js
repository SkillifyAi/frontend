import { Button } from '@mui/material'
import React from 'react'

export default function UpgradePremium({toggleOpenPricing}) {
  return (
    <div className='upgrade'>
       <i className="fa-solid fa-book"></i>
        <p>Upgrade your subscription to unlock more premium features.</p>
        <Button className='upgrade-button' onClick={toggleOpenPricing}>Upgrade</Button>
    </div>
  )
}
