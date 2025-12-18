const express = require('express');
const router = express.Router();
const { Event, User, Notification, Completed } = require('../models');
const { authenticateToken, isAdmin } = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');

// Validaciones para crear/actualizar eventos
const eventValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ min: 3, max: 200 })
    .withMessage('El título debe tener entre 3 y 200 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('La descripción no puede exceder 1000 caracteres'),
  body('date')
    .notEmpty()
    .withMessage('La fecha es requerida')
    .isISO8601()
    .withMessage('Formato de fecha inválido'),
  body('end_date')
    .optional()
    .isISO8601()
    .withMessage('Formato de fecha inválido')
    .custom((value, { req }) => {
      if (!value) return true; // sin end_date, ok
      // si por alguna razón 'date' no viene, no bloqueamos aquí (ya hay una validación arriba)
      if (!req.body.date) return true;
      return new Date(value) >= new Date(req.body.date);
    })
    .withMessage('end_date no puede ser anterior a date'),
  body('all_day')
    .optional()
    .isBoolean()
    .withMessage('all_day debe ser true o false'),
  body('color')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('Color debe ser un código hexadecimal válido (ej: #FF5733)'), // en realidad este error no deberia verse ya que el frontend escoje un hexadecimal valido siempre
  body('notify')
    .optional()
    .isBoolean()
    .withMessage('Notify debe ser true o false')
];

// GET /events - Obtener todos los eventos del usuario autenticado
router.get('/', authenticateToken, async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Notification,
          attributes: ['id', 'notif_time']
        },
        {
          model: Completed,
          attributes: ['id', 'completion_date']
        }
      ],
      order: [['date', 'ASC']]
    });

    res.json(events);
    console.log(events);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

// GET /events/all - Ver todos los eventos de todos los usuarios (solo admin)
router.get('/all', authenticateToken, isAdmin, async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email']
        },
        {
          model: Notification,
          attributes: ['id', 'notif_time']
        },
        {
          model: Completed,
          attributes: ['id', 'completion_date']
        }
      ],
      order: [['date', 'ASC']]
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

// GET /events/:id - Obtener un evento específico
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email']
        },
        {
          model: Notification,
          attributes: ['id', 'notif_time']
        },
        {
          model: Completed,
          attributes: ['id', 'completion_date']
        }
      ]
    });

    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    if (event.user_id !== req.user.id && req.user.username !== 'admin') {
      return res.status(403).json({
        error: 'No tienes permiso para ver este evento'
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener evento' });
  }
});

// POST /events - Crear un nuevo evento
router.post('/', authenticateToken, eventValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      date,
      end_date,
      all_day,
      color,
      notify
    } = req.body;

    const event = await Event.create({
      user_id: req.user.id,
      title,
      description: description || null,
      date,
      end_date: end_date || null,
      all_day: all_day || false,
      color: color || '#3498DB',
      notify: notify || false
    });

    res.status(201).json({
      message: 'Evento creado exitosamente',
      event
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear evento' });
  }
});

// PUT /events/:id - Actualizar un evento
router.put('/:id', authenticateToken, eventValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    if (event.user_id !== req.user.id && req.user.username !== 'admin') {
      return res.status(403).json({
        error: 'No tienes permiso para editar este evento'
      });
    }

    const {
      title,
      description,
      date,
      end_date,
      all_day,
      color,
      notify
    } = req.body;

    await event.update({
      title: title || event.title,
      description: description !== undefined ? description : event.description,
      date: date || event.date,
      end_date: end_date !== undefined ? end_date : event.end_date,
      all_day: all_day !== undefined ? all_day : event.all_day,
      color: color || event.color,
      notify: notify !== undefined ? notify : event.notify
    });

    // 🔥 Quitar el save redundante: update ya persiste
    // await event.save();

    res.json({
      message: 'Evento actualizado exitosamente',
      event
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar evento' });
  }
});

// DELETE /events/:id - Eliminar un evento
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    if (event.user_id !== req.user.id && req.user.username !== 'admin') {
      return res.status(403).json({
        error: 'No tienes permiso para eliminar este evento'
      });
    }

    await event.destroy();

    res.json({ message: 'Evento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar evento' });
  }
});

// POST /events/:id/complete - Marcar evento como completado
router.post('/:id/complete', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    // Verificar que el evento pertenezca al usuario
    if (event.user_id !== req.user.id) {
      return res.status(403).json({
        error: 'No tienes permiso para completar este evento'
      });
    }

    // Verificar si ya está completado
    const existingCompleted = await Completed.findOne({
      where: { event_id: event.id }
    });

    if (existingCompleted) {
      return res.status(400).json({
        error: 'El evento ya está marcado como completado'
      });
    }

    // Crear registro de completado
    const completed = await Completed.create({
      event_id: event.id,
      completion_date: new Date()
    });

    res.status(201).json({
      message: 'Evento marcado como completado',
      completed
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al completar evento' });
  }
});

// DELETE /events/:id/complete - Desmarcar evento como completado
router.delete('/:id/complete', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    if (event.user_id !== req.user.id) {
      return res.status(403).json({
        error: 'No tienes permiso para modificar este evento'
      });
    }

    const completed = await Completed.findOne({
      where: { event_id: event.id }
    });

    if (!completed) {
      return res.status(404).json({
        error: 'El evento no está marcado como completado'
      });
    }

    await completed.destroy();

    res.json({ message: 'Evento desmarcado como completado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desmarcar evento' });
  }
});

module.exports = router;
