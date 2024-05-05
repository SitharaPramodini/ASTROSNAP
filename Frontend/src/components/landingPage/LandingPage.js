import React, { useState, useEffect } from 'react';
import astronaut from '../images/astronaut.png';
import Button from '@mui/material/Button';
import './LandingPage.css';

function LandingPage() {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass('animate');
  }, []);

  const handleAPODButtonClick = () => {
    setAnimationClass('slideOutLeft');
    setTimeout(() => {
      window.location.href = '/filter'; // Replace '/filter' with your desired URL
    }, 1000); // Adjust the delay to match the animation duration
  };

  const handleMARSButtonClick = () => {
    setAnimationClass('slideOutLeft');
    setTimeout(() => {
      window.location.href = '/mars'; // Replace '/mars' with your desired URL
    }, 1000); // Adjust the delay to match the animation duration
  };

  return (
    <div className={`App ${animationClass}`}>

      <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li class="w-full focus-within:z-10">
          <a href="/" class="inline-block w-full p1-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Home</a>
        </li>
        <li class="w-full focus-within:z-10">
          <button onClick={handleAPODButtonClick} class="inline-block w-full p1-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">APOD</button>
        </li>
        <li class="w-full focus-within:z-10">
          <a href="/mars" onClick={handleMARSButtonClick} class="inline-block w-full p1-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Mars Rover</a>
        </li>
        <li class="w-full focus-within:z-10">
          <a href="#" class="inline-block w-full p1-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Profile</a>
        </li>
      </ul>
      <div className="content-container">
        <img src={astronaut} className={`astronaut-img floating `} alt="Astronaut" width="360" height="490" />
        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <h1 className="multi-line-text"><span>ASTROSNAP</span></h1>
        <p class="font-normal text-gray-700 dark:text-gray-400">
Welcome to AstroSnap! Explore stunning space imagery from NASA's vast archives. From the breathtaking beauty of distant galaxies to the rugged landscapes of Mars, our curated collection offers a glimpse into the wonders of the universe. Join us on an adventure through the cosmos. Start exploring today!</p>

<a onClick={handleAPODButtonClick} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Explore
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</a>
      </div>
    </div>
  );
}

export default LandingPage;
