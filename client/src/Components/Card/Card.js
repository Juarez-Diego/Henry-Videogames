import React from "react";
import "../Card/Card.css"

export function Card({name, rating, description, released, background_image, parent_platforms, genres, id}){

    return(
            
        <div className="card-main">
            <img src={background_image} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.dafont.com/forum/attach/orig/9/9/997801.gif"}} alt="img" width="120" height="120" className="card_img"></img>
                <div className="card-content">
                    <h2 className="card-name">{name}</h2>

                    <div className="card-genres">
                    <h3>{genres}</h3>
                    </div>

                    <div className="card-rating">
                    <h3>Rating: {rating}</h3>
                    </div>
                </div>
        </div>
 
    )
}

export default Card;