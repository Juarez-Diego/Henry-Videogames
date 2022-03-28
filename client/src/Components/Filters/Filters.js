import React from "react";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"

import { sortAlphabetically, sortByRating, filterByGenres, filterBySource } from "../../Actions";
import "../Filters/Filters.css"

export function Filters(){

const dispatch = useDispatch()
const [temp, setTemp] = useState("")
const [renderPage, setRenderPage] = useState("")
const [currentPage, setCurrentPage] = useState(1)

function sortAlpha(e){
	e.preventDefault()
	dispatch(sortAlphabetically(e.target.value))
	setTemp("Sorted " + e.target.value)
}

function sortRating(e){
	e.preventDefault()
	dispatch(sortByRating(e.target.value))
}

function filterGenres(e) {
	dispatch(filterByGenres(e.target.value))
	setRenderPage()
};

function filterSource(e){
	e.preventDefault()
	dispatch(filterBySource(e.target.value))
	setRenderPage()
}
 

    return(
        <div className="filters">
            <div>
            <span className="filter-titles">Filter by Source </span>
			<select onChange={e => filterSource(e)} className="filters-source">
			  <option className="filters-option" value="All">All</option>
			  <option className="filters-option" value="API">API</option>
			  <option className="filters-option" value="Database">Database</option>
    		</select>
			</div>


			<div>
            <span className="filter-titles">Alphabetical Order </span>
			<select onChange={e => sortAlpha(e)} className="filters-source">
			  <option className="filters-option" value="Ascending">A-Z</option>
			  <option  className="filters-option" value="Descending">Z-A</option>
		  	</select>
			  </div>

		    <div>
            <span className="filter-titles">Order By Rating </span>
			<select className="filters-source" onChange={e => sortRating(e)}>
			  <option className="filters-option"  value="High">High</option>
			  <option className="filters-option"  value="Low">Low</option>
    		</select>
			</div>

			<div>
            <span className="filter-titles">Filter By Genre </span>
			<select className="filters-source" onChange={e => filterGenres(e)}>
			  	<option className="filters-option" value="All"> All </option>
		      	<option className="filters-option" value="Action">Action</option>
				<option className="filters-option" value="Indie">Indie</option>
				<option className="filters-option" value="RPG">RPG</option>
				<option className="filters-option" value="Adventure">Adventure</option>
				<option className="filters-option" value="Shooter">Shooter</option>
				<option className="filters-option" value="Casual">Casual</option>
				<option className="filters-option" value="Strategy">Strategy</option>
				<option className="filters-option" value="Simulation">Simulation</option>
				<option className="filters-option" value="Puzzle">Puzzle</option>
				<option className="filters-option" value="Platformer">Platformer</option>;
                <option className="filters-option" value="Racing">Racing</option>;
                <option className="filters-option" value="Massively Multiplayer">Massively Multiplayer</option>;
                <option className="filters-option" value="Sports">Sports</option>;
                <option className="filters-option" value="Fighting">Fighting</option>;
                <option className="filters-option" value="Board Games">Board Games</option>;
                <option className="filters-option" value="Educational">Educational</option>;
                <option className="filters-option" value="Card">Card</option>;
			</select>

			</div>
        </div>
    )
}

export default Filters;