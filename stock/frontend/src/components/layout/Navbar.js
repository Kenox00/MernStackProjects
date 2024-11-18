import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Stock Management
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="hover:text-blue-200">
                Dashboard
              </Link>
              <Link to="/products" className="hover:text-blue-200">
                Products
              </Link>
              <Link to="/stock/history" className="hover:text-blue-200">
                Stock History
              </Link>
              <button
                onClick={logout}
                className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
