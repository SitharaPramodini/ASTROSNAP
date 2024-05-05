import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import test from "../images/test.jpg";
import 'react-datepicker/dist/react-datepicker.css';
// import { useHistory } from 'react-router-dom';
import './APOD.css';

function APOD() {
  // const history = useHistory(); // Initialize useHistory hook
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); // State to store the selected date
  const [dateSelected, setDateSelected] = useState(false); // State to track whether a date is selected
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [animationClass, setAnimationClass] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

  console.log(token)
  if(!token){
    window.location.href = '/login';
  }

  const dateInputRef = useRef(null);

  const apiKey = "8L7BKSz6nOgkc9eukdpAPhIr8aiT9pBukRDZXfZi";
  const url = "https://api.nasa.gov/planetary/apod?";

  // const isLoggedIn = localStorage.getItem('token');
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     history.push('/'); // Redirect to home page if user is not logged in
  //   }
  // }, [isLoggedIn, history]);


  const getImage = () => {
    let date = dateInputRef.current.value;

    // Check if the date string is empty or not a valid date
    if (!date || isNaN(new Date(date))) {
      setShowAlert(true); // Show alert only when the search button is clicked and date is invalid
      return;
    }

    // Convert the date string to ISO format
    let formattedDate = new Date(date).toISOString().split('T')[0];

    fetch(url + "date=" + formattedDate + "&api_key=" + apiKey)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setImageUrl(data.hdurl);
        setDescription(data.explanation);
        setDateSelected(true); // Set the state to true when a date is selected
        setShowAlert(false); // Hide alert when fetching data is successful
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        window.alert("Failed to fetch data. Please try again later.");
      });
  };

  useEffect(() => {
    getImage("hd");
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleButtonClick = () => {
    setAnimationClass('slideOutRight');
    setTimeout(() => {
      window.location.href = '/'; // Replace '/another-page' with your desired URL
    }, 1000); // Adjust the delay to match the animation duration
  };

  return (
    <div className={`App ${animationClass}`}>
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li class="inline-flex items-center">
            <button onClick={handleButtonClick} class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
              </svg>
              Home
            </button>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
              <a href="/filter" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Astronomy Picture of the Day</a>
            </div>
          </li>
        </ol>
      </nav>

      <div className="split-screen-header">
        <h1 className='fh1'>Astronomy Picture of the Day</h1>

        <form className="max-w-md mx-auto">
          <label htmlFor="date-input" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5" />
              </svg>
            </div>
            <input type="date" id="date-input" ref={dateInputRef} onChange={handleDateChange} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
            <button type="button" onClick={getImage} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
          {showAlert && <p className="text-purple-500 text-sm">Enter a date.</p>}
        </form>

      </div>
      {dateSelected && (
        <div className='icontainer'>
          <div className="left-side">
            <figure className="max-w-lg">
              {imageUrl && <img className="h-auto max-w-full rounded-lg" src={imageUrl} alt="Astronomy Picture of the Day" />}
            </figure>
          </div>
          <div className="right-side">
            <h1 className='hh'>description</h1>
            <p id="description">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default APOD;
