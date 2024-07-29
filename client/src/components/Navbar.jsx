import React from 'react'
import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
  const {logout} = useLogout()

  const handleLogout=()=>{
    logout()
  }

  const {user} = useAuthContext()

  return (
    <div className='navbar'>
        <Link to='/' className='Header'>
            <div className="">
              <h1>workout planner</h1>
            </div>
        </Link>
        <nav>
          {user && <div className="status">
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>}
          {!user && <div className="auth">
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>}
        </nav>
    </div>
  )
}
