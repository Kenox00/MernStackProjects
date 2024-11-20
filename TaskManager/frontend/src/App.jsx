import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ?<Home />: <Navigate to="/login"/>} />
            <Route path="/login" element={!user ?<Login /> : <Navigate to="/"/>} />
            <Route path="/signup" element={!user ?<Signup /> : <Navigate to="/"/>}  />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;