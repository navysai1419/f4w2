import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = ({ token, id }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userData = await response.json();

        if (response.ok) {
          setUser(userData);
        } else {
          setError(userData.message || 'Failed to fetch user data');
        }
      } catch (error) {
        setError('An error occurred, please try again');
      }
    };

    if (token && id) {
      fetchUser();
    }
  }, [token, id]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div className="profile-info">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {user.address && ( 
            <>
              <p>Address: {user.address.city}, {user.address.state}, {user.address.postalCode}</p>
            
            </>
          )}
          <p>Phone Number: {user.phone}</p>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Profile;
