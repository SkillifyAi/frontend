import React from 'react'
import defaultPhoto from '../../images/userBasic.jpg'
export default function LeaderboardUser({number,image,name, email, nrPlans, userPlace, userEmail}) {


  return (
    <div className={`leaderboard-user ${userEmail === email ? "your-user" : ""}`}>
        <p>{number + 1}</p>
        <div className='user-information'>
            <img alt = "Profile" src = {image ? image : defaultPhoto} />
            <h4>{name}</h4>
        </div>
        <p className='plan-number'><strong>{nrPlans}</strong></p>
    </div>
  )
}
