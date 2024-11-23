import { useContext } from "react";
import { Authcontext } from "../context/Authcontext.jsx";
import { useState } from "react";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(Authcontext);

  const signUp = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5555/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || 'Sign-up failed';
        } catch (e) {
          errorMessage = `Sign-up failed: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const json = await response.json();
      
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      return json;

    } catch (err) {
      console.error("Sign-up error:", err);
      setError(err.message || "An unexpected error occurred");
      setIsLoading(false);
      return null;
    }
  };

  return { signUp, error, isLoading };
};