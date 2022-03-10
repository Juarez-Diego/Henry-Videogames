require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const {API_KEY} = process.env;
const { Videogame, Genres } = require("../db");

const router = Router()


const datosApi = async function(){
    let array = [];
   for(let i = 1; i < 6; i++){
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
        array = array.concat(apiUrl.data.results)
    }
    return array;
}

const mapeoFinal = async function(){
    const temp = await datosApi()
    const total = temp.map(e => {
        return {
            id: e.id,
            name: e.name,
            background_image: e.background_image,
            genres: e.genres?.map(e => e.name)
        }
    });
    return total;
}
////////////////////////////////////////////////////////////////////////////////////////////
const dbVideogames = async function(){
    const dbAll = await Videogame?.findAll({
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
            genres: e.genres
        }
    })

    return totalDb;
}
////////////////////////////////////////////////////////////////////////////////////////////
const allVideogames = async function(){
    const api = await mapeoFinal();
    const db = await dbVideogames()
    const all = api.concat(db)
    return all;
}


router.get("/", async (req, res) => {

    const {vname} = req.query;
    const finalFunction = await allVideogames(vname)

    if(vname) {
        let videogameName = finalFunction.filter(e => e.name.toLowerCase().includes(vname.toLowerCase()))
        if(videogameName.length > 0) {
            console.log("Ya viste que si se puede Rey?")
            return res.send(videogameName)
    } else {
        res.status(404).send("No hay nada Rey")
    }}
    else {
        res.send(finalFunction)
        }
    
})



module.exports = router;