import React, { useState, useEffect} from 'react'
import {animated,useSpring} from '@react-spring/web'

import '../../css/yourplans.css'
import PlansLeft from './PlansLeft'
import CalendarPlan from './CalendarPlan'
import httpClient from '../../httpClient'
import { Button, IconButton, Toolbar } from '@mui/material'
import DeletPlan from './DeletPlan'
import Succes from '../learning/Succes'
import SavePlan from './SavePlan'
import { useParams, useNavigate } from 'react-router-dom'
export default function YourPlans({width}) {


  const [planDataCopy, setPlanDataCopy] = useState(null)

  const [confirmSave, setConfirmSave] = useState(false)
  const [alternativePlans, setAlternativePlans] = useState(false)
  const [planDeleted, setPlanDeleted] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [plansTitles, setPlansTitles] = useState(null)
  const [isCollapsed,setIsCollapsed] = useState(false)
  const [planData, setPlanData] = useState(null)
  const [editPlan, setEditPlan] = useState(false)

  const handleChange = (event) => {

      if(editPlan)
        setPlanData(prevState => ({...prevState, content:event.target.value}))
  }
  const {id} = useParams()  

  const handleKeyDown = (event) => {
     
    if (editPlan && (event.key === "Backspace" || event.key === "Delete")) {
      setPlanData(prevState => ({...prevState, content:event.target.value}))
    }
    console.log(event.target.value);
  }

  const toggleIsCollapsed = () => setIsCollapsed(prevState => !prevState)

  const toggleConfirmDelete = () => setConfirmDelete(prevState => !prevState)

  const togglePlanDeleted = () => setPlanDeleted(prevState => !prevState)

  const toggleConfirmSave = () => setConfirmSave(prevState => !prevState)

  const navigate = useNavigate()

  const handleClick = async (event) => {

    const route = event.target.innerText
    try {
      const resp = await httpClient.get(`http://localhost:5000/plans/${route}`)

      setPlanData(resp.data.plan)

    } catch (err) {
      console.log(err)
    }
    toggleIsCollapsed()
    navigate(`/your-plans/${route}`)
  }

  const appearProps = useSpring({
    opacity: id ? '1' : '0',
    transform: id ? 'translateX(20px)' : 'translateX(0)',
  })

  useEffect(() => {
    const getPlans = async () => {
        try {
            const resp = await httpClient.get("http://localhost:5000/plans")
            setPlansTitles(resp.data.titles)
            setAlternativePlans(resp.data.alternativePlans)
            console.log(resp.data);
        } catch (err) {
            console.log(err)
        }
    }
    getPlans()
  },[])

  const handleEdit = () => {
    setEditPlan(true)
    setPlanDataCopy(planData)
  }

  const handleSave = async () => {
    setEditPlan(false)
    toggleConfirmSave()
  }
  const changeData = () => setPlanData(planDataCopy)

  return (
    <div className='your-plans'>
    {plansTitles && <PlansLeft 
      plansTitles={plansTitles}
      width={width} 
      isCollapsed={isCollapsed}
      toggleIsCollapsed={toggleIsCollapsed}
      alternativePlans = {alternativePlans}
      handleClick = {handleClick}
    />}
    
  
  {planData && <CalendarPlan  planData = {planData} appearProps = {appearProps} togglePlanDeleted={togglePlanDeleted}/> }
     {planData &&  <animated.div style = {appearProps} className='plan-text'>
        <Button onClick = {toggleConfirmDelete} className='delete-button'>Delete plan</Button>
        <Toolbar
          title={!editPlan ? "Edit" : "Save"}
          sx={{
            position:'absolute',
            top:'100px',
            right:'50px'
          }}
        >
          <IconButton onClick = {!editPlan ? handleEdit : handleSave} className='edit-plan'>
            <i className={`fa-solid ${!editPlan ? "fa-pen-to-square" : "fa-floppy-disk"}`}></i>
          </IconButton>
        </Toolbar>
        <textarea 
          disabled = {!editPlan} 
          value={planData.content} 
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </animated.div> }
      <DeletPlan
        open = {confirmDelete}
        handleClose={toggleConfirmDelete}
        togglePlanDeleted={togglePlanDeleted}
      />
      <Succes
        open={planDeleted}
        handleClose={togglePlanDeleted}
        text = "Plan deleted succesfully"
      />
      <SavePlan
        open = {confirmSave}
        handleClose = {toggleConfirmSave} 
        togglePlanSaved={togglePlanSaved}
        planData = {planData}
        changeData = {changeData}
      />
    </div>
  )
}
