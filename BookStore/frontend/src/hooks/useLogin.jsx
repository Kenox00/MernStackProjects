import { useContext } from "react";
import { Authcontext } from "../context/Authcontext.jsx";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(Authcontext);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting login with:", { email, password });
      const response = await fetch("http://localhost:5555/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log("Response data:", json);

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || "Login failed");
      } else {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};