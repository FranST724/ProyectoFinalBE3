import Router from 'express';

import passport from 'passport';
import '../passportConfig.js';
const mainScript = 'public/index.js';

const router = Router();

router.get('/', async (req, res) => {
	res.render('registro.ejs', { mainScript });
});

// router.post('/', (req, res) => {

// 	res.redirect('/productos');
// });

router.post(
	'/',
	// autenticar con passport y enviar respuestas al client
	passport.authenticate('registro', {
		failureRedirect: '/api/registro'
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
