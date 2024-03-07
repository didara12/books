import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function CreateBook() {
    const [load,setLoad] = useState(false)
    const {user} = useSelector(state => state.user)
    const [data,setData] = useState(null)

    const initialValues = {
        name:"",
        type:"",
        description:"",
        price:"",
        images:[],
        phone:"",
    }

    const validationSchema  = Yup.object({
        name: Yup.string().required(),
        type: Yup.string().required(),
        description: Yup.string().max(1000).required(),
        phone: Yup.number().required(),

      })
    
    

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:async(val)=>{
            try {
                if(user.crid === null) throw new Error('user is null')
                setLoad(true)
                const res = await axios.post('http://localhost:5000/cus/auth/add',{...val,uid:user.crid._id})
                setLoad(false)
                res.data.error ? setData(res.data.error) : setData(res.data.suc)
    
            } catch (e) {
                console.log(e.message)
            }
        }
    })


  return (
    <div className='container w-50 text-center'>
        <p className=' fs-2 py-3'>Creat Book</p>
        <form onSubmit={formik.handleSubmit}>
        <input name='name' className='form-control mb-2' placeholder='name' onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange}/>
        {formik.touched.name && formik.errors.name && (<p className='text-danger fw-bold'>{formik.errors.name}</p>) }

        <input name='type' className='form-control mb-2' placeholder='type' onBlur={formik.handleBlur} value={formik.values.type} onChange={formik.handleChange}/>
        {formik.touched.type && formik.errors.type && (<p className='text-danger fw-bold'>{formik.errors.type}</p>) }

        <textarea name='description' className='form-control mb-2' placeholder='description' onBlur={formik.handleBlur} value={formik.values.description} onChange={formik.handleChange}/>
        {formik.touched.description && formik.errors.description && (<p className='text-danger fw-bold'>{formik.errors.description}</p>) }

        <input name='price' type='number' className='form-control mb-2' placeholder='price' onBlur={formik.handleBlur} value={formik.values.price} onChange={formik.handleChange}/>
        {formik.touched.price && formik.errors.price && (<p className='text-danger fw-bold'>{formik.errors.price}</p>) }

        <input name='images' type='file' className='form-control mb-2' placeholder='images' onBlur={formik.handleBlur} value={formik.values.images} onChange={formik.handleChange}/>
        {formik.touched.images && formik.errors.images && (<p className='text-danger fw-bold'>{formik.errors.images}</p>) }

        <input name='phone' className='form-control mb-2' placeholder='phone' onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange}/>
        {formik.touched.phone && formik.errors.phone && (<p className='text-danger fw-bold'>{formik.errors.phone}</p>) }

        <button type='submit' className="btn btn-primary mb-3 py-2 w-25  " >
          {load ? <span className="spinner-border spinner-border-sm " ></span> : <>CREATE</> }
        </button >

        </form>
        {data && (<p>{data}</p>)}
    </div>
  )
}
