// src/App.js
import './App.css';
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { useNavigate } from 'react-router-dom';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo);
    console.log("Login successful!", userInfo);
    navigate("/dashboard");
  };

  const handleLogoutSuccess = () => {
    setUser(null);
    console.log("Logout successful!");
    navigate("/");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <h1>Login Page</h1>
        {!user ? (
          <LoginButton onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <LogoutButton onLogoutSuccess={handleLogoutSuccess} />
            <h2>Welcome, {user.name}</h2>
          </>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
