import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing/Landing.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Login from './pages/Login/login.jsx';
import Register from './pages/register/register.jsx';
import Navbar from './componentes/navbar/navbar.jsx';
import MainPage from './pages/MainPage/MainPage.jsx';
import DocsPage from './pages/DocsPage/DocsPage.jsx';
import ProfilePage from './pages/Profile/Profile.jsx';
import { useAuth } from './context/authContext';
import AdminPanel from './pages/AdminPanel/AdminPanel.jsx';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 16 }}>Cargando…</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 16 }}>Cargando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;
  return children;
}

function AppContent() {
  const { user, logout } = useAuth();

  const isLoggedIn = !!user;

  return (
    <div>
      {<Navbar isLoggedIn={isLoggedIn} onLogout={logout} />}

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
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminPanel />
            </RequireAdmin>
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