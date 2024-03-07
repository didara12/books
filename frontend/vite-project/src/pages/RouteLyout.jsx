import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Search from '../components/Search'
import { useSelector } from 'react-redux'
import DropUser from '../components/DropUser'

export default function RouteLyout() {
  const [load,setLoad] = useState(false)
  const {sticky} = useSelector(state => state.user)
  const token = sessionStorage.getItem('token')
  const crid = JSON.parse(sessionStorage.getItem('crid'))


  console.log('RouteLyout::::', sticky)



  return (
    <>
    <div className={`navbar bg-body-secondary  ${sticky?"sticky-top":null}  `}>
      <div className="container">

        <NavLink className='navbar-brand fs-2'>Book</NavLink>
        
        <Search/>

      <button className="btn btn-primary d-md-none " data-bs-toggle='offcanvas' data-bs-target='#test'>
        test
      </button>

      <div className="d-md-block">
        <div className='  d-flex  text-dark-emphasis  offcanvas-md offcanvas-end' id='test'>
          <NavLink to={'/'} className={" nav-link px-2 "} >HOME</NavLink>
          <NavLink to={'About'} className={"nav-link px-2"} >ABOUT</NavLink>

          <div className="dropdown">
            <a  id='navbarDropdownMenuLink'  data-bs-toggle="dropdown" className={"nav-link px-2 btn  "} >Fieldes</a>
            <ul className="dropdown-menu dropdown-menu-end  "  aria-labelledby="navbarDropdownMenuLink">
              <li className={"dropdown-item"}><NavLink to={'matimatique'} className={"nav-link px-2 dropdown-item "} >Matimatique</NavLink></li>
              <li className={"dropdown-item"}><NavLink to={'phisique'} className={"nav-link px-2 dropdown-item  "} >phisique</NavLink></li>
              <li className={"dropdown-item"}><NavLink to={'informatique'} className={"nav-link px-2 dropdown-item"} >informatique</NavLink></li>
            </ul>

          </div>
          {
            !crid && !token  ? 
            (
              <>
              <NavLink to={'SignIn'} className={"nav-link px-2"}  >SignIn</NavLink>
              <NavLink to={'SignUp'} className={"nav-link px-2"} >SignUp</NavLink>   
              </> 
            ):
              <DropUser crid={crid} />
          }
          
        </div>
    
      </div>
    </div>
    </div>
        <div><Outlet/></div>
        
    </>
  )
}
