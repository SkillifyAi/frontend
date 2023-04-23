import React,{useState, useEffect} from 'react'

import '../../css/learning.css'
import LearningHeader from './learning header/LearningHeader'
import MainLearning from './learning main/MainLearning'
import PricingSmall from '../pricing/PricingSmall';
import httpClient from '../../httpClient';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({width}) {

  const [openPricing,setOpenPricing] = useState(false)
  const [isCollapsed,setIsCollapsed] = useState(false)
  const [data,setData] = useState(null)
  const [userPlace , setUserPlace] = useState(0)
  const toggleOpenPricing = () => setOpenPricing(prevState => !prevState)

  const toggleIsCollapsed = () => setIsCollapsed(prevState => !prevState)

  const navigate = useNavigate()
  
  useEffect(() => {
      let isMounted = true
      const getData = async () => {
          try {
              const resp = await httpClient.get('http://localhost:5000/users/profile');
              if(isMounted) {
                  setData(resp.data.user)
                  setUserPlace(resp.data.userPlace)
              }
          } catch (err) {
              console.log(err);
              navigate('/unauthorized')
          }
      }
      getData()
      return () => {
          isMounted = false
      }
  },[navigate])

  return (
    data &&
    <div className='dashboard'>
        <LearningHeader userPlace = {userPlace} data = {data} toggleOpenPricing = {toggleOpenPricing} toggleIsCollapsed = {toggleIsCollapsed} width={width}/>
        <MainLearning userData = {data} toggleOpenPricing = {toggleOpenPricing} width = {width} isCollapsed={isCollapsed} toggleIsCollapsed={toggleIsCollapsed}/>
        <PricingSmall open = {openPricing} handleClose={toggleOpenPricing}/>
    </div>
  )
}
