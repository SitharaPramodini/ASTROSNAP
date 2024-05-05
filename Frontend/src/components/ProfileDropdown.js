import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileDropdown.css'; // Import ProfileDropdown.css for styling
import profileImageUrl from "./images/test.jpg";

const ProfileDropdown = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    if (onLogout) {
      onLogout(); // Call onLogout callback if provided
    }
    window.location.reload(); // Refresh the page
  };
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option, event) => {
    switch (option) {
      case 'Logout':
        // Handle Logout option click
        console.log('Logout clicked');
        logout(); // Call logout function
        break;
      default:
        console.log('Invalid option');
    }
    setIsDropdownOpen(false); // Close dropdown after option is clicked
    // event.stopPropagation(); // Prevent event propagation to parent element
  };
  
  const dropdownOptions = ['Logout'];

  return (
    <div className="profile-dropdown">
      <div className="profile-picture" onClick={toggleDropdown}>
        <img src={profileImageUrl} alt="Profile" />
      </div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <h1 className='appname'>ASTROSNAP</h1>
            {user ? (
              <div>
                <p className='name'>hello, {user.name}</p>
                <p className='mail'>{user.email}</p>
               
                {dropdownOptions.map((option, index) => (
            <div key={index} className="dropdown-option" onClick={() => handleOptionClick(option)}>
              <button className='logout' onClick={(event) => handleOptionClick('Logout', event)}>Sign out</button>
            </div>
          ))}
              </div>
            ) : (
                <div>
                
                    {dropdownOptions.map((option, index) => (
            <div key={index} className="dropdown-option" onClick={() => handleOptionClick(option)}>
              <a href='/login' className='logout' >Signin</a>
            </div>
          ))}
                </div>
              
            )}
          </div>  
          
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
