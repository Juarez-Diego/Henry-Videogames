const { Router } = require('express');
const {API_KEY} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRoute = require('./videogames');
// const genresRoute = require('./genres');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogamesRoute);
// router.use('/genres', genresRoute);

module.exports = router;
