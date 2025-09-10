import React, { useState, useEffect } from 'react'; // 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import MyPokemon from './pages/MyPokemonsPage/MyPokemonsPage';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [sesionRevisada, setSesionRevisada] = useState(false);
  
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const data = JSON.parse(storedData); //pasamos string a json
      setCurrentUser(data.user.name);
      setCurrentUserId(data.user.id);
      setIsLoggedIn(true);
    }
    setSesionRevisada(true);
  }, []); //se ejecuta cuando se renderiza para ver si es que esta cargado en local 

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setCurrentUser(data.user.name);
    setCurrentUserId(data.user.id);
    localStorage.setItem("user", JSON.stringify(data)); //pasamos json a string
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
    setCurrentUserId(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Landing currentUser={currentUser} isLoggedIn={isLoggedIn} />} />
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route 
            path='/pokemons' 
            element={<MainPage isLoggedIn={isLoggedIn} currentUserId={currentUserId} sesionRevisada={sesionRevisada} />}
          />
          <Route 
            path='/my-pokemons' 
            element={<MyPokemon isLoggedIn={isLoggedIn} currentUserId={currentUserId} sesionRevisada={sesionRevisada} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;