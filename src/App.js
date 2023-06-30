import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Signup from './auth/Sign-up';
import Login from './auth/Login';
import RequiresAuth from './auth/RequiresAuth';
import { useAuth } from './context-stores/Authcontext';
import Loading from './pages/Loading';

function App() {
  const { loading, user, user_data } = useAuth();

  if (loading) {
    return <Loading />
  }

  return (
    <div className="App">
      <Routes>
        {
          user ? (
            <>
              <Route path="/" element={<RequiresAuth><Home /></RequiresAuth>} />
              <Route path="/home" element={<RequiresAuth><Home /></RequiresAuth>} />
            </>
          ) : (
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
