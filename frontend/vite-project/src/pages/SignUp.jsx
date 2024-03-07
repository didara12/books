import React, { useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

export default function SignUp() {
  const [load , setLoad] = useState(false)
  const [e , setE] = useState(null)


  const validationSchema = Yup.object({
    username:Yup.string().max(20).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required()
  })



  const initialValues = {
    username:"",
    email:"",
    password:""
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:async(val)=>{
      setLoad(true)
      const res = await axios.post('http://localhost:5000/general/signUp',val)
      setLoad(false)
      if(res.data.error) setE(res.data.error)
      console.log(res.data)
      
    }
    
  })
  

  return (
    <div className='container w-25 text-center'>
      <div className="card shadow mt-5">
        <div className="card-body">

        <p className='fs-2 my-5'>signUp</p>
      <form onSubmit={formik.handleSubmit}>
        <input name='username' className='form-control mb-2' placeholder='username' onBlur={formik.handleBlur} value={formik.values.username} onChange={formik.handleChange}/>
        {formik.touched.username && formik.errors.username && (<p className='text-danger fw-bold'>{formik.errors.username}</p>) }

        <input name='email' className='form-control mb-2' placeholder='email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}/>
        {formik.touched.email && formik.errors.email && (<p className='text-danger fw-bold'>{formik.errors.email}</p>) }

        <input name='password' className='form-control mb-2' placeholder='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange}/>
        {formik.touched.password && formik.errors.password && (<p className='text-danger fw-bold'>{formik.errors.password}</p>) }

        <button type='submit' className="btn btn-primary mb-3 py-2 w-100 " >
          {load ? <span className="spinner-border spinner-border-sm " ></span> : <>SIGN IN</> }
        </button >

        {e && <p >{e}</p>}

        
      </form>


        </div>
      </div>
    </div>
  )
}
