import mongoose from 'mongoose';

import { Schema, model } from 'mongoose';

const productSchema = new Schema({
	nombre: {
		type: String,
		required: true
	},
	descripcion: {
		type: String
	},
	codigo: {
		type: String,
		required: true
	},
	thumbnail: {
		type: String,
		required: true
	},
	precio: {
		type: Number,
		default: 0,
		required: true
	},
	stock: {
		type: Number,
		default: 0
	}
});

export default model('productos', productSchema);
