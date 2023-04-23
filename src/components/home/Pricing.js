import React from 'react'

import PricingCard from './PricingCard'
import { freePlan, proPlan, premiumPlan, enterprisePlan } from './data'
import Slide from './Slide'
export default function Pricing({width, isAuthentificated}) {
  return (
    <div className='pricing'>
        <div className='upper-part'>
          <h3 className='pricing-title'>Our pricing plans</h3>
          <p className='pricing-description'>Get started by choosing one of our plans below</p>
        </div>
        <div className='lower-part'>
          <Slide elementClass = {'pricing-container'} number = {0} width = {width} element = {<PricingCard isAuthentificated = {isAuthentificated} data = {freePlan} />}/>
          <Slide elementClass = {'pricing-container'} number = {width > 1000 ? 2 : 1} width={width} element = {<PricingCard isAuthentificated = {isAuthentificated} data = {proPlan} />}/>
          <Slide elementClass = {'pricing-container'} number = {0} width = {width} element = {<PricingCard isAuthentificated = {isAuthentificated} data = {premiumPlan} />}/>
          <Slide elementClass = {'pricing-container'} number = {width > 1000 ? 2 : 1} width={width} element = {<PricingCard isAuthentificated = {isAuthentificated} data = {enterprisePlan} />}/>
        </div>
    </div>
  )
}
