import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();


  const handleClick = () => {
    logout();
  }
  return (
    <header>
        <div className="container">
            <Link to="/">
            <h1>Workout buddy</h1>
            </Link>
            <nav>
              {user && (
                <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>log out</button>
              </div>
              )}
              {!user &&(
                  <div>
                <Link to = "/login">Login</Link>
                <Link to = "/signup">signup</Link>
              </div>
              )}
            
            </nav>
        </div>
    </header>
  )
}

export default NavBar