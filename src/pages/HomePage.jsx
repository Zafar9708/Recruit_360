import React from 'react'
import Navbar from '../components/Home/Navbar'
import HeroIllustration from '../components/Home/HeroIllustration'
import RegCards from "../components/Home/RegCards"

function HomePage() {
  return (
    <>
       <div className=' rounded-4xl '>
      <Navbar/>
        </div>
      <HeroIllustration/>
      <RegCards/>
    </>
 
      

  
  )
}

export default HomePage