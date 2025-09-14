const express = require('express');
const router = express.Router();
const { Pokemon, User } = require('../models');
const auth = require('../middlewares/auth');
const { parse } = require('dotenv');
const e = require('express');

router.get('/', async (req, res) => {
	try {
		const pokemons = await Pokemon.findAll();
		res.status(200).json(pokemons);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		let { name, types, level, image, userId, price} = req.body;
		if (!name || !types || !level || !userId || !price) {
			return res.status(400).json({ error: "Falta información necesaria" });
		}
		if (!(Number.isInteger(price) && price >= 50  && price <= 1000)) {
			return res.status(400).json({ error: "El precio debe ser un número entero entre 50 y 1000" });
		}
		if (!(Number.isInteger(level) && level<=100 && level>=1)) {
			return res.status(400).json({ error: "El nivel debe ser un número entero entre 1 y 100" });
		}	
		const pokemon = await Pokemon.create({ name, types, level, image, userId, price});
		res.status(201).json(pokemon);
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
		console.log(error, error.message);
	}
});

router.get('/user/:id', async (req, res) => {
	try {
		const user = await User.findOne({ where: { id: req.params.id } });
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		const pokemons = await Pokemon.findAll({
			where: { userId: req.params.id }
		});
		res.status(200).json(pokemons);
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/user/:id/on-sale', async (req, res) => {
	try {
		const user = await User.findOne({ where: { id: req.params.id } });
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		const pokemons = await Pokemon.findAll({
			where: { userId: req.params.id, onSale: true }
		});
		res.status(200).json(pokemons);
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});
router.post('/:pokemonId/put-on-sale/:userId', async (req, res) => {
	try {
		const pokemon = await Pokemon.findOne({ where: { id: req.params.pokemonId } });
		if (!pokemon) {
			return res.status(404).json({ error: "Pokemon no encontrado" });
		}
		const user = await User.findOne({ where: { id: req.params.userId } });
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		if (pokemon.onSale) {
			return res.status(400).json({ error: "El pokemon ya está en venta" });
		}
		if (pokemon.userId !== user.id) {
			return res.status(403).json({ error: "No eres el propietario de este pokemon" });
		}
		pokemon.onSale = true;
		await pokemon.save();
		res.status(200).json({ message: "Pokemon agregado a la venta" });
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/:pokemonId/cancel-sale/:userId', async (req, res) => {
	try {
		const pokemon = await Pokemon.findOne({ where: { id: req.params.pokemonId } });
		if (!pokemon) {
			return res.status(404).json({ error: "Pokemon no encontrado" });
		}
		const user = await User.findOne({ where: { id: req.params.userId } });
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		if (!pokemon.onSale) {
			return res.status(400).json({ error: "El pokemon no está en venta" });
		}
		if (pokemon.userId !== user.id) {
			return res.status(403).json({ error: "No eres el propietario de este pokemon" });
		}
		pokemon.onSale = false;
		await pokemon.save();
		res.status(200).json({ message: "Pokemon eliminado de la venta" });
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/:pokemonId/buy/:userId',auth, async (req, res) => {
	try {
		if (Number(req.params.userId) !== Number(req.userId)) {
			return res.status(401).json({ error: "Error de autentificación" });
		}
		const pokemon = await Pokemon.findOne({ where: { id: req.params.pokemonId } });
		const user = await User.findOne({ where: { id: req.params.userId } });
		if (pokemon.price <= user.balance) {
			user.balance -= pokemon.price;
			pokemon.userId = user.id;
			pokemon.onSale = false;
			await user.save();
			await pokemon.save();
			res.status(200).json({ message: "Pokemon comprado" });
		}
		else {
			return res.status(400).json({ error: "No tienes suficiente dinero" });
		}
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put('/:pokemonId/:userId', async (req, res) => {
	try {
		const pokemon = await Pokemon.findOne({ where: { id: req.params.pokemonId } });
		const user = await User.findOne({ where: { id: req.params.userId } });
		if (pokemon.userId !== user.id) {
			return res.status(403).json({ error: "No eres el propietario de este pokemon" })
		}
		let { name, level, types, price, image } = req.body;
		if (name) pokemon.name = name;
		if (types) pokemon.types = types;
		if (level && level<=100 && level>=1){
			pokemon.level = level;
		} 
		else {
			return res.status(400).json({ error: "El nivel debe ser un número entero entre 1 y 100" });
		}

		if (price && Number.isInteger(price) && price >= 50  && price <= 1000){
			pokemon.price = price;
		} 
		else {
			return res.status(400).json({ error: "El precio debe ser un número entero entre 50 y 1000" });
		}
		if (image) pokemon.image = image;

		await pokemon.save();
		res.status(200).json(pokemon);
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.delete('/:pokemonId/:userId', async (req, res) => {
	try {
		const pokemon = await Pokemon.findOne({ where: { id: req.params.pokemonId } });
		const user = await User.findOne({ where: { id: req.params.userId } });
		if (pokemon.userId !== user.id) {
			return res.status(403).json({ error: "No eres el propietario de este pokemon" });
		}
		await pokemon.destroy();
		res.status(200).json({ message: "Pokemon eliminado" });
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});
module.exports = router;
