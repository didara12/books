import React from 'react'
import img from '../images/book_1.png'
import CardHome from '../components/CardHome'

export default function Home() {
  return (
    <>
    <main >
        <section id='section1' className=' '>
          <div className="container ">
            <div className="row justify-content-center">
              <img src={img} className=' col-6   '/>
            </div>
          </div>
        </section>
        <section className='bg-body-tertiary ' style={{paddingBottom:"200px"}}>
          <div className="container-sm">

            <h1 className='pt-5'>Features Of This Book</h1>
            <hr className='w-25  text-info '/>
            <p className='w-50 text-dark-emphasis fw-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, dolor eveniet hic id doloribus molestiae, magni et enim in perferendis adipisci atque, itaque earum voluptatibus quod dolores porro quia? Nostrum!</p>
            
            <div className="row row-cols-3 g-3 ">
              <CardHome/>
              <CardHome/>
              <CardHome/>
              <CardHome/>
              <CardHome/>
              <CardHome/>
              
            </div>

          </div>
        </section>
    </main>
    <footer className='bg-dark text-secondary fw-light py-5'style={{height:'600px'}} >
      <div className="container-md h-100">
        <div className="row gx-2">
          <div className='col'>
            <h4 className='mb-4 text-white'>about us</h4>
            <p className='w-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis fugit voluptas tempora sed quaerat ipsa, id aliquam culpa aspernatur? Iusto </p>
          </div>
          <div className="col">
            <h4 className='mb-4 text-white'>Navigation</h4>
            <p className='m-0'>Home</p>
            <p className='m-0'>Book Author</p>
            <p className='m-0'>About Us</p>
            <p className='m-0'>Team</p>
          </div>
          <div className="col">
            <h4 className='mb-4 text-white'>Quick Contact</h4>
            <form className='vstack gap-3 w-75'>
              <input className='form-control bg-secondary rounded-pill ' placeholder='Name'/>
              <input className='form-control bg-secondary rounded-pill' placeholder='Enter email'/>
              <textarea className='form-control bg-secondary  rounded-5 ' placeholder='Your message'/>
            </form>
          </div>
        </div>

      </div>
      <p className='text-center '> Copyright ©2024 All rights reserved | This template is made  by didara </p>

    </footer>
    </>
  )
}
