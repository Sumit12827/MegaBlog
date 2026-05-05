import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='sticky top-0 z-50 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='60px' />
            </Link>
          </div>
          <ul className='flex ml-auto items-center space-x-2'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-block px-4 py-2 text-slate-600 font-medium duration-200 hover:text-indigo-600 hover:bg-slate-50 rounded-lg'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header