import React,{useContext} from 'react'
import { GetStartedContext } from '../../App'
import httpClient from '../../httpClient';

export default function PricingCard({data,timePrice, isAuthentificated}) {

  const { toggleGetStarted } = useContext(GetStartedContext);

  const listElements = data.benefits.map((item,index) => {
    return <li key={index}><i className="fa-solid fa-square-check"></i>{item}</li>
  })
  const handlePay = async () => {
    try {
      const resp = await httpClient.post("http://localhost:5000/stripe/create-checkout-session",{
        priceId: !timePrice ? data.priceCode : data.priceCodeYearly
      })
      window.location.href = resp.data.url
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className = "price-card">
        <div>
          <h4 className='price-card-title'>{data.title}</h4>
          <p className='price-card-description'>{data.description}</p>
        </div>
        <span className='price-card-cost'>{`$ ${!timePrice ? data.price : data.price * 10} /${!timePrice ? 'month' : 'year'}`}</span>
        <ul className='price-card-benefits'>
        {data.specialBenefit && <li><strong><i className="fa-solid fa-square-check"></i>{data.specialBenefit && data.specialBenefit[1]}</strong></li>}
          {listElements}
          {data.specialBenefit && <li><strong><i className="fa-solid fa-square-check"></i>{data.specialBenefit[0]}</strong></li>}
        </ul>
        <ul className='price-card-not-avaible'>
          {data.notAvaible ? data.notAvaible.map((item, index) => {
            return <li key={index}><i className="fa-solid fa-xmark"></i>{item}</li>
          }) : ""}
        </ul>
        <button onClick = {() => {
          if(isAuthentificated === false)
            toggleGetStarted()
          else {
            handlePay()
          }
        }} className='price-button'>{!isAuthentificated ? "Get started today": "Upgrade your plan"}</button>
    </div>
  )
}
