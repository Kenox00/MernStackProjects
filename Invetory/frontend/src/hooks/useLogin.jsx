import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Login attempt with:', { email }); // Don't log password

      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
          "body": JSON.stringify({ email, password }),
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', 
      });
      
      const json = await response.json();
      console.log('Server response:', json);

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || 'Login failed');
        console.log('Login failed:', json.error);
      } else {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
        setIsLoading(false);
        console.log('Login successful');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};