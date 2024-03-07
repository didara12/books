import React, { useRef, useState } from 'react'
import t3 from '../images/t3.png'

export default function () {
    const [isshadow, setIsshadow] = useState(false)

    const shadow = (b)=>{
        setIsshadow(b)
        console.log('shadow:::',isshadow)

    }
  return (
        <div className={` col-12 col-sm-4 `} >
            <div className={` border p-0 ${isshadow? "shadow" : null} ` }  onMouseOver={()=>{shadow(true)}} onMouseOut={()=>{shadow(false)}} >
                <div className="border-top border-primary p-3 ">
                    <img src={t3} className='mb-3'/>
                    <h5 >Hard Cover</h5>
                    <p className='text-body-tertiary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae magnam quo voluptatibus nulla</p>
                </div>
                
            </div>
        </div>

  )
}
