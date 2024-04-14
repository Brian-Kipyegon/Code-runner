import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Signup from './auth/Sign-up';
import Login from './auth/Login';
import RequiresAuth from './auth/RequiresAuth';
import { useAuth } from './context-stores/Authcontext';
import Loading from './pages/Loading';

function App() {
  // Retrieving user data from authentication context store
  const { loading, user } = useAuth();

  // Component for loading screen.
  if (loading) {
    return <Loading />
  }

  return (
    <div className="App">
      {/* Application Routes */}
      <Routes>
        {
          user ? (
            // Authenticated user routes
            <>
              <Route path="/" element={<RequiresAuth><Home /></RequiresAuth>} />
              <Route path="/home" element={<RequiresAuth><Home /></RequiresAuth>} />
            </>
          ) : (
            // Unauthenticated user routes
            <>
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )
        }
      </Routes>
    </div>
  );
}

export default App;
