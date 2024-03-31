
import React from "react"
import Navbar from  "../Component/Nvbar.jsx"
import Footer from  "../Component/Footer.jsx"
import {Outlet} from 'react-router-dom'
export default function Root() {
    return ( 
      <>
    <Navbar/>
    <Outlet/>
   <Footer/>
   </>
   )
  

    
  }
  