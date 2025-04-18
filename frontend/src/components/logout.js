import React from 'react';

function Logout({ onLogoutSuccess }) {
  const handleLogout = () => {
    // Clear localStorage/sessionStorage or any user state
    console.log("Logout successful");
    onLogoutSuccess(); // Inform parent
  };

  return (
    <div id="signOutButton">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
