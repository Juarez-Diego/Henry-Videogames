import React from "react";
import "../Card/Card.css"

export function Card({name, rating, description, released, background_image, parent_platforms, genres, id}){
    return(
        <div>
            <img src={background_image} alt="yummy" width="120" height="120" className="card_img"></img>
                <div className="card-content">
                    <h2>{name}</h2>
                    <h3>{genres}</h3>
                    <h3>Rating: {rating}</h3>
                </div>
        </div>
    )
}

export default Card;