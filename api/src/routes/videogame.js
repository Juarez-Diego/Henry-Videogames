require('dotenv').config();
const { Router } = require('express');
const { Videogames, Genres } = require("../db");

const router = Router()

router.post("/", async (req, res) => {

    const {name,  description, released, rating, parent_platforms, background_image, genres} = req.body

    
    if (!name || !description || !released ) return res.status(400).send('Che, te falta algo!')

    const game = await Videogames.create({
        name,
        description,
        released,
        rating,
        parent_platforms,
        background_image,
        genres,
    });

    const searchGenres = await Genres.findAll({
        where: {
            name: genres
        },
    })
    
    game.setGenres(searchGenres);

    res.status(200).send(game)

});



module.exports = router;