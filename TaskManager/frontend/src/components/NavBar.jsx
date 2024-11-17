import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <header>
        <div className="container">
            <Link to="/">
            <h1>Workout buddy</h1>
            </Link>
            <nav>
              <div>
                <Link to = "/login">Login</Link>
                <Link to = "/signup">signup</Link>
              </div>
            </nav>
        </div>
    </header>
  )
}

export default NavBar