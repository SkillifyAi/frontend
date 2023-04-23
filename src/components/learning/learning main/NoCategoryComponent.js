import React from 'react'
import {animated} from '@react-spring/web'
export default function NoCategory({width,isCollapsed,props}) {
  return (
    width < 1000 && isCollapsed && <animated.div style = {props} className='no-category'>
        <i className="fa-solid fa-circle-exclamation"></i>
        <p>Come on, enter a category from the left tab and start learning the skills of your dreams.</p>
    </animated.div>
  )
}
