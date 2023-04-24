import React from 'react'
import classNames from 'classnames'
import { IconButton, Tooltip } from '@mui/material'
import {useSpring,animated} from '@react-spring/web'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import {useParams} from 'react-router-dom'

export default function PlansLeft({width, toggleIsCollapsed, isCollapsed, plansTitles, alternativePlans, handleClick}) {

    const props = useSpring({
        width: !isCollapsed ? width >= 1000 ? '20%' : '100%' : '0',
        borderRight: !isCollapsed ? 'solid 1px var(--description-color)' : 'solid 0 var(--description-color)'
    })

    const style = {
        color: 'var(--primary-color)',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '1px solid var(--primary-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    const {id} = useParams()

    const planElements = plansTitles.map((item, index) => {
        return <li
         key = {index} 
         onClick={handleClick} 
         className= {classNames({'selected': id ? id === item.skill : "",
            'completed': item.completed === true})}
        >
        {item.skill} {item.completed ? <i className='fa-solid fa-check'></i> : ""}</li>
    })
  return (
    <animated.div style = {props} className='plans-title'>
        <div className='title-top'>
           {!isCollapsed && <h3>Your Plans</h3> }
            {isCollapsed && <Tooltip
                title = {!isCollapsed ? "Collapse" : "Expand"} 
                placement='right'
            >
                <IconButton onClick = {toggleIsCollapsed} sx={{
                    marginLeft: 'auto', 
                }}>
                   {width > 1000 && <KeyboardTabIcon sx = {{
                        color:'black',
                    }}/>}
                    {width <= 1000 && <i style = {style} className ="fa-solid fa-book-open"></i>}
                </IconButton>
            </Tooltip> }
        </div>
        
       {plansTitles && !isCollapsed &&  <ul>
          {plansTitles[0] ? planElements : <p>You have no plans saved</p>}
        </ul>}
        {!isCollapsed && <div className='alternative-plans'>
            <h3>{alternativePlans === -1 ? "Unlimited" : alternativePlans} alternatives plans {alternativePlans !== -1 && "left"}</h3>
        </div> }
      </animated.div>
  )
}
