class Contenedor {
	constructor() {
		this.productos = [
			{
				title: 'IT - Stephen King',
				price: 9000,
				thumbnail: 'https://contentv2.tap-commerce.com/cover/large/9789877253191_1.jpg?id_com=1113',
				id: 1
			},
			{
				title: 'El Camino De Los Reyes - Brandon Sanderson',
				price: 8500,
				thumbnail:
					'https://images.cdn3.buscalibre.com/fit-in/360x360/a8/b9/a8b99ba35498b0cc7cfc150cdf00bbc7.jpg',
				id: 2
			},
			{
				title: 'Juego De Tronos (canción De Hielo Y Fuego 1) - George Martin',
				price: 9000,
				thumbnail: 'https://contentv2.tap-commerce.com/cover/large/9789506442279_1.jpg?id_com=1113',
				id: 3
			},
			{
				title: 'Las Crónicas De Narnia: El Sobrino Del Mago - C. S. Lewis',
				price: 2500,
				thumbnail: 'http://pm1.narvii.com/6748/f62301b03b9713524bf396f9ccc67bfdafcc3c83v2_00.jpg',
				id: 4
			},
			{
				title: 'Diario De Greg: Un Renacuajo - Kinney Jeff',
				price: 2500,
				thumbnail:
					'https://images.cdn2.buscalibre.com/fit-in/360x360/48/43/4843f1c331b4b4bdba59528a9ccc6fa5.jpg',
				id: 5
			}
		];
	}

	async save(objeto) {
		try {
			const IdCount = this.productos.length;
			const newObject = { ...objeto, id: IdCount };
			this.productos.push(newObject);
			return IdCount;
		} catch (error) {
			console.log('error', error);
		}
	}

	async update(objeto, id) {
		try {
			const prevObjectIndex = this.productos.findIndex((element) => {
				return element.id === parseInt(id);
			});
			const newObject = { ...objeto, id: parseInt(id) };
			this.productos[prevObjectIndex] = newObject;
			console.log(prevObjectIndex);
		} catch (error) {
			console.log('error', error);
		}
	}

	async getById(id) {
		try {
			console.log(this.productos);
			const product = this.productos.find((producto) => producto.id === id);
			if (product === undefined) {
				console.log(null);
			} else {
				return product;
			}
		} catch (err) {
			console.log(err);
		}
	}

	async getAll() {
		try {
			return this.productos;
		} catch (err) {
			console.log(err);
		}
	}

	async deleteById(id) {
		try {
			const productId = this.productos.find((producto) => producto.id === id);
			if (productId) {
				const productDelete = this.productos.filter((producto) => producto.id !== id);
				this.productos = productDelete;
				console.log('objeto eliminado exitosamente');
			} else {
				console.log('No hay un producto para eliminar');
			}
		} catch (err) {
			console.log(err);
		}
	}

	async deleteAll() {
		try {
			this.productos = [];
			console.log('todos los objetos fueron eliminados exitosamente');
		} catch (err) {
			console.log(err);
		}
	}
}

export default Contenedor;
