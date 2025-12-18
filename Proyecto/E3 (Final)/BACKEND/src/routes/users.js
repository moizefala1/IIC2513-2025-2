const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { authenticateToken, isAdmin } = require('../middlewares/auth');

// GET /users - Obtener todos los usuarios (requiere ser admin)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// PUT /users/:id - Actualizar usuario (solo el dueño o admin)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        
        if (req.user.id !== userId && req.user.username !== 'admin') {
            return res.status(403).json({ 
                error: 'No tienes permiso para editar este usuario' 
            });
        }
        
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        const { username, email, age, birthday, image } = req.body;
 
        if (username !== undefined && username.toLowerCase() === 'admin' && user.username !== 'admin') {
            return res.status(403).json({
                error: 'El username "admin" está reservado y no puede ser usado'
            });
        }
        

        if (username !== undefined && username !== user.username) {
            const existingUser = await User.findOne({
                where: { username }
            });
            
            if (existingUser) {
                return res.status(409).json({
                    error: 'El username ya está en uso'
                });
            }
        }
        
   
        if (email !== undefined && email !== user.email) {
            const existingEmail = await User.findOne({
                where: { email }
            });
            
            if (existingEmail) {
                return res.status(409).json({
                    error: 'El email ya está en uso'
                });
            }
        }
        
        const updateData = {};
        if (username !== undefined) updateData.username = username;
        if (email !== undefined) updateData.email = email;
        
        if (age !== undefined) {
            if (age === '' || age === null) {
                updateData.age = null;
            } else {
                const parsedAge = parseInt(age);
                if (isNaN(parsedAge)) {
                    return res.status(400).json({ error: 'La edad debe ser un número válido' });
                }
                updateData.age = parsedAge;
            }
        }
        
        if (birthday !== undefined) updateData.birthday = birthday;
        if (image !== undefined) updateData.image = image;
        
        await user.update(updateData);
        
        res.json({
            message: 'Usuario actualizado exitosamente',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                image: user.image,
                age: user.age,
                birthday: user.birthday
            }
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ 
            error: 'Error al actualizar usuario',
            details: error.message 
        });
    }
});

// DELETE /users/:id - Eliminar usuario (solo el dueño o admin)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        
        if (req.user.id !== userId && req.user.username !== 'admin') {
            return res.status(403).json({ 
                error: 'No tienes permiso para eliminar este usuario' 
            });
        }

        const user = await User.findByPk(userId);  
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        await user.destroy();
        
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
});

module.exports = router;