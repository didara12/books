import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card'


export default function Listing({type,data}) {
    const [load, setLoad] = useState(true)
    const [sdata,setSdata] = useState([])
    const [error,setError] = useState(null)

 
    useEffect(()=>{
        const f = async ()=>{
          const token = sessionStorage.getItem('token')
            const res = await axios.post('http://localhost:5000/cus/find',{type,data},{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            if(res.data.error) return setError(res.data.error)
            setSdata(res.data)
          console.log('listing',res.data)
        }
        f()
    },[])

  return (
    <>
    {load && !data[0]  ?
      (<div className="text-center"><span className="spinner-border  " ></span></div>) : 
        (<div className='container py-3 w-50'>
        {
          sdata.map(item =>(<Card key={item._id} id={item._id} name={item.name} description={item.description} type={type} />))
        }
      </div>)

    }
    </>
  )
}