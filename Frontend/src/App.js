import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/landingPage/LandingPage';
import APOD from './components/APOD/APOD'
import Navbar from './components/Navbar/Navbar';
import MarsRoverPhotos from './components/marsRover/MarsRover';
import Login from './components/Login/Login';
import MyAccount from './components/MyAccount';
import ProfileDropdown from './components/ProfileDropdown';
// import './App.css'

function App() {

  return (
    <BrowserRouter>
  <ProfileDropdown />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/filter" element={<APOD />} />
        <Route path="/mars" element={<MarsRoverPhotos />} />
        <Route path="/acc" element={<MyAccount />} />
        

        {/* <Route
          path="/allusers"
          element={
            <Sidebar>
              <Layout>
                <UserList />
              </Layout>
            </Sidebar>
          }
        /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

