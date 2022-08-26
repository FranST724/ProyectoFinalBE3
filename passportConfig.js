import passport from 'passport';
import LocalStrategy from 'passport-local';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const encryptPassword = async (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
const comparePassword = async (password, hash) => {
	console.log(password, hash);
	return bcrypt.compareSync(password, hash); // retorna true o false
};

//---------
class MongoClass {
	constructor(collectionName, docSchema) {
		this.collection = mongoose.model(collectionName, docSchema);
	}

	async getAll() {
		try {
			const all = await this.collection.find({});
			return all;
		} catch (err) {
			throw new Error(err);
		}
	}

	async getOne(id) {
		try {
			const one = await this.collection.findById(id);
			return one;
		} catch (err) {
			throw new Error(err);
		}
	}

	async create(doc) {
		console.log(doc);
		try {
			const newDoc = await this.collection.create(doc);
			return newDoc;
		} catch (err) {
			throw new Error(err);
		}
	}

	async update(id, doc) {
		try {
			const updatedDoc = await this.collection.findByIdAndUpdate(id, doc);
			return updatedDoc;
		} catch (err) {
			throw new Error(err);
		}
	}

	async delete(id) {
		try {
			const deletedDoc = await this.collection.findByIdAndDelete(id);
			return deletedDoc;
		} catch (err) {
			throw new Error(err);
		}
	}
}

const usuariosSchema = new mongoose.Schema({
	nombre: {
		type: String
	},
	apellido: {
		type: String
	},
	email: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	imagen: {
		type: String,
		default: ''
	}
});

class MongoDBUsuarios extends MongoClass {
	constructor() {
		super('usuarios', usuariosSchema);
	}

	async findByEmail(email) {
		try {
			const usuario = await this.collection.findOne({ email: email });
			return usuario;
		} catch (err) {
			throw new Error(err);
		}
	}
}

const usersDB = new MongoDBUsuarios();
//---------

passport.use(
	'registro',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			try {
				console.log('======> ');
				const usuario = await usersDB.findByEmail(email);
				if (usuario) {
					return done(null, false, { message: 'El usuario ya existe' });
				}
				req.body.password = await encryptPassword(password);
				const nuevoUsuario = await usersDB.create(req.body);
				console.log(nuevoUsuario);
				return done(null, nuevoUsuario);
			} catch (error) {
				console.log('<===  ERROR  ===> \n');
				console.log(error);
			}
		}
	)
);

passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			console.log(email, password);
			const usuario = await usersDB.findByEmail(email);
			console.log(usuario);
			if (!usuario) {
				return done(null, false, { message: 'El usuario no existe' });
			}
			const isTruePassword = await comparePassword(password, usuario.password);
			if (!isTruePassword) {
				return done(null, false, { message: 'El password es incorrecto' });
			}
			return done(null, usuario);
		}
	)
);

passport.serializeUser((usuario, done) => {
	done(null, usuario.id); // _id de mongo
});

passport.deserializeUser(async (id, done) => {
	const usuario = await usersDB.getOne(id);
	done(null, usuario);
});
