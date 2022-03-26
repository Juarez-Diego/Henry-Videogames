import React from 'react';
import { Link } from 'react-router-dom';
import "../LandingPage/LandingPage.css"


export function LandingPage() {
    return (
      <div className='landing-background'>
        <div>
        <h1 className="title">Henry Videogame App</h1>
        <h3 className="description"> A simple web application where you can 
          find any videogame <br/>
            and even create your own.
        </h3>

        <br/>
          <Link to="/home">
             <button className='landing-button'>START</button>
          </Link>
          </div>
      </div>
    )
  };
  
  export default LandingPage;
  