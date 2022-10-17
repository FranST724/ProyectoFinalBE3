import Router from 'express';
import passport from 'passport';
const mainScript = 'public/index.js';

const router = Router();

router.get('/registro', async (req, res) => {
	res.render('registro.ejs', { mainScript });
});

// autenticar con passport y enviar respuestas al cliente
router.post(
	'/registro',
	passport.authenticate('registro', {
		failureRedirect: '/errorRegistro'
	}),
	(req, res) => {
		console.log('DATA: ', req.body);

		res.status(201).json({
			message: 'Usuario registrado con éxito',
			id: req.user._id,
			email: req.user.email
		});
	}
);

export default router;
