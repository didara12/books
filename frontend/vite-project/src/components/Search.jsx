import React, { useRef, useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sticky } from '../redux/userSlice'

export default function Search() {

    const [loud,setLoud] = useState(false)
    const [Cdata,setCdata] = useState([])
    const [oldData,setOldData] = useState([])
    const [shadowClick,setShadowClick] = useState(false)

    const navigate = useNavigate()
    const search = useRef(null)
    const dispatch = useDispatch()

    let initialValues = {
      type:"search",
      search:""
    }
    
    console.log('Search::')

    // const formik = useFormik({
    //     initialValues,
    //     onSubmit:async(val)=>{
    //       const obj = {
    //         type:"name",
    //         name:val.search
    //       }
    //       setLoud(true)
    //       const {data} = await axios.post('http://localhost:5000/cus/find',obj)
    //       setLoud(false)
    //       setData(data)
    //       console.log(data)
    //     }
    //   })

    const handleChange =async (e)=>{
        if(e.target.value === "") return
        initialValues.search = e.target.value
        
        if(oldData[0] === null) setLoud(true)
        const {data} =await axios.post('http://localhost:5000/cus/find',initialValues)
        setLoud(false)
        setOldData(Cdata)
        setCdata(data)
      }


    const handleSubmit =async (e)=>{
      e.preventDefault()

      if(search.current.value === "") return
      initialValues.search = search.current.value
    
      setLoud(true)
      const {data} =await axios.post('http://localhost:5000/cus/find',initialValues)
      setLoud(false)

    }

    // const submit = (id)=>{
    //   console.log("working")
    //   navigate(`book/${id}`)
    // }

    const handleClick = (id)=>{
      navigate(`book/${id} `)
      window.location.reload()
    }

    const serchClick = ()=>{
      dispatch(sticky(false))
    }

    const handleBlur = ()=>{
      dispatch(sticky(true))
    }

    const shadowClic = (x)=>{
      setShadowClick(x)
    }

  return (

    <div className="" style={{ width:'500px'}}>
      <div className="dropdown-center " >
        {/* <input   className='form-control  py-2 dropdown-toggle' placeholder='Search'  data-bs-toggle="dropdown" aria-expanded="false"/> */}
          <input name='search' type='search' onSubmit={handleSubmit} ref={search}  onChange={handleChange} onClick={()=>shadowClic(true)} onBlur={()=> shadowClic(false)}  className={`form-control  py-2 dropdown-toggle w-75 ${shadowClick? 'shadow' : null}`} placeholder='Search' data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" />


        {Cdata && <ul class="dropdown-menu w-100 overflow-auto w-50 shadow" style={{height:'200px', width:'300px'}} >
                         {
                             loud  ? (<li className=' h-100 text-center  '> <span className='spinner-border '/> </li>) :
                             // <div className='list-group list-group-flush'>{Cdata.map(item => ( <NavLink key={item._id} to={`book/${item._id}`} className='list-group-item list-group-item-action list-group-item-light '> {item.name }</NavLink> ))} </div>
                             <li className='list-group list-group-flush'>{Cdata.map(item => (<button key={item._id} type='button w-100' onClick={()=>{handleClick(item._id)}} className='list-group-item list-group-action'> {item.name } </button> ))} </li>
                         }
        </ul>}
      </div>
    </div>



    // <div className="w-25">
    //     <button className='btn w-100 p-0 ' onClick={serchClick} data-bs-toggle="modal" data-bs-target='#search'  >
    //         <input   className='form-control  py-2 ' placeholder='Search'  />
    //     </button>

    //     <div className="modal " id="search" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onBlur={handleBlur}>
    //         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable  ">
    //             <div className="modal-content h-50">
    //                 <div className="modal-header">
    //                   {/* <form onSubmit={formik.handleSubmit} className='d-flex w-100'>
    //                         <input name='search' value={formik.values.search} onChange={formik.handleChange} className='form-control' placeholder='Search'/>
    //                     </form> */}
    //                     <form onSubmit={handleSubmit} className='d-flex w-100'>
    //                         <input name='search' type='search' ref={search}  onChange={handleChange}  className='form-control ' placeholder='Search' />
    //                     </form>
    //                 </div>
    //                 <div className="modal-body  ">

    //                     {
    //                         loud  ? (<div className=' h-100 text-center  '> <span className='spinner-border '/> </div>) :
    //                         // <div className='list-group list-group-flush'>{Cdata.map(item => ( <NavLink key={item._id} to={`book/${item._id}`} className='list-group-item list-group-item-action list-group-item-light '> {item.name }</NavLink> ))} </div>
    //                         <div className='list-group list-group-flush'>{Cdata.map(item => (<button key={item._id} type='button w-100' onClick={()=>{handleClick(item._id)}} className='list-group-item list-group-action'> {item.name } </button> ))} </div>
    //                     }

    //                 </div>
    //              </div>
    //         </div>
    //     </div>

    // </div>

  )
}
