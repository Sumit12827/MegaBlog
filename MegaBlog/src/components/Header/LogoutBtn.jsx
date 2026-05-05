import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

import { LogOut } from 'lucide-react'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='flex items-center space-x-2 px-4 py-2 text-slate-600 font-medium duration-200 hover:text-red-600 hover:bg-red-50 rounded-lg'
    onClick={logoutHandler}
    >
        <span>Logout</span>
        <LogOut className="w-4 h-4" />
    </button>
  )
}

export default LogoutBtn