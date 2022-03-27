require('dotenv').config();
const axios = require("axios");
const { Router } = require('express');
const {API_KEY} = process.env;


const router = Router()

const platformsApi = async function(){
    const apiUrl = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    const result = await apiUrl.data.results.map(e => e.name)

    return result;
}

router.get("/", async (req, res) => {
    const platformResults = await platformsApi()
    res.json(platformResults)
})

module.exports = router;