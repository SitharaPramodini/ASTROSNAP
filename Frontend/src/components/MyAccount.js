import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAccount = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/profile', {
        headers: {
          'Authorization': `Bearer ${token}` // Correct way to concatenate token
        }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        // Handle error
      });
    }
  }, [token]);

  return (
    <div>
      <h1>my account</h1>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          {/* Add more user details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyAccount;
