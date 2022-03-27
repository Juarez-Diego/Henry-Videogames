require('dotenv').config();
const axios = require("axios");
const { Router } = require('express');
const {API_KEY} = process.env;


const router = Router()

const platformsApi = async function(){
    const apiUrl = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    const result = await apiUrl.data.results.map(e => e.name).sort()

    return result;
}

router.get("/", async (req, res) => {
    const platformResults = await platformsApi()
    if(platformResults.length > 0){
        res.json(platformResults)
    }
    else{
        res.status(404).send("No information found")
    }
})

module.exports = router;