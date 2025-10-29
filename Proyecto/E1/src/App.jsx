import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Landing from './pages/Landing/Landing.jsx'
import AboutUs from './pages/AboutUs/AboutUs.jsx'
import Login from './pages/Login/login.jsx'
import Register from './pages/register/register.jsx'
import Navbar from './componentes/navbar/navbar.jsx'
import MainPage from './pages/MainPage/MainPage.jsx';
import DocsPage from './pages/DocsPage/DocsPage.jsx';
import './App.css'

function AppContent({ isLoggedIn,setIsLoggedIn, handleLogout, setUser, user }) {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== '/' || isLoggedIn;

  return (
    <div>
      {shouldShowNavbar && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <Routes>
        <Route 
          path="/" 
          element={<Landing isLoggedIn={isLoggedIn} user={user} />} 
        />

        <Route 
          path="/about-us" 
          element={<AboutUs isLoggedIn={isLoggedIn} />}
        />
        
        <Route 
          path="/docs" 
          element={<DocsPage />}
        />
        
        <Route 
          path="/login" 
          element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} 
        />
        
        <Route 
          path="/register" 
          element={<Register />} 
        />
        
        <Route
          path="/mainPage"
          element={<MainPage isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </div>
  );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
      const savedSession = localStorage.getItem('isLoggedIn');
      return savedSession === 'true';
    });
    
    const [user, setUser] = useState(() => {
      return localStorage.getItem('user') || null;
    });

    useEffect(() => {
      localStorage.setItem('isLoggedIn', isLoggedIn);
      if (user) {
        localStorage.setItem('user', user);
      } else {
        localStorage.removeItem('user');
      }
    }, [isLoggedIn, user]);

    const handleLogout = () => {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    };

  return (
    <Router>
      <AppContent 
        isLoggedIn={isLoggedIn} 
        handleLogout={handleLogout}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        user={user}
      />
    </Router>
  );
}

export default App
