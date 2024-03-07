import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuc } from '../redux/userSlice';


export default function SignIn() {

  const [load , setLoad] = useState(false)
  const [e, setE] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const validationSchema  = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  })


  const initialValues = {
    email:"",
    password:""
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:async (val)=>{
      setLoad(true)
      const res = await axios.post('https://books-v4n4.onrender.com/general/signIn',val)
      if(res.data.error) return  setE(res.data.error)
      // sessionStorage.setItem('token',res.data.token)
      sessionStorage.setItem('crid',JSON.stringify(res.data.user))
      setLoad(false)
      window.location.reload()
      navigate('/')
    }
  })


  return (
    <>

    <div className="container  text-center  " style={{width:'35%'}}>

      <div className="card shadow mt-5">
        <div className="card-body">

        <div className="fs-2 fw-bold mb-3 ">sing In</div>
      <form onSubmit={formik.handleSubmit} >

        <div className='mb-3'>
        <input name='email' className={`form-control form-control-lg  ${formik.touched.email && formik.errors.email? "is-invalid":null}`} placeholder='email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
        {/* {formik.touched.email && formik.errors.email && ( <div className="text-start text-danger">{formik.errors.email}</div>)} */}
        <div className="invalid-feedback">{formik.errors.email}</div>
        </div>

        <div className='mb-3'>
        <input name='password' className={`form-control form-control-lg  ${formik.touched.password && formik.errors.password? "is-invalid":null}`} placeholder='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange}/>
        {/* {formik.touched.password && formik.errors.password && (<div className="text-start text-danger">{formik.errors.password}</div>)} */}
        <div className=" invalid-feedback">{formik.errors.password}</div>
        </div>


          <button type='submit' className="btn btn-primary mb-3 py-2 w-100 " >
          {load ? <span className="spinner-border spinner-border-sm " ></span> : <>SIGN IN</> }
          </button >
          
          

      </form>
      <div className='text-danger'>
        {e? e:null}
      </div>


        </div>
      </div>
    </div>
    </>

  )
}
