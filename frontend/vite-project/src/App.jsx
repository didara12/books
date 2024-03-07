import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'



import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import About from './pages/About';
import SignUp from './pages/SignUp';
import User from './pages/User';
import CreateListing from './pages/CreateListing';
import RouteLyout from './pages/RouteLyout';
import Book from './pages/Book';
import { Provider, useDispatch  } from 'react-redux';
import { store } from './redux/store';
import CreateBook from './pages/CreateBook';
import Matimatique from './pages/Matimatique';
import Phisique from './pages/Phisique';
import Informatique from './pages/Informatique';
import UserBooks from './pages/UserBooks';


function App() {


  const router = createBrowserRouter(
  
    createRoutesFromElements(
      <>

    <Route path='/' element={<RouteLyout/> } >
      <Route index element={<Home/>}  />
      <Route path='signIn' element={<SignIn/>} />
      <Route path='about' element={<About/>} />
      <Route path='signUp' element={<SignUp/>} />
      <Route path='book/:id' element={<Book/>} />
      <Route path='matimatique' element={<Matimatique/>} />
      <Route path='phisique' element={<Phisique/>} />
      <Route path='informatique' element={<Informatique/>} />

      <Route path='user' element={<User/>} >
        <Route path='create-listing' element={<CreateListing/>} />
        <Route path='user-books' element={<UserBooks/>} />
        <Route path='create-book' element={<CreateBook/>} />
      </Route>
      
    </Route>
    
 
      </>
    )
  )
  

  return (

    <div >
    <Provider  store={store} >
            <RouterProvider router={router} />
    </Provider>

    </div>
  )
}

export default App