import passport from 'passport';
import Strategy from 'passport-local';
import Usuarios from '../database/models/usuarioSchema.js';

const LocalStrategy = Strategy;

passport.use(
	'registro',
	new LocalStrategy(
		{
			usernameField: 'user',
			passwordField: 'password',
			passReqToCallback: true
		},
		async (req, user, password, done) => {
			const usuarioBD = await Usuarios.findOne({ user });
			if (usuarioBD) {
				return done(null, false);
			}
			const usuarioNuevo = new Usuarios();
			usuarioNuevo.nombre = user;
			usuarioNuevo.contraseña = password;
			await usuarioNuevo.save();
			done(null, usuarioNuevo);
		}
	)
);

passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'user',
			passwordField: 'password',
			passReqToCallback: true
		},
		async (req, user, password, done) => {
			const usuarioBD = await Usuarios.findOne({ user });
			if (usuarioBD) {
				return done(null, false);
			}
			done(null, usuarioNuevo);
		}
	)
);
