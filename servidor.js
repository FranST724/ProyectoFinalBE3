import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import routesProductos from './routes/routesProductos.js';
import routesLogin from './routes/login.js';
import routesApi from './routes/apiRoutes.js';
import routesRegistro from './routes/registro.js';
import './database/database.js';
import './passport/local.js';
import passport from 'passport';

import cluster from 'cluster';
import os from 'os';

const PORT = process.env.PORT || 8000;
const MODO = process.env.MODO || 'fork';
const nroCPUs = os.cpus().length;

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

if (cluster.isPrimary && MODO === 'cluster') {
	console.log(`🧮 Primary PID ${process.pid} is running. On port ${PORT}. 🧑‍💻 MODO: ${MODO}.`);
	for (let i = 0; i < nroCPUs; i++) {
		cluster.fork(); // crea un proceso por cada cpu disponible
	}
	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	const app = express();

	//Midddlewares
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(express.static('../Public'));

	//Session
	app.use(
		session({
			secret: 'secret',
			resave: true,
			saveUninitialized: true,
			store: MongoStore.create({
				mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.8lz5w.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
				ttl: 60 * 10 // 10 minutos
			})
		})
	);

	/** passport  */
	app.use(passport.initialize()); // Inicializa passport
	app.use(passport.session()); // Enlaza passport con la sesion

	//Rutas
	app.use('/api', routesApi);
	app.use('/productos', routesProductos);
	app.use('/registro', routesRegistro);
	app.use('/', routesLogin);

	const server = app.listen(PORT, () =>
		console.log(
			`🚀 Server started on port ${PORT}. 
       🧑‍🔧 Worker PID: ${process.pid}. 
       🧑‍💻 MODO: ${MODO}.
        at ${new Date().toLocaleString()}`
		)
	);
	server.on('error', (err) => console.log(err));
}
