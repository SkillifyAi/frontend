import React from 'react'
import httpClient from '../../httpClient'

export default function PricingSmallCard({title,nrPlans,price,switchOn, priceCode, priceCodeYearly}) {

  const handlePay = async () => {
    try {

      const resp = await httpClient.post("http://localhost:5000/stripe/create-checkout-session",{
        priceId: !switchOn ? priceCode : priceCodeYearly
      })
      window.location.href = resp.data.url
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div onClick = {handlePay} className='small-card'>
        <div className='icon'>
            <div></div>
        </div>
        <div>
            <h3>{title}</h3>
            <p>Contains <strong>{nrPlans}</strong> plans</p>
        </div>
        <div className='price'>
            {!switchOn ? price : price * 10}$
        </div>
    </div>
  )
}
