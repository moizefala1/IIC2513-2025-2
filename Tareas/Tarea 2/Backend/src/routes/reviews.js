const express = require('express');
const router = express.Router();
const {Review, User} = require('../models');

router.get('/', async (req, res) => {
	try {
		const reviews = await Review.findAll();
		res.status(200).json(reviews);
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const reviews = await Review.findAll({
            where: { reviewedId: req.params.userId }
        });

        const reviewsConNombres = await Promise.all(reviews.map(async review => {
            const authorUser = await User.findOne({ where: { id: review.authorId } });
			review.authorName = authorUser.name;
			review.reviewedName = user.name;
			return review
        }));
		// el front espera nombres asi q esta es la medida desesperada !!
		// Promise.all() convierte todas las promesas en una sola
		// y devuelve una promesa que se resuelve cuando todas las promesas se resuelven
		// de esta manera nos aseguramos de que la respuesta a la solicitud contenga el nombre de 
		// el autor y del usuario reseñado

        res.status(200).json(reviewsConNombres);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/', async (req, res) => {
	try {
		const user = await User.findOne({ where: { id: req.body.authorId } });

		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		const reviewedUser = await User.findOne({ where: { id: req.body.reviewedId } });
		if (!reviewedUser) {
			return res.status(404).json({ error: "Usuario a ser reseñado no encontrado" });
		}

		if (req.body.rating && Number.isInteger(req.body.rating) && req.body.rating <= 5 && req.body.rating >= 1){
			const review = await Review.create({
				authorId: req.body.authorId,
				reviewedId: req.body.reviewedId,
				comment: req.body.comment,
				rating: req.body.rating,
				date: new Date()
			});
			res.status(201).json({review});
		} 
		else {
			return res.status(400).json({ error: "La calificación debe ser un número entero entre 1 y 5" });
		}


	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});


router.put('/:id/:userId', async (req, res) => {
	try {
		const review = await Review.findOne({ where: { id: req.params.id } });
		const user = await User.findOne({ where: { id: req.params.userId } });
		if (!review) {
			return res.status(404).json({ error: "Review no encontrado" });
		}
		if (review.authorId !== user.id) {
			return res.status(403).json({ error: "No eres el autor de esta review" });
		}

		const { comment, rating } = req.body;
		if (comment) review.comment = comment;
		if (rating && Number.isInteger(rating) && rating <= 5 && rating >= 1){
			review.rating = rating;
		}
		else {
			return res.status(400).json({ error: "La calificación debe ser un número entero entre 1 y 5" });
		}
		await review.save();

		res.status(200).json({review});
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.delete('/:id/:userId', async (req, res) => {
	try {
		const review = await Review.findOne({ where: { id: req.params.id } });
		const user = await User.findOne({ where: { id: req.params.userId } });
		if (!review) {
			return res.status(404).json({ error: "Review no encontrado" });
		}
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}
		if (review.authorId !== user.id) {
			return res.status(403).json({ error: "No eres el autor de esta review" });
		}
		await review.destroy();
		res.status(200).json({ message: "Review eliminado" });
	} 
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});



module.exports = router;
