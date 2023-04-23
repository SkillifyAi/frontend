import React from 'react'

import '../../css/home.css'
import MainHome from './MainHome'
import Cards from './Cards'
import UsersFacts from './UsersFacts'
import Reviews from './Reviews'
import Pricing from './Pricing'
import Sample from './Sample'


export default function Home({width, isAuthentificated}) {
  return (
    <main className='home'>
      <MainHome />
      <Cards width = {width}/>
      <Sample width = {width}/>
      <UsersFacts />
      <Reviews width = {width}/>
      <Pricing isAuthentificated={isAuthentificated} width = {width}/>
    </main>
  )
}
