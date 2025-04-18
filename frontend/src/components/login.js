import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // <-- FIXED here

function Login({ onLoginSuccess }) {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Login success:", decoded);
    onLoginSuccess(decoded); // Pass user info to parent
  };

  const handleError = () => {
    console.log("Login failed");
  };

  return (
    <div id="signInButton">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

export default Login;
