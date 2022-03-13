require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const {API_KEY} = process.env;
const { Videogames, Genres } = require("../db");

const router = Router()

const getInfoById = async function(id) {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    let e = apiUrl.data
        return {
            id: e.id,
            name: e.name,
            released: e.released,
            background_image: e.background_image,
            rating: e.rating,
            parent_platforms: e.parent_platforms?.map(e => e.platform.name),
            genres: e.genres?.map(e => e.name),
            description: e.description
        }
    }



router.get("/:gameId", async (req, res) => {
    
    const { gameId } = req.params;
    console.log(gameId)
  
    if (gameId.includes("-")) {
            
         const gameDB = await Videogames?.findOne({
            where: {
                id: gameId
            },
            include: {
                model: Genres, 
                attributes: ['name'],
                through: {
                    attributes:[]
                }
            }
        })

        res.status(200).json(gameDB)

    }else {
        const apiDetails = await getInfoById(gameId)
        res.status(200).json(apiDetails)
    }
  
});

module.exports = router;