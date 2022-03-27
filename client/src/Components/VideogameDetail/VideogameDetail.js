import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { videogameDetails } from "../../Actions";
import Loading from "../Loading/Loading";
import "../VideogameDetail/VideogameDetail.css"


export function VideogameDetail(){
    
   
const dispatch = useDispatch();
const detailedVideogame = useSelector(state => state.videogameDetail);
const {gameId} = useParams();

useEffect(() => {
    dispatch(videogameDetails(gameId))
},[dispatch, gameId])

// if(Array.isArray(detailedVideogame)) {
    return(
        <div className="detail">
            
            {detailedVideogame.length > 0 ? 
            
                <div className="detail-container">
                    <img className="detail-img" src={detailedVideogame[0].background_image} alt="yummy" width="600px" height="300px" ></img>
                    <h1 className="detail-title">{detailedVideogame[0].name}</h1>
                    <h2 className="detail-genres">Genres: {detailedVideogame[0].genres.join(", ")}</h2>
                    <h3 className="detail-rating">Rating: {detailedVideogame[0].rating}</h3>
                    <h3 className="detail-platforms">Platforms: {detailedVideogame[0].parent_platforms.join(", ")}</h3>

                    <h2 className="description-title">Description</h2>
                    <p className="detail-description">{detailedVideogame[0].description.replace(/<[^>]*>?/g, '')}</p>
                </div> :  (<Loading />)
            }   
        </div>
    )
}
//     else{ return detailedVideogame}
// }

export default VideogameDetail