import Contenedor from '../controllers/clase.js';
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

//Muestra todos los productos
router.get('/', async (req, res) => {
	let productos = await contenedor.getAll();
	res.render('index.ejs', { productos, mainScript });
});

//Muestra productos por su ID
router.get('/:id', (req, res) => {
	const { id } = req.params;
	cont.getById(id) ? res.json(cont.getById(id)) : res.status(404).json({ error: 'producto no encontrado' });
});

// router.post('/', async (req, res) => {
// 	console.log(req.body);
// 	let data = req.body;
// 	let photo = req.file;
// 	data.thumbnail = '/uploads/' + photo.filename;
// 	if (data.title) {
// 		await contenedor.save(data);
// 	}
// 	res.redirect('/productos');
// });

export default router;
