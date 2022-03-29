require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const {API_KEY} = process.env;
const { Videogames, Genres } = require("../db");

const router = Router()


///////////////////////////////////////////GET VIDEOGAMES FROM API/////////////////////////////////////////////////
const getInfoById = async function(idGame) {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games/${idGame}?key=${API_KEY}`);
    let array = [];
    let e = {
            id: apiUrl.data.id,
            name: apiUrl.data.name,
            released: apiUrl.data.released,
            background_image: apiUrl.data.background_image,
            rating: apiUrl.data.rating,
            parent_platforms: apiUrl.data.parent_platforms?.map(e => e.platform.name),
            genres: apiUrl.data.genres?.map(e => e.name),
            description: apiUrl.data.description
        }
         array.push(e)
        return array;
    }

///////////////////////////////////////////GET VIDEOGAMES FROM DATABASE////////////////////////////////////////////
const dbVideogames = async function(vid){
  
    const gameDB = await Videogames?.findOne({
        where: {
            id: vid
        },
        include: {
            model: Genres, 
            attributes: ['name'],
            through: {
                attributes:[]
            }
        }
    })
    let temp = [];
    temp.push(gameDB)
    const totalDb =  temp?.map(e => {
        return {
            id: e.id,
            name: e.name,
            released: e.released,
            background_image: e.background_image,
            rating: e.rating,
            parent_platforms: e.parent_platforms,
            genres: e.Genres?.map(v => v.name),
            description: e.description,
        }
    });
    
    return totalDb;
}




router.get("/:gameId", async (req, res) => {
    
    const { gameId } = req.params;

    try {
        if (gameId.includes("-")) { 
            const dbDetails = await dbVideogames(gameId)
            return res.json(dbDetails );
        }

        const apiDetails = await getInfoById(gameId)
        res.json(apiDetails );

      } catch (err) {
        res.json("Videogame ID not found");
      }
});

module.exports = router;