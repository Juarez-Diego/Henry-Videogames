import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { videogameDetails } from "../../Actions";


export function VideogameDetail(){
    
   
const dispatch = useDispatch();
const detailedVideogame = useSelector(state => state.videogameDetail);
const {gameId} = useParams();

useEffect(() => {
    dispatch(videogameDetails(gameId))
},[dispatch, gameId])

    return(
        <div>
            {console.log(detailedVideogame.genres)  }
            
                <div>
                    <img src={detailedVideogame.background_image} alt="yummy" width="600px" height="300px" ></img>
                    <h1>{detailedVideogame.name}</h1>
                    <h2>Genres: {detailedVideogame.genres + " "}</h2>
                    <h3>Rating: {detailedVideogame.rating}</h3>
                    <h3>Platforms: {detailedVideogame.parent_platforms + " "}</h3>

                    <h2>Description</h2>
                    <p>{detailedVideogame.description}</p>
                </div> 
        </div>
    )
}

export default VideogameDetail