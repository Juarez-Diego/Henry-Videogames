require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const {API_KEY} = process.env;
const { Videogames, Genres } = require("../db");

const router = Router()

///////////////////////////////////////////GET VIDEOGAMES FROM API/////////////////////////////////////////////////
const datosApi = async function(){
    let array = [];
   for(let i = 1; i < 6; i++){
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
        array = array.concat(apiUrl.data.results)
    }
    const total = array.map(e => {
        return {
            id: e.id,
            name: e.name,
            description: e.description,
            released: e.released,
            rating: e.rating,
            parent_platforms: e.parent_platforms,
            background_image: e.background_image,
            genres: e.genres?.map(e => e.name)
        }
    });
    return total;
}


///////////////////////////////////////////GET VIDEOGAMES FROM DATABASE////////////////////////////////////////////
const dbVideogames = async function(){
    const dbAll = await Videogames?.findAll({
        include: {
            model: Genres,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
   const totalDb = await dbAll?.map(e => {
        return {
            id: e.id,
            name: e.name,
            description: e.description,
            released: e.released,
            rating: e.rating,
            parent_platforms: e.parent_platforms,
            background_image: e.background_image,
            genres: e.genres
        }
    })
    console.log(totalDb)
    return totalDb;
}


///////////////////////////////////////////JOIN VIDEOGAMES FROM API AND DATABSE//////////////////////////////////////
const allVideogames = async function(){
    const api = await datosApi();
    const db = await dbVideogames()
    const all = api.concat(db)
    return all;
}


router.get("/", async (req, res) => {

    const {idGame} = req.params
   
    let finalFunction = await allVideogames()
    console.log(idGame)

    if(idGame) {
        const gameFound = await finalFunction.filter(e => e.id == idGame)
        if(gameFound.length > 0) {
            console.log(gameFound)
            res.status(200).json(gameFound)
        }
        else{
            res.status(404).send("Perdon Rey no hay nada, pero tu tranqui, intentalo de nuevo")
        }
    }
    else{
        res.status(200).json(finalFunction)
    }

});

module.exports = router;