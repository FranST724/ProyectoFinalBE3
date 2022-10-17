import dotenv from 'dotenv';
dotenv.config();
let productosDao;
let carritosDao;
let usuariosDao;

switch (process.env.DB_CONNECTION) {
	case 'mongoDB':
		import('./productosMongoDB.js').then(({ productosMongoDB }) => {
			productosDao = new productosMongoDB();
		});
		import('./carritosMongoDB.js').then(({ carritosMongoDB }) => {
			carritosDao = new carritosMongoDB();
		});
		import('./usuariosMongoDB.js').then(({ usuariosMongoDB }) => {
			usuariosDao = new usuariosMongoDB();
		});
		break;

	default:
		throw new Error('No se ha definido una conexión a la base de datos');
		break;
}

export { productosDao, carritosDao, usuariosDao };
