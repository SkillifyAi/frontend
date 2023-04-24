import React,{useState,useEffect} from 'react'
import {useSpring} from '@react-spring/web'

import Categories from './Categories'
import PlanGenerator from './PlanGenerator'
import NoCategoryComponent from './NoCategoryComponent'
import Plan from './Plan'
import httpClient from '../../../httpClient'
import {response } from './AiResponseExample'
import Succes from '../Succes'

export default function MainLearning ({toggleOpenPricing,width,isCollapsed,toggleIsCollapsed, userData}) {

  const [placeholder, setPlaceholder] = useState("")
  const [succes, setSucces] = useState(false)
  const [error,setError] = useState("")
  const [data,setData] = useState({
    mainInfo: "",
    timeLength:"",
    timeType: "",
    moreInfo: ""
  })
  const [responseGenerating,setResponseGenerating] = useState(true)
  const [noCategory,setNoCategory] = useState(false)
  const [title,setTitle] = useState(false)
  const [notEnough, setNotEnough] = useState(false)
  const [openCategory,setOpenCategory] = useState({
    sports:false,
    moneyMaking:false,
    coding:false,
    else:false
  })
  const [inactiveButton,setInactiveButton] = useState(false)
  const [aiResponse,setAiResponse] = useState(response)
  const [errorText, setErrorText] = useState("")
  const handleChange = (event) => {
    const {name,value} = event.target

    if(name === 'mainInfo' && value === '') 
        setInactiveButton(true)
    else if(value !== '') {
        setInactiveButton(false)
    }
    setData(prevState => ({
        ...prevState,
        [name] : value
    }))

}
  const toggleNotEnough = () => setNotEnough(prevState => !prevState)

  const toggleSucces = () => setSucces(prevState => !prevState)

  const checkValidity = () => {

    if(data.mainInfo.length === 0)
    {
      setError("Please specify the skill you want to learn")
      return false
    }
    
    if(/^[0-9]+$/.test(data.timeLength) === false) {
        setError("Time duration should contain letters only")
        return false
    } else if((data.timeType === 'months' && data.timeLength > 2) || 
    (data.timeType === 'weeks' && data.timeLength > 8) ||
    (data.timeType === "days" && data.timeLength > 60)) { 
      setError("Maximum time is 2 months")
      return false
    }
    else { 
      setError("")
      return true
    }
        
  }
  const handleSubmit = async () => {
   
    if( checkValidity() === true) {
      
      setAiResponse("")
      setResponseGenerating(false)
      try {
        const mainInfo = data.mainInfo
        const timeLength = data.timeLength
        const timeType = data.timeType
        const extraInfo = data.moreInfo 
        const resp = await httpClient.post(`http://localhost:5000/chatGpt/?planType=${userData.planType}`,{
          mainInfo,
          timeLength,
          timeType,
          extraInfo
        })
        
        setAiResponse(resp.data)
        setResponseGenerating(Boolean(resp.data))
      } catch(err) {
        console.log(err.response);
        if(err.response.status === 403)
        {
          setNotEnough(true)
          if(err.response.data.message !== "You already have 3 plans generated.")
            toggleOpenPricing()
          setResponseGenerating(true)
          setAiResponse("")
          setErrorText(err.response.data.message)
        } else {
          setResponseGenerating(true)
          setAiResponse("Something went wrong")
        }
        console.log(err);
      }
  }
  }

  const toggleCategory = (event) => {
    let {textContent} = event.target
    if(textContent === "") {
        textContent = event.target.parentNode.textContent
    }
    if(!isCollapsed)
    {
        if(textContent === 'Sports') 
            setOpenCategory({
                sports: true,
                moneyMaking:false,
                coding:false,
                else:false
            })
        else if (textContent === 'Money-making') {
            setOpenCategory({
                sports: false,
                moneyMaking:true,
                coding:false,
                else:false
            })
        }
        else if(textContent === 'Coding') {
            setOpenCategory({
                sports: false,
                moneyMaking:false,
                coding:true,
                else:false
            })
        } else {
            setOpenCategory({
                sports: false,
                moneyMaking:false,
                coding:false,
                else:true
            })
        }
    }
    else {
        let {className} = event.target
        if (className.split(" ")[0] === 'center-item') {
            className = event.target.children[0].className
        }
        className = className.split(" ")[1]
        if(className === 'fa-person-running') {
            setOpenCategory({
                sports: true,
                moneyMaking:false,
                coding:false,
                else:false
            })
        } else if(className === 'fa-money-bill') {
            setOpenCategory({
                sports: false,
                moneyMaking:true,
                coding:false,
                else:false
            })
        } else if(className === 'fa-laptop') {
            setOpenCategory({
                sports: false,
                moneyMaking:false,
                coding:true,
                else:false
            })
        }
        else {
            setOpenCategory({
                sports: false,
                moneyMaking:false,
                coding:false,
                else:true
            })
        }
    }  
    setNoCategory(false)
  }

  useEffect(() => {
    if(openCategory.sports === true) {
      setPlaceholder("Playing chess")
      setTitle("Sports")
    } else if(openCategory.moneyMaking === true ) {
      setPlaceholder("Day trading")
      setTitle("Money-making")
    } else if(openCategory.coding === true) {
      setPlaceholder("Web-development")
      setTitle("Coding")
    } else if(openCategory.else === true) {
      setPlaceholder("Cooking")
      setTitle("Anything else")
    } else setNoCategory(true)
  },[openCategory]) 

  const appearProps = useSpring({
    opacity: noCategory ? '0' : '1',
    transform: noCategory ? 'translateX(-20px)' : 'translateX(0)',
  })

  const mobileAppear = useSpring({
    opacity: !isCollapsed ? '0' : '1',
    display: !isCollapsed ? 'none' : 'flex'
  })

  const savePlan = async () => {
    const {timeLength, timeType, mainInfo} = data
    try {
      const resp = await httpClient.post("http://localhost:5000/plans", {
          timeLength,
          timeType,
          mainInfo,
          aiResponse
      })
      setSucces(resp.data.succes)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='main-learning'>
      <Categories 
        openCategory = {openCategory} 
        toggleCategory = {toggleCategory} 
        isCollapsed={isCollapsed}
        toggleIsCollapsed = {toggleIsCollapsed}
        toggleOpenPricing = {toggleOpenPricing}
        width={width}
        userData = {userData}
      />
      {!noCategory && 
      <PlanGenerator 
        width={width}
        props = {mobileAppear}
        appearProps = {appearProps}
        title={title} 
        data={data} 
        handleSubmit = {handleSubmit} 
        error={error}
        handleChange={handleChange}
        inactiveButton = {inactiveButton}
        userData = {userData}
        toggleOpenPricing = {toggleOpenPricing}
        placeholder = {placeholder}
       />}
      {noCategory && <NoCategoryComponent props = {mobileAppear} width = {width} isCollapsed = {isCollapsed} />}
      {!noCategory && 
      <Plan 
        succes = {succes} 
        toggleSucces={toggleSucces} 
        savePlan = {savePlan} 
        width = {width} 
        props = {mobileAppear}
        responseGenerating = {responseGenerating} 
        aiResponse={aiResponse}
      />}
      <Succes
        open={notEnough}
        handleClose={toggleNotEnough}
        text={errorText}
        type="error"
      />
    </div>
  )
}
