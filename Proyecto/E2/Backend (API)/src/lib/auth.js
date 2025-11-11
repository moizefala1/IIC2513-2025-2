// src/lib/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ROUNDS = 12; // en dev va bien 12

async function hashPassword(plain) {
  return bcrypt.hash(plain, ROUNDS);
}

async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  hashPassword,
  comparePassword,
  signAccessToken,
  verifyAccessToken,
};
