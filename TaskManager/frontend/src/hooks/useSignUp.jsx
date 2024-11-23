/**
 * useSignUp hook
 * 
 * This hook is used for signing up a new user.
 * It takes no arguments and returns an object with the following properties:
 * - signUp: a function that takes an email and a password and attempts to sign-up the user.
 * - error: a string containing an error message if the sign-up failed.
 * - isLoading: a boolean indicating if the sign-up is currently in progress.
 * 
 * The hook uses the AuthContext to dispatch a LOGIN event when the sign-up is successful.
 * The user data is stored in the local storage.
 * 
 * The hook also handles errors. If an error occurs during the sign-up process, the error property is set to the error message.
 * If the error is unexpected, it is logged to the console.
 * 
 * The hook returns an object with the above properties.
 */
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";




export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useContext(AuthContext);
  
    const signUp = async (email, password) => {
      setIsLoading(true);
      setError(null);
  
      try {
        console.log('Attempting sign-up with:', { email, password }); // Debug line to show sent data
  
        const response = await fetch('http://127.0.0.1:5000/api/user/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
  
        const json = await response.json();
        console.log('Response data:', json);  data
  
        if (!response.ok) {
          setIsLoading(false);
          setError(json.error || 'Sign-up failed');
        } else {
          localStorage.setItem('user', JSON.stringify(json));
          dispatch({ type: 'LOGIN', payload: json });
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Sign-up error:', err); // Log unexpected errors
        setError('An unexpected error occurred');
        setIsLoading(false);
      }
    };
  
    return { signUp, error, isLoading };
  };
  
