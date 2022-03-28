require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");const {API_KEY} = process.env;
const { Videogames, Genres } = require("../db");

const router = Router()


/////////////////////////////////////////// GET VIDEOGAMES FROM API /////////////////////////////////////////////////
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
            background_image: e.background_image,
            genres: e.genres?.map(e => e.name),
            rating: e.rating
        }
    });
    return total;
}


/////////////////////////////////////////// GET VIDEOGAMES FROM DATABASE ////////////////////////////////////////////
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
            background_image: e.background_image,
            genres: e.Genres?.map(v => v.name),
            rating: e.rating,
            createdInDb: e.createdInDb
        }
    });
  
    return totalDb;
}


/////////////////////////////////////////// JOIN VIDEOGAMES FROM API AND DATABASE //////////////////////////////////////
const allVideogames = async function(){
    const api = await datosApi();
    const db = await dbVideogames()
    const all = api.concat(db)
    
    return all;
}



////////////////////////////////////////////////// SEARCH BY QUERY /////////////////////////////////////////////////////
const getNameByApi = async function(gameName) {
  const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${gameName}`);

  const game = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      background_image: e.background_image,
      genres: e.genres?.map((v) => v.name),
      rating: e.rating
    };
  });
  
  return game;
};

const getNamebyDB = async function(Gname) {
  const db = await dbVideogames();
  const filterName = db.filter((e) => e.name.toLowerCase().includes(Gname.toLowerCase()));

  return filterName;
};

const getNameAll = async function(GaName) {
  const nameApi = await getNameByApi(GaName);
  const nameDB = await getNamebyDB(GaName);
  const getNameAll = nameApi.concat(nameDB);
 
  return getNameAll;
};


 router.get("/", async (req, res) => {

  const {name} = req.query
  
  if (name) {

    const finalFunction = await getNameAll(name);
    let videogameName = await finalFunction?.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
    videogameName.length ? res.status(200).send(videogameName) : res.status(404).send("Game not found");

  } else {
    const apiAndDB = await allVideogames();
    res.status(200).send(apiAndDB);
  }
});

module.exports = router;