import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { useState } from "react";

import { getVideogameByName } from "../../Actions";
import "../SearchBar/SearchBar.css"

export function SearchBar(){
const [searchWord, setSearchWord] = useState("")
const dispatch = useDispatch()

const search = useSelector(state => state.videogames)

function handleInputChange(e){
    e.preventDefault()
    setSearchWord(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getVideogameByName(searchWord))
}
    
    return(        
        <div className="searchbar">
            <input className="input" type="text" placeholder="Search by name..." onChange={e => handleInputChange(e)}></input>
            <button type="submit" onClick={e => handleSubmit(e)} className="search-button">Search</button>
        </div>
    )
}

export default SearchBar;