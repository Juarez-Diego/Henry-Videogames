import React from "react";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"

import { sortAlphabetically, sortByRating, filterByGenres, filterBySource } from "../../Actions";

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
	setCurrentPage(1)
	setTemp("Sorted " + e.target.value)
}
function filterGenres(e) {
	dispatch(filterByGenres(e.target.value))
	setRenderPage()
};

function filterSource(e){
	dispatch(filterBySource(e.target.value))
	setRenderPage()
}
 

    return(
        <div>
            <div>
            <span>Filter by Source: </span>
			<select >
			  {/* <option default value=""></option> */}
			  <option value="API">API</option>
			  <option value="Database">Database</option>
    		</select>
			</div>


			<div>
            <span>Alphabetical Order: </span>
			<select onChange={e => sortAlpha(e)}>
			  <option default value="Choose"></option>
			  <option value="Ascending">A-Z</option>
			  <option value="Descending">Z-A</option>
		  	</select>
			  </div>

		    <div>
            <span>Order By Rating: </span>
			<select onChange={e => sortRating(e)}>
			  {/* <option default value=""></option> */}
			  <option value="High">High</option>
			  <option value="Low">Low</option>
    		</select>
			</div>

			<div>
            <span>Filter By Genre: </span>
			<select onChange={e => filterGenres(e)}>
			  	<option value="All"> All </option>
		      	<option value="Action">Action</option>
				<option value="Indie">Indie</option>
				<option value="RPG">RPG</option>
				<option value="Adventure">Adventure</option>
				<option value="Shooter">Shooter</option>
				<option value="Casual">Casual</option>
				<option value="Strategy">Strategy</option>
				<option value="Simulation">Simulation</option>
				<option value="Puzzle">Puzzle</option>
				<option value="Platformer">Platformer</option>;
                <option value="Racing">Racing</option>;
                <option value="Massively Multiplayer">Massively Multiplayer</option>;
                <option value="Sports">Sports</option>;
                <option value="Fighting">Fighting</option>;
                <option value="Board Games">Board Games</option>;
                <option value="Educational">Educational</option>;
                <option value="Card">Card</option>;
			</select>

			</div>
        </div>
    )
}

export default Filters;