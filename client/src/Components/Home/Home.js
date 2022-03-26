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

import { getGenres, getVideogames } from "../../Actions";


export function Home(){

    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames)
    const genres = useSelector(state => state.genres)

    // useEffect(() => {
    //     dispatch(getVideogames())
    //   },[])

    //   useEffect(() => {
    //     dispatch(getGenres());
    // }, [])

  // Setting the local states: 
// const [loading, setLoading] = useState(false)
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
            <button onClick={(e) => refresh(e)}>Clear Filters</button>
            <SearchBar />
            <Filters />
            
                <div className="home_paginado">
                <Paginado 
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    pages={pages}
                />
                </div> 

                {allVideogames.length == 0 && allVideogames  ? (<Loading />) :
                <div className="container">
                {
                    currentVideogame?.map(e => {
                        return (
                            <div className="card">
                        <Fragment>
                             <Link to={`/videogame/${e.id}`} style={{ textDecoration: 'none' }} > 
                             <Card key={e.id} name={e.name} genres={e.genres.map(v => v + ", ")} background_image={e.background_image} id={e.id} rating={e.rating}/>
                            </Link>
                         </Fragment>
                         </div>
                    )})
                } 
                </div>
                }

        </div> 
        </div>
    )

}

export default Home;