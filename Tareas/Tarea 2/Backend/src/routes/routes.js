const express = require('express');
const router = express.Router();


const usersRouter = require('./users');
const pokemonsRouter = require('./pokemons');
const reviewsRouter = require('./reviews');

router.use('/users', usersRouter);
router.use('/pokemons', pokemonsRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;

