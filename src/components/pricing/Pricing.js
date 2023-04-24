import React, { useState} from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import '../../css/pricing.css'
import PricingCard from '../home/PricingCard'
import {freePlan, proPlan, enterprisePlan} from '../home/data'
import {premiumPlan} from '../home/data'
import {useSpring,animated} from '@react-spring/web'
import Question from './Question'
import {questions} from '../home/data'
import ContactPopover from '../header/ContactPopover'

export default function Pricing({isAuthentificated}) {

    const [switchOn,setSwitchOn] = useState(false)

    
    const switchProps = useSpring({
        transform: switchOn ? `translateX(40px)` : 'translateX(1px)',
        config: {
            mass: 1,
            tension: 500,
            friction: 30
          }
    })

    const [anchorEl,setAnchorEl] = useState(null)

    const toggleAnchorEl = (event) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

  return (
    <div className='pricing-page'>
        <h1 className='pricing-page-title'>Learn new skills AFFORDABLY with our expert plans.</h1>
        {/* <h4>Learning new skills doesn't have to cost a fortune. With our affordable learning plans, you can acquire valuable knowledge and expertise at an affordable price. </h4> */}
        <div className='pricing-select'>
            <span className={classNames('month',{'month-inactive': switchOn})}>Monthly</span>
            <div className='switch' onClick={() => setSwitchOn(prevState => !prevState)}>
                <animated.div style={switchProps} className='handle'>

                </animated.div>
            </div>
            <span className={classNames('month',{'year-inactive': !switchOn})}>Yearly</span>
         </div>
         <div className='pricing-cards'>
            <PricingCard isAuthentificated = {isAuthentificated} timePrice = {switchOn} data = {freePlan}/>
            <PricingCard isAuthentificated = {isAuthentificated} timePrice = {switchOn} data={premiumPlan} />
            <PricingCard isAuthentificated = {isAuthentificated} timePrice={switchOn} data = {proPlan} />
            <PricingCard isAuthentificated = {isAuthentificated} timePrice={switchOn} data = {enterprisePlan} />
         </div>  
         <div className='FAQ-pricing'>
            <div className='FAQ-title' id = "contact-pricing">
                <h2>Frequently Asked Questions</h2>
                <h4>Have questions? Reach via <a target = "_blank"  rel="noreferrer" href = "https://discord.gg/KZeXgW3ZXB">Discord</a> or <p onClick={toggleAnchorEl}>mail</p></h4>
                <ContactPopover  anchorEl = {anchorEl} containerId={'contact-pricing'} handleClose = {handleClose}/>
            </div>
            <div className='all-questions'>
                <Question question = {questions[0].question} answear={questions[0].answear}/>
                <Question question = {questions[1].question} answear={questions[1].answear}/>
                <Question question = {questions[2].question} answear={questions[2].answear}/>
            </div>
            <span><Link to = "/faq">See more questions</Link></span>
         </div>
    </div>
  )
}
