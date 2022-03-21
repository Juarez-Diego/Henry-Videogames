import React from "react";
import "../Paginado/Paginado.css"

export function Paginado({pages, videogamesPerPage, allVideogames}){
const pageNumber = [];

    for(var i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++){
        pageNumber.push(i)
    }
    return(
        <div>
            <nav>
                <ul>
                    {
                        pageNumber && pageNumber.map(number => {
                            return(
                                <li key={number}>
                                    <a onClick={() => pages(number)}>{number}</a>
                                    
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Paginado;