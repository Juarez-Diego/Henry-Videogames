import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
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
      },[])

      useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])

  // Setting the local states: 
// const [loading, setLoading] = useState(false)
const [currentPage, setCurrentPage] = useState(1)
const [videogamesPerPage, setVideogamesPerPage] = useState(15)
// const [temp, setTemp] = useState("")
// const [renderPage, setRenderPage] = useState("")

//Get current videogames
const indexOfLastVideogame = currentPage * videogamesPerPage;
const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; 
const currentVideogame = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

const pages = function(pageNumber) {
	setCurrentPage(pageNumber)
}


    return(
        <div className="home">
            {/* <Nav /> */}
            <h1 className="title">Componente Home</h1>
            <SearchBar />
            <Filters />

            <div>
			<Paginado 
				videogamesPerPage={videogamesPerPage}
				allVideogames={allVideogames.length}
				pages={pages}
			/>
			</div>

            {console.log()}
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