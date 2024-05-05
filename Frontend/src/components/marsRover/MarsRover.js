import React, { useState, useRef, useEffect } from 'react';
import './MarsRover.css';

function MarsRover() {
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [dateSelected, setDateSelected] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [animationClass, setAnimationClass] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));


    const dateInputRef = useRef(null);

    console.log(token)
    if(!token){
      window.location.href = '/login';
    }


    useEffect(() => {
        const perseverance = document.getElementById("perseverance");
        const curiosity = document.getElementById("curiosity");
        const povSeletorPerseverance = document.getElementById("pov-select-perseverance");
        const povSeletorCuriosity = document.getElementById("pov-select-curiosity");

        perseverance.addEventListener("change", () => {
            perseverance.classList.add("active");
            curiosity.classList.remove("active");
            povSeletorPerseverance.style.display = "inline-block";
            povSeletorCuriosity.style.display = "none";
        }, false);

        curiosity.addEventListener("change", () => {
            curiosity.classList.add("active");
            perseverance.classList.remove("active");
            povSeletorPerseverance.style.display = "none";
            povSeletorCuriosity.style.display = "inline-block";
        }, false);
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        dateInputRef.current.setAttribute('max', today);
    }, []);

    const getImage = () => {
        const data = new FormData(document.getElementById("form"));
        const roverType = data.get("radio-option");
        const dateForm = data.get("date");
        const roverPovPerseverance = data.get("pov-select-perseverance");
        const roverPovCuriosity = data.get("pov-select-curiosity");
        const apiKey = "8L7BKSz6nOgkc9eukdpAPhIr8aiT9pBukRDZXfZi";
        const URL_Nasa = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

        let povSelected;
        if (roverType === "perseverance") {
            povSelected = roverPovPerseverance;
        } else {
            povSelected = roverPovCuriosity;
        }

        let urlComplete;
        if (povSelected === "all") {
            urlComplete = `${URL_Nasa}${roverType}/photos?earth_date=${dateForm}&api_key=${apiKey}`;
        } else {
            urlComplete = `${URL_Nasa}${roverType}/photos?earth_date=${dateForm}&camera=${povSelected}&api_key=${apiKey}`;
        }

        fetch(urlComplete)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.photos && data.photos.length > 0) {
                    setImageUrls(data.photos.map(photo => photo.img_src));
                    setSelectedDate(data.photos[0].earth_date);
                    setShowAlert(false);
                } else {
                    window.alert("No images found for the selected date and rover.");
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                window.alert("Failed to fetch data. Please try again later.");
            });
    };

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
              <a href="/login" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Mars Rovers Photographies</a>
            </div>
          </li>
        </ol>
      </nav>
            <div className='header'>

            

                <h1 className='fh1'>Mars Rovers Photographies</h1>
                <p className="intro-text">
                    Discover the captivating world of Mars through our collection of rover photographs. Explore the Martian landscape, witness breathtaking vistas, and uncover the wonders of space exploration. Start your journey today and 
                    delve into the beauty of the Red Planet!
                </p>
            

            <form className="form-row" id="form" onSubmit={(e) => { e.preventDefault(); getImage(); }}>

                <div className="rover-selection">
                    <label htmlFor="rover_perseverance" className='rover'>
                        <p className="active" id="perseverance">
                            <input checked type="radio" name="radio-option" value="perseverance" id="rover_perseverance" /> Perseverance
                        </p>
                    </label>
                    <label htmlFor="rover_curiosity" className='rover'>
                        <p id="curiosity">
                            <input type="radio" name="radio-option" value="curiosity" id="rover_curiosity" /> Curiosity
                        </p>
                    </label>
                </div>

                <div className="date-selection">
                    <input type="date" name="date" id="date" ref={dateInputRef} onChange={handleDateChange} className='block2 w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                </div>

                <div className="pov-selection">
                    <select name="pov-select-perseverance" id="pov-select-perseverance">
                        <option value="all">Select the POV</option>
                        <option value="all">All the cameras</option>
                        <option value="navcam_left">Navigation Camera - Left</option>
                        <option value="navcam_right">Navigation Camera - Right</option>
                        <option value="mcz_right">Mast Camera Zoom - Right</option>
                        <option value="mcz_left">Mast Camera Zoom - Left</option>
                        <option value="front_hazcam_left_a">Front Hazard Avoidance Camera - Left</option>
                        <option value="front_hazcam_right_a">Front Hazard Avoidance Camera - Right</option>
                        <option value="rear_hazcam_left">Rear Hazard Avoidance Camera - Left</option>
                        <option value="rear_hazcam_right">Rear Hazard Avoidance Camera - Right</option>
                        <option value="supercam_rmi">SuperCam Remote Micro Imager</option>
                        <option value="rear_hazcam_right">Rear Hazard Avoidance Camera - Right</option>
                    </select>
                    <select name="pov-select-curiosity" id="pov-select-curiosity">
                        <option value="all">Select the POV</option>
                        <option value="all">All the cameras</option>
                        <option value="fhaz">Front Hazard Avoidance Camera</option>
                        <option value="rhaz">Rear Hazard Avoidance Camera</option>
                        <option value="mast">Mast Camera</option>
                        <option value="chemcam">Chemistry and Camera Complex</option>
                        <option value="mahli">Mars Hand Lens Imager</option>
                        <option value="mardi">Mars Descent Imager</option>
                        <option value="navcam">Navigation Camera</option>
                        <option value="pancam">Panoramic Camera</option>
                    </select>
                    <div className="arrow">
                        {/* <label htmlFor="pov-select">
                            <img src="https://1.bp.blogspot.com/-kjKb_TRfNRI/Vn_q0Fk0YsI/AAAAAAAARFg/bNGN-u8XB_Q/s800-Ic42/down.png" alt="" />
                        </label> */}
                    </div>
                </div>

                <div className="find-button" id="btn-submit">
                    <label htmlFor="btn-submit"><img src="assets/lupa.png" className="find-img" alt="" /></label>
                    <input type="submit" value="submit" />
                </div>

            </form>

            <div className="flex flex-wrap">
    {imageUrls.map((imageUrl, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 image-container">
                <img className="rounded-t-lg" src={imageUrl} alt={`Mars Rover - ${index + 1}`} />
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mars Rover Photo {index + 1}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{selectedDate}</p>
                </div>
            </div>
        </div>
    ))}
</div>






{/* <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
        <img class="rounded-t-lg" src={imageUrl} alt={`Mars Rover - ${index + 1}` />
    
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        
    </div>
</div> */}


            <div className="number-of-results" id="search-result-box">
                <p id="search-result"></p>
            </div>

            <div className="content">
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div className="column" id="column1"></div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div className="column" id="column2"></div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div className="column" id="column3"></div>
                    </div>
                </div>
            </div>

            <div className="go-up" id="btn-go-up">
                <img src="https://1.bp.blogspot.com/-kjKb_TRfNRI/Vn_q0Fk0YsI/AAAAAAAARFg/bNGN-u8XB_Q/s800-Ic42/down.png" alt="" />
            </div>

            <div id="popUpImg"></div>
            </div>
        </div>
        
    );
}

export default MarsRover;
