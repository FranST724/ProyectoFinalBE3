import mongoose from 'mongoose';
import 'dotenv/config';
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;

mongoose
	.connect(
		`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.8lz5w.mongodb.net/passportMongoAtlas?retryWrites=true&w=majority`
	)
	.then((response) => console.log('Conectado a la base de datos'))
	.catch((err) => console.log(err));
