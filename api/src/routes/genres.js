require('dotenv').config();
const axios = require("axios");
const { Router } = require('express');
const {API_KEY} = process.env;
const { Genres } = require("../db");

const router = Router()

const genresApi = async function(){
  let array = [];
  const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

  for(let i = 0; i < apiUrl.data.results.length; i++){
	  array.push(apiUrl.data.results[i].name)
	}
  return array;
}


router.get("/", async (req, res) => {

  const allGenres = await genresApi();

  allGenres.forEach(e => {
      Genres.findOrCreate({
          where: {
            name: e,
          },
        });
  })

  const types = await Genres.findAll();
  res.status(200).json(types);

});


module.exports = router;