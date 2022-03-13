const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRoute = require('./videogames');
const videogameCreate = require('./videogame')
// const videogameById = require('./videogameId')
const genresRoute = require('./genres');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRoute);
router.use('/videogame', videogameCreate)
// router.use('/videogame/:id', videogameById);
router.use('/genres', genresRoute);

module.exports = router;
