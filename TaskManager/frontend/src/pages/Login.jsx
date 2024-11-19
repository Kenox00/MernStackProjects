// Login.jsx
import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isloading } = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(email, password);
    }
  return (
    <form className='login' onSubmit={handleSubmit}> 
        <h3>Log In </h3>
        <label>Email:</label>
        <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoComplete="email"
        />
        <label>Password:</label>
        <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        autoComplete="current-password"
        />
        <button type="submit" className="btn" disabled={isloading}>Log in </button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login