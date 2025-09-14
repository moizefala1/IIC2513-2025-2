const express = require('express');
const router = express.Router();
const {User}  = require('../models');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
	try {
		const users = await User.findAll(
			{ attributes: { exclude: ["password"] } }
		);
		res.status(200).json(users);
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/register', async (req, res) => {
	try {
		const { name, image, password} = req.body;
		if (!name || !password) {
			return res.status(400).json({ error: "Falta información necesaria" });
		}
		if (password.length < 4) {
			return res.status(400).json({ error: "La contraseña debe tener al menos 4 caracteres" });
		}
		const existingUser = await User.findOne({ where: { name } });
		if (existingUser) {
			return res.status(400).json({ error: "Ese nombre ya está en uso" });
		}
		
		const user = await User.create({ name, image, password});
	
		const userResponse = await User.findByPk(user.id, {
			attributes: { exclude: ["password"] }
		});
		res.status(201).json({user: userResponse});
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { name, password } = req.body;
		if (!name || !password) {
			return res.status(400).json({ error: "Falta información necesaria"  });
		}
		
		const user = await User.findOne({ where: { name } });
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		
		if (user.password !== password) {
			return res.status(401).json({ error: "Credenciales inválidas" });
		}
				
		const token = jwt.sign(
			{id: user.id }, 
			"PANCONQUESO",
			{expiresIn: '1h'}
		);

		const userResponse = await User.findByPk(user.id, {
			attributes: { exclude: ["password"] }
		});
		
		res.status(200).json({user: userResponse,token });
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id, {
			attributes: { exclude: ["password"] }
		});
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		res.status(200).json({user});
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});


router.put('/:id', auth, async (req, res) => {
	try {
		if (Number(req.params.id) !== Number(req.userId)) { // req.userId viene del auth (decoded.id)
			return res.status(401).json({ error: "No tienes permisos para modificar este usuario" });
		}
		
		const { name, image, password } = req.body;

		const user = await User.findByPk(req.params.id, {
			attributes: { exclude: ["password"] }
		});
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		
		if (name) user.name = name;
		if (image) user.image = image;
		if (password) user.password = password;
	
		await user.save();
		
		const userResponse = await User.findByPk(user.id, {
			attributes: { exclude: ["password"] }
		});
		res.status(200).json({user: userResponse});
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.delete('/:id', auth, async (req, res) => {
	try {
		if (Number(req.params.id) !== Number(req.userId)) {
			return res.status(401).json({ error: "No tienes permisos para modificar este usuario" });
		}	
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		
		await user.destroy();
		res.status(200).json({ message: "Usuario eliminado" });
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});



module.exports = router;