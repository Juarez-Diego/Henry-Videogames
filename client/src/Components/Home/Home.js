import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar.js"
import Filters from "../Filters/Filters";

import Paginado from "../Paginado/Paginado";


import { getGenres, getVideogames } from "../../Actions";


export function Home(){

    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames)
    const genres = useSelector(state => state.genres)

    useEffect(() => {
        dispatch(getVideogames())
      },[dispatch])

    //   useEffect(() => {
    //     dispatch(getGenres());
    // }, [dispatch])

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
        <div className="home">
            <h1 className="title">Componente Home</h1>
            <button onClick={(e) => refresh(e)}>Clear Filters</button>
            <SearchBar />
            <Filters />

            <div>
			<Paginado 
				videogamesPerPage={videogamesPerPage}
				allVideogames={allVideogames.length}
				pages={pages}
			/>
			</div>

            {
				currentVideogame?.map(e => {
					return (
					<Fragment>
					 	<Link to={`/videogame/${e.id}`} style={{ textDecoration: 'none' }}> 
					 	<Card key={e.id} name={e.name} genres={e.genres.map(v => v + " ")} background_image={e.background_image} id={e.id} rating={e.rating}/>
						</Link>
					 </Fragment>
				)})
			}

        </div>
    )
}

export default Home;