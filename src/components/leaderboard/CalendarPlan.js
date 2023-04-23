import React, { useState, useEffect} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {animated} from '@react-spring/web'
import httpClient from '../../httpClient'
import moment from 'moment'
import PlanCompleted from './PlanCompleted';
import { useParams } from 'react-router-dom';

export default function CalendarPlan({appearProps, planData, togglePlanDeleted}) {

  const [value,setValue] = useState(new Date())
  const [tileContent, setTileContent] = useState({});
  const [planCompleted, setPlanCompleted] = useState(false)
  const handleChange = (nextValue) => { 
    setValue(nextValue)
  }

  const togglePlanCompleted = () => setPlanCompleted(prevState => !prevState)

  const { id } = useParams()

  const rememberDay = async (date) => {
    try { 
      await httpClient.post(`http://localhost:5000/plans/calendar/${id}`,{
        day: date.toISOString()
      })
    } catch (err) {
      console.log(err)
    }
  }
  

  const handleClick = (date) => {
    
    if(isToday(date))
    {
      rememberDay(date)
      setValue(date)
      setTileContent({
        ...tileContent,
        [date.toLocaleDateString()]:true,
      })
    }
      
  }
  const isToday = (compareDate) => {

    const today = new Date()
    // console.log(today);
    return (
      compareDate.getFullYear() === today.getFullYear() &&
      compareDate.getMonth() === today.getMonth() &&
      compareDate.getDate() === today.getDate()
    )
  }

  const checkPlanCompletion = () => {
    const {startDate, endDate} = planData
    const diffInDays = Math.ceil(moment(endDate).diff(moment(startDate), 'days', true))
    if(Object.keys(tileContent).length === diffInDays)
    {
      setPlanCompleted(true)
    }
  }

  useEffect(() => {
    checkPlanCompletion()
  },[tileContent])

  useEffect(() => {
    const getDates = async () => {
     
      try {
        const resp = await httpClient.get(`http://localhost:5000/plans/calendar/${id}`)

        setTileContent(
          Object.assign({}, ...resp.data.days.map(date => {
            const dateItem = new Date(date)
            const dateLocal = dateItem.toLocaleDateString()
            return {[dateLocal]: true}
          })))

      } catch(err) {
        console.log(err)
      }
    }
    getDates()
  },[])

  const tileContentHandler = ({ date, view }) => {
    
    if (view === 'month' && tileContent[date.toLocaleDateString()]) {

      return (
            <div className="tile-content">
              <span role="img" aria-label="checkmark">✔️</span>
           </div>
      )
    }
  }
  
  return (
  tileContent && <animated.div style = {appearProps} className='calendar-container'>
      <h3>Remember your progress</h3>
      <Calendar 
        onChange={handleChange} 
        value={value}
        onClickDay={handleClick}
        tileContent = {tileContentHandler}
      />
      <p>Only check once you finished all tasks from that day</p>
      <div>
        <h3>Days completed: {Object.keys(tileContent).length}</h3>
      </div>
      <PlanCompleted
        open = {planCompleted}
        handleClose = {togglePlanCompleted} 
        togglePlanDeleted={togglePlanDeleted}
      />
    </animated.div>
  )
}
