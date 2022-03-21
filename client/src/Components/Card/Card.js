import React from "react";

export function Card({name, rating, description, released, background_image, parent_platforms, genres, id}){
    return(
        <div>
            <img src={background_image} alt="yummy" width="120" height="120" className="card_img"></img>
            <h2>{name}</h2>
            <h3>{genres}</h3>
            <h3>{rating}</h3>
        </div>
    )
}

export default Card;