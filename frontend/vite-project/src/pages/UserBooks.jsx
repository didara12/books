import React from 'react'
import Listing from '../components/Listing'
import {  useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function UserBooks() {
    const {user} = useSelector(state => state.user)
    const navigate = useNavigate()

  return (
    <div>
        {user.crid ? (<Listing  type={'uid'} data={user.crid._id}/>) : navigate('/signIn')}
    </div>
  )
}

