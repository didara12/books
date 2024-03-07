import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {useSelector} from 'react-redux'

export default function ({id,name,description,type}) {

  const {books} = useSelector(state => state.user)

  const handleClick =async ()=>{
    try {
      if(!user.crid) throw new Error('you must sign in first')
      const res = await axios.post('http://localhost:/cut/delete',{id})
    } catch (error) {
      console.log(error.message)
    }
  }

  

  return (

    <div className='card '>
        <div className="card-body row">
            <div className="col-10">
                <div className="card-title"> {name} </div>
                <div className="card-text">{description} </div>
            </div>
            { type === 'uid' && (<button  className='col btn' onClick={handleClick()}><FontAwesomeIcon icon={faTrash}/></button>)}
        </div>
    </div>
  )
}
