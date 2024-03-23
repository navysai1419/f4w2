import React, { useState } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [id, setId] = useState(localStorage.getItem('id') || '');

  const handleLogin = (newToken, newId) => {
    setToken(newToken);
    setId(newId);
    localStorage.setItem('token', newToken);
    localStorage.setItem('id', newId);
  };

  const handleLogout = () => {
    setToken('');
    setId('');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  };

  return (
    <div>
      {token ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <Profile token={token} id={id} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
