import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import {useSpring,animated} from '@react-spring/web'
import ClassNames from 'classnames'

import UpgradePremium from './UpgradePremium';
export default function Categories({openCategory,toggleCategory,isCollapsed,toggleIsCollapsed,toggleOpenPricing,width, userData}) {

    const props = useSpring({
        width: !isCollapsed ? width >= 1000 ? '20%' : '100%' : '5%',
        opacity: isCollapsed ? width >= 1000 ? '1' : '0' : '1',
        display: isCollapsed ? width >= 1000 ? 'flex' : 'none' : 'flex'
    })

    return (
    <animated.section style = {props}
         className='categories'>
        <div className='upper-section'>
           {!isCollapsed && <h2>Categories</h2>}
           
            <Tooltip
                title = {!isCollapsed ? "Collapse" : "Expand"} 
                placement='right'
            >
                <IconButton onClick = {toggleIsCollapsed}>
                    <KeyboardTabIcon sx = {{
                        color:'black',
                        transform: !isCollapsed ? 'rotate(180deg)' : 'rotate(0)'
                    }}/>
                </IconButton>
            </Tooltip>
        </div>
        <ul className='category-list'>
            <li onClick = {width >= 1000 ? toggleCategory : (event) => {
                toggleCategory(event)
                toggleIsCollapsed()
            }} className={ClassNames({'center-item': isCollapsed,'category-open': openCategory.sports})}>
                <Tooltip    
                    title = {isCollapsed ? "Sports" : ""}
                    placement='right'
                >
                 <i className="fa-solid fa-person-running"></i>
                </Tooltip>
                 {!isCollapsed ? "Sports" : ""}
            </li>
            <li onClick = {width >= 1000 ? toggleCategory : (event) => {
                toggleCategory(event)
                toggleIsCollapsed()
            }} className={ClassNames({'center-item': isCollapsed,'category-open': openCategory.moneyMaking})}>
                 <Tooltip    
                    title = {isCollapsed ? "Money-making" : ""}
                    placement='right'
                >
                    <i className="fa-solid fa-money-bill"></i>
                </Tooltip>
                {!isCollapsed ? "Money-making" : ""}
            </li>

            <li onClick = {width >= 1000 ? toggleCategory : (event) => {
                toggleCategory(event)
                toggleIsCollapsed()
            }} className={ClassNames({'center-item': isCollapsed,'category-open': openCategory.coding})}>
                <Tooltip    
                    title = {isCollapsed ? "Coding" : ""}
                    placement='right'
                >
                <i className="fa-solid fa-laptop">
                </i>
                </Tooltip> 
                {!isCollapsed ? "Coding" : ""}
            </li>
            <li onClick = {width >= 1000 ? toggleCategory : (event) => {
                toggleCategory(event)
                toggleIsCollapsed()
            }} className={ClassNames({'center-item': isCollapsed,'category-open': openCategory.else})}>
                <Tooltip    
                    title = {isCollapsed ? "Anything else" : ""}
                    placement='right'
                >
                <i className="fa-solid fa-lightbulb">
                </i>
                </Tooltip>
                {!isCollapsed ? "Anything else": ""} 
            </li>
        </ul>
        {!isCollapsed && userData.planType !== "Enterprise" && <UpgradePremium toggleOpenPricing={toggleOpenPricing}/>}
    </animated.section>
  )
}
