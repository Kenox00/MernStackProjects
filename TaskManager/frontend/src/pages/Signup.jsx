// Import necessary modules and hooks from React and custom hook
import React, { useState } from 'react'
import { useSignUp } from '../hooks/useSignUp'

// Define the Signup component
const Signup = () => {
    // Define state variables for email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Destructure signUp function, error and isloading states from useSignUp hook
    const { signUp, error, isloading } = useSignUp()

    // Define the handleSubmit function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Call the signUp function with email and password inputs
        await signUp(email, password);
    }

    // Render the Signup form
    return (
        <form className='signup' onSubmit={handleSubmit}> 
            <h3>Sign Up</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
                value={email}// Bind email input to email state
                autoComplete="email" 
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                value={password} // Bind password input to password state
                autoComplete="new-password"
            />
            <button type="submit" className="btn" disabled={isloading}>Sign Up</button> {/* Disable button if loading */}
            {error && <div className="error">{error}</div>} {/* Display error message if exists */}
        </form>
    )
}

// Export Signup component as default
export default Signup
