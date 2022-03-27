import React from "react";
import "../Paginado/Paginado.css"

export function Paginado({pages, videogamesPerPage, allVideogames}){
const pageNumber = [];

    for(var i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++){
        pageNumber.push(i)
    }
    return(
        <div className="paginado-main">
            <nav>
                <ul>
                    {pageNumber && pageNumber.map(number => {return(
                    <li className="paginado_list" key={number}>
                        <a className="active" onClick={() => pages(number)}>{number}</a> 
                    </li>
                    )})}
                </ul>
            </nav>
        </div>
    )
}

export default Paginado;