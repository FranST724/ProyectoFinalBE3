import Router from 'express';
const mainScript = 'public/index.js';

const router = Router();

router.get('/', async (req, res) => {
	res.render('login.ejs', { mainScript });
});

router.post('/login', (req, res) => {
	console.log(req.session);
	req.session.nombre = req.body.nombre;
	res.redirect('/productos');
});

router.get('/datos', (req, res) => {
	if (req.session.nombre) {
		res.render('bienvenida.ejs', { nombre: req.session.nombre });
	}
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		res.redirect('/');
	});
});

export default router;
