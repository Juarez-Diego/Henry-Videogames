require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const {API_KEY} = process.env;
const { Videogames, Genres } = require("../db");

const router = Router()

/////////////////////////////////////////// GET VIDEOGAMES FROM API /////////////////////////////////////////////////
const datosApi = async function(name = ""){
    let array = [];
   for(let i = 1; i < 6; i++){
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}&search=${name}`)
        array = array.concat(apiUrl.data.results)
    }
    const total = array.map(e => {
        return {
            id: e.id,
            name: e.name,
            background_image: e.background_image,
            genres: e.genres?.map(e => e.name)
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
    console.log(dbAll)
   const totalDb = await dbAll?.map(e => {
        return {
            id: e.id,
            name: e.name,
            background_image: e.background_image,
            genres: e.Genres?.map(v => v.name)
        }
    });
    console.log(totalDb)
    return totalDb;
}


/////////////////////////////////////////// JOIN VIDEOGAMES FROM API AND DATABSE //////////////////////////////////////
const allVideogames = async function(){
    const api = await datosApi();
    const db = await dbVideogames()
    const all = api.concat(db)
    console.log(all.length)
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

// const searchByName = async (name) => {

//     const nameAxiosApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`);
    
//      const resName = await nameAxiosApi.data.results.map((v) => {
//       return {
//         name: v.name,
//         image: v.background_image,
//         genres: v.genres?.map((v) => v.name)
//       };
//     });
   
//     return resName;
//   };
 
//   const getNamebyDB = async (name) => {
//     const dbInfo = await dbVideoGameInfo();
//     const filterName = dbInfo.filter((videogame) =>
//       videogame.name.includes(name)
//     );
//     return filterName;
//   };
  
//   const getNameInfo = async (name) => {
//     const namebyApi = await getNameByApi(name);
//     const namebyDB = await getNamebyDB(name);
//     const getNameAllInfo = namebyApi.concat(namebyDB);
  
//     return getNameAllInfo;
// };



module.exports = router;