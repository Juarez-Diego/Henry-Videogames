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
            {detailedVideogame.length > 0 ? 
            
                <div>
                    <img src={detailedVideogame[0].background_image} alt="yummy" width="600px" height="300px" ></img>
                    <h1>{detailedVideogame[0].name}</h1>
                    <h2>Genres: {detailedVideogame[0].genres + " "}</h2>
                    <h3>Rating: {detailedVideogame[0].rating}</h3>
                    <h3>Platforms: {detailedVideogame[0].parent_platforms + " "}</h3>

                    <h2>Description</h2>
                    <p>{detailedVideogame[0].description.replace(/<[^>]*>?/g, '')}</p>
                </div> :  <p>Fetching videogame...</p>
            }   
        </div>
    )
}

export default VideogameDetail