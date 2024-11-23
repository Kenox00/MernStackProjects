import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../hooks/useSignup';

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, error, isLoading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signUp(email, password);
    if (data) {
      console.log('Sign-up successful:', data);
      navigate('/signin'); 
    }
  };

  const handleLogin = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Create Account</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Your Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-medium rounded-md transition duration-150 ease-in-out ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </form>

        <div className="text-center" onClick={handleLogin}>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            Already have an account? Login
          </a>
        </div>

        {/* Display error if it exists */}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </div>
    </div>
  );
};

export default Registration;