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


    return(
        <div className="detail">
            {console.log(detailedVideogame)}
            {!Array.isArray(detailedVideogame) ? (<div className="name-not-found"><h1>Videogame not found, please try another search</h1></div>) :

            detailedVideogame.length > 0 ? 
            
                <div className="detail-container">
                    <img className="detail-img" src={detailedVideogame[0].background_image} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.dafont.com/forum/attach/orig/9/9/997801.gif"}} alt="yummy" width="600px" height="300px" ></img>

                    <div className="detail-title">
                    <h1>{detailedVideogame[0].name}</h1>
                    </div>

                    <div className="detail-genres">
                    <h2>Genres: {detailedVideogame[0].genres.join(", ")}</h2>
                    </div>

                    <div className="detail-rating">
                    <h3>Rating: {detailedVideogame[0].rating}</h3>
                    </div>

                    <div className="detail-platforms">
                    <h3>Platforms: {detailedVideogame[0].parent_platforms.join(", ")}</h3>
                    </div>

                    <div className="description-title">
                    <h2>Description</h2>
                    </div>

                    <div className="detail-description">
                    <p>{detailedVideogame[0].description.replace(/<[^>]*>?/g, '')}</p>
                    </div>
                        
                </div> :  (<Loading />) 
              }
        </div>
    )
}
//     else{ return detailedVideogame}
// }

export default VideogameDetail;

// : (<div className="name-not-found"><h1>Videogame not found, please try another search</h1></div>)}