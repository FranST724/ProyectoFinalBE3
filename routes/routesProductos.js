import Contenedor from '../clase.js';
import Router from 'express';
import multer from 'multer';
const router = Router();
const mainScript = 'public/index.js';

let contenedor = new Contenedor();

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads');
	}
});
router.use(multer({ storage }).single('thumbnail'));

router.get('/', async (req, res) => {
	console.log('Mostrando todos los productos');
	let productos = await contenedor.getAll();
	res.render('index.ejs', { productos, mainScript });
});

router.post('/', async (req, res) => {
	console.log(req.body);
	let data = req.body;
	let photo = req.file;
	data.thumbnail = '/uploads/' + photo.filename;
	if (data.title) {
		await contenedor.save(data);
	}
	res.redirect('/productos');
});

export default router;
