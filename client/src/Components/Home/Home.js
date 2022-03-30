import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar.js"
import Filters from "../Filters/Filters";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";

import "../Home/Home.css"
import "../../Images/Rapture.jpg"

import {  getGenres, getVideogames } from "../../Actions";



export function Home(){

const dispatch = useDispatch();
const allVideogames = useSelector(state => state.videogames)
const copyVideogames = useSelector(state => state.allVideogamesCopy)
    // const genres = useSelector(state => state.genres)


 
const [currentPage, setCurrentPage] = useState(1)
const [videogamesPerPage, setVideogamesPerPage] = useState(15)



//Get current videogames
const indexOfLastVideogame = currentPage * videogamesPerPage;
const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; 
const currentVideogame = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

const pages = function(pageNumber) {
	setCurrentPage(pageNumber)
}

// Button to refresh Home
function refresh(e){
    e.preventDefault();
    dispatch(getVideogames());
  }


    return(
        <div className="background-image">
        <div className="home">
            <button className="clear-button" onClick={(e) => refresh(e)}>Clear Filters</button>
            {/* <button className="home-button" onClick={() => window.location.reload(false)}>Clear Filters</button> */}
            
            <SearchBar />
            <Filters />
            
                
                <Paginado 
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    pages={pages}
                />
                

                {allVideogames.length == 0 && allVideogames  ? (<Loading />) :
                <div className="container">
                {
                     Array.isArray(currentVideogame) ? currentVideogame?.map(e => {
                        return (
                            <div className="card">
                        <Fragment>
                             <Link to={`/videogame/${e.id}`} className="card-link" style={{ textDecoration: 'none' }} > 
                             <Card 
                                key={e.id} 
                                name={e.name}
                                genres={e.genres.map(v => v).join(", ")}
                                background_image={e.background_image}
                                id={e.id}
                                rating={e.rating}
                             />
                            </Link>
                         </Fragment>
                         </div>
                    )}) : (<div className="name-not-found"><h1>Videogame not found, please try another search</h1></div>)
                } 
                </div>
                }

        </div> 
        </div>
    )

}

export default Home;