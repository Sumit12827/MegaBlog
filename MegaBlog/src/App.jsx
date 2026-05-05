
import React , {useState , useEffect} from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login , logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  const [loading , setLoading ] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  } , [dispatch])

 return !loading ? (
  <div className='min-h-screen flex flex-col bg-slate-50 text-slate-900'>
    <Header />
    <main className='flex-grow py-8'>
      <Outlet /> 
    </main>
    <Footer />
  </div>
 ) : null
}

export default App
