import { Select, MenuItem, Button } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import {animated} from '@react-spring/web'

export default function PlanGenerator({title,appearProps,data,handleSubmit,error,handleChange,inactiveButton,props,width, userData, toggleOpenPricing, placeholder}) {

  return (  
    <animated.div style = {width >= 1000 ? appearProps : props} className='plan-generator'>
        <div className='plan-main-description'>
            <h3 className='plan-category-title'>{title}</h3>
            <p>The more information you give the more accurate the plan</p>
        </div>
        <div className='needed-information'>
            <div className='main-information'>
                <label htmlFor='mainInfo'>What skill do you want to learn:</label>
                <textarea
                    value={data.mainInfo}
                    id='mainInfo'
                    name='mainInfo'
                    placeholder={placeholder} 
                    onChange={handleChange}
                />
                <span>Be sure you are in the right category</span>
            </div>
            <div className='time-period'>
                <label htmlFor='time'>Time period:</label>
                <div className='time-inputs'>
                    <input 
                        value={data.timeLength}
                        id = 'time'
                        name ="timeLength"
                        type='number'
                        onChange={handleChange} 
                        placeholder='2'          
                    />
                    <Select
                        onChange={handleChange}
                        value={data.timeType} 
                        name='timeType'
                        className="my-select"
                        sx={{
                            border: '0'
                        }}
                    >
                    <MenuItem value="days">Days</MenuItem>
                    <MenuItem value="weeks">Weeks</MenuItem>
                    <MenuItem value="months">Month</MenuItem>
                    </Select>
                </div>
            </div>
        </div>
        {error && <span className='error'>{error}</span>}
        <div className='more-info'>
            <label htmlFor='textarea-info'>Provide more info:</label>
            {userData.planType !== "Free" && <textarea 
                id = "textarea-info" 
                value = {data.moreInfo}
                name='moreInfo'
                onChange={handleChange}
                placeholder='e.g. your current skill level, your learning style, your goals, your schedule, resources avaible'
            />}
            {userData.planType === 'Free' && <div>
                <i className="fa-solid fa-lock" onClick={toggleOpenPricing}></i>
            </div>}
            {userData.planType === "Free" && <span>Premium only</span>}
        </div>
        <Button onClick = {!inactiveButton ? handleSubmit : () => null} className={classNames('generate-plan-button',{'inactive-button':inactiveButton})}>Generate</Button>
        
      
    </animated.div>
  )
}
