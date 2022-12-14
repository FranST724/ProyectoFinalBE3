import Product from '../../database/models/productosSchema';

export default class ProductsDao {
	async findAllProducts() {
		const products = await Product.find();
		return products;
	}
	async createOneProduct(producto) {
		const productCreated = await Product.create(producto);
		return productCreated;
	}
	async deleteOneProduct(id) {
		const productDeleted = await Product.findByIdAndDelete(id);
		return productDeleted;
	}
	async updateOneProduct(id, producto) {
		const productUpdated = await Product.findByIdAndUpdate(id, producto, {
			new: true // para que devuelva el producto actualizado
		});
		return productUpdated;
	}
}
