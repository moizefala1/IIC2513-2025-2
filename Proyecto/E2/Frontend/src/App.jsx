import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Landing from './pages/Landing/Landing.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Login from './pages/Login/login.jsx';
import Register from './pages/register/register.jsx';
import Navbar from './componentes/navbar/navbar.jsx';
import MainPage from './pages/MainPage/MainPage.jsx';
import DocsPage from './pages/DocsPage/DocsPage.jsx';
import ProfilePage from './pages/Profile/Profile.jsx';
import { useAuth } from './context/authContext';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 16 }}>Cargando…</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isLoggedIn = !!user;
  const shouldShowNavbar = location.pathname !== '/' || isLoggedIn;

  return (
    <div>
      {shouldShowNavbar && <Navbar isLoggedIn={isLoggedIn} onLogout={logout} />}

      <Routes>
        <Route path="/" element={<Landing isLoggedIn={isLoggedIn} user={user} />} />
        <Route path="/about-us" element={<AboutUs isLoggedIn={isLoggedIn} />} />
        <Route path="/docs" element={<DocsPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/mainPage"
          element={
            <RequireAuth>
              <MainPage isLoggedIn={isLoggedIn} />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}