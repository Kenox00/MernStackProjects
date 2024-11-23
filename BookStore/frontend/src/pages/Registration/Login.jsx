import React, { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin"; // Import the useLogin hook

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin(); // Destructure the login function from useLogin

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    await login(email, password); // Call the login function with email and password
  };
  
  navigate("/");

  const handleRegistration = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Login to Your Account
        </h1>

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
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <div className="text-center text-red-500 text-sm mt-2">{error}</div>
        )}

        <div className="text-center" onClick={handleRegistration}>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;