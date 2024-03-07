import React from 'react'
import ph from '/Users/ayoub/Pictures/TestPic/t2.png'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';


export default function DropUser({crid}) {
  const navigate = useNavigate();

  const {photo,email} = crid
    const rphoto = photo?photo:ph

  const logout = async()=>{
    // const {data} = await axios('http://localhost:5000/logout')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('crid')
    window.location.reload()
    navigate('/')
  }

  return (
    <div className='dropdown  '>
        <button className='btn nav-link' data-bs-toggle="dropdown" id='dropU'><img src={rphoto} className='w-50'/> </button>
        <ul className='dropdown-menu dropdown-menu-end'>
            <li className='dropdown-item d-flex align-items-center disabled'>
                <img src={rphoto} className='me-2' style={{width:"25px",height:"25px"}}/>
                <p className='text-secondary'>{email} </p>
            </li>

            <li><hr className='mb-0 dropdown-divider' /></li>
            
            <li className='dropdown-item hstack ' >
              <FontAwesomeIcon icon={faSignOut}/>
              <button className='btn' onClick={logout}>logout</button>
            </li>
        </ul>
    </div>
  )
}
