let productosSocket = [];
const div = document.getElementById('messages');
const btn = document.getElementById('enviar');
const inputNombre = document.getElementById('nombre');
const inputTexto = document.getElementById('texto');
const currentUser = `user-${Math.floor(Math.random() * 100)}`;

getNow = () => {
	const now = new Date();
	return `${now.getHours()}:${now.getMinutes()}`;
};

console.log();
