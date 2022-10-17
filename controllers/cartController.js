import fs from 'fs';

class Carts {
	constructor(fileName) {
		//id, timestamp(carrito), productos: [{ id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }, id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }]
		(this.fileName = fileName), (this.carts = []);
	}

	readFile() {
		try {
			var file = fs.readFileSync(this.fileName, 'utf-8');
			if (file) {
				this.carts = file;
				this.carts = JSON.parse(this.carts);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async writeFile() {
		if (this.carts === '') await fs.promises.writeFile(this.fileName, this.carts);
		await fs.promises.writeFile(this.fileName, JSON.stringify(this.carts));
	}

	createAndReturnId(newCart) {
		this.readFile();
		const data = this.getCarts();
		if (data == []) {
			newCart.id = 1;
		} else {
			newCart.id = Math.max(...data.map((cart) => cart.id)) + 1;
		}
		newCart.timeStamp = new Date();
		newCart.productos = [];
		this.carts.push(newCart);
		this.writeFile();
		return newCart;
	}

	getCarts() {
		this.readFile();
		return this.carts;
	}

	deleteCart(cartId) {
		const obj = this.carts.find((obj) => obj.id === cartId || null);
		if (obj) {
			this.carts[obj.id] = '';
			this.writeFile();
			return obj;
		}
	}

	getAll(cartId) {
		this.readFile();
		const obj = this.carts.find((obj) => obj.id === cartId || null);
		if (obj) return obj.productos;
	}

	addProduct(idCart, prod) {
		this.readFile();
		const obj = this.carts.find((obj) => obj.id === idCart || null);
		this.carts[obj.id]['productos'].push(prod);
		this.writeFile();
	}

	deleteById(cartId, idProd) {
		this.readFile();
		const obj = this.carts.find((obj) => obj.id === cartId || null);
		if (obj) {
			if (obj.productos.find((item) => item.id == idProd)) {
				var removeIndex = obj.productos.map((item) => item.id).indexOf(idProd);
				~removeIndex && obj.productos.splice(removeIndex, 1);
				this.writeFile();
				return obj;
			}
		}
	}
}

export default Carts;
