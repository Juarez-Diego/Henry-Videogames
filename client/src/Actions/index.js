import axios from "axios";

// Aqui me traigo todas la recetas tanto de la API como de la DB, conexion con el back
export function getVideogames(){
    return async function(dispatch){
        const getAllVideogames = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: getAllVideogames.data  
        })
    }
}

export function getVideogameByName(name){
    return async function(dispatch){
        const searchName = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        return dispatch({
            type: "GET_VIDEOGAME_BY_NAME",
            payload: searchName.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        const genres = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: "GET_GENRES",
            payload: genres.data
        })
    }
}

export function createVideogame(payload){
    return async function(dispatch){
        const create = await axios.post("http://localhost:3001/videogame", payload)  
    }
}

export function videogameDetails(id){
    return async function(dispatch){
        const detail = await axios.get(`http://localhost:3001/videogame/${id}`)
        return dispatch({
            type: "GET_A_VIDEOGAME",
            payload: detail.data
        })
    }
}

export function sortAlphabetically(payload){
    return {
        type: "SORT_ALPHABETICALLY",
        payload
    }
}

export function sortByRating(payload){
    return {
        type: "SORT_BY_RATING",
        payload
    }
}

export function filterByGenres(payload){
    return {
        type: "FILTER_BY_GENRES",
        payload
    }
}

export function filterBySource(payload){
    return {
        type: "FILTER_BY_SOURCE",
        payload
    }
}