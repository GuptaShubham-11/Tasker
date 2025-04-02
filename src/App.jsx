import './App.css';
import { Layout, Login, Register } from './components';
import { Home, Dashboard, Tasks } from './pages';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from './features/authSlice';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('loggedInUser') === 'true' && user) {
      dispatch(login(user));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;