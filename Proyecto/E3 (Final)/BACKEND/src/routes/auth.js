const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');
const { authenticateToken } = require('../middlewares/auth');
const { Op } = require('sequelize');

const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('El username debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('El username solo puede contener letras, números y guiones bajos'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('age')
    .optional()
    .isInt({ min: 13, max: 120 })
    .withMessage('La edad debe ser entre 13 y 120 años'),
  body('birthday')
    .optional()
    .isISO8601()
    .withMessage('Formato de fecha inválido')
];

const loginValidation = [
  body('email').trim().isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];

// Util
function signTokenFor(userId, username) {
  return jwt.sign(
    { 
      userId,
      isAdmin: username === 'admin'
    }, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // default 1h recomendado
  );
}

function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 1000,
  });
}


// POST /auth/register
router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, age, birthday, image } = req.body;
    
    if (username.toLowerCase() === 'admin') {
      return res.status(403).json({
        error: 'El username "admin" está reservado y no puede ser registrado'
      });
    }
    
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(409).json({
        error: existingUser.email === email
          ? 'El email ya está registrado'
          : 'El username ya está en uso'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword, 
      age: age || null,
      birthday: birthday || null,
      image: image || `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`
    });


    const token = signTokenFor(user.id, user.username);
    setAuthCookie(res, token);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
        age: user.age,
        birthday: user.birthday
      },
      token 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// POST /auth/login
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Error al iniciar sesión', errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = signTokenFor(user.id, user.username);
    setAuthCookie(res, token);

    res.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
        age: user.age,
        birthday: user.birthday
      },
      token 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// POST /auth/logout
router.post('/logout', (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax', 
    path: '/',
  });
  return res.json({ ok: true });
});


router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        image: req.user.image,
        age: req.user.age,
        birthday: req.user.birthday,
        isAdmin: req.user.isAdmin
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener información del usuario' });
  }
});

module.exports = router;
