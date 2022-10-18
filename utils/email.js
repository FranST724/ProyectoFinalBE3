import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: process.env.USER_ETHEREAL,
		pass: process.env.PASS_ETHEREAL
	}
});

export async function signUpEmail(newUser) {
	const mailOptions = {
		from: '<Franco>',
		to: `${newUser.email}`,
		subject: 'Confirmacion de cuenta',
		html: `
            <h1>Hola ${newUser.fullname}</h1> 
            <p>Gracias por registrarte</p>
            <p>EMAIL: ${newUser.email}</p>
            <p>Si no creaste esta cuenta puedes ignorar el mensaje</p>
            `
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(`Error al enviar el email: ${error}`);
	}
}

export async function checkOutEMail(newOrder) {
	const mailOptions = {
		from: 'Administradora DOLCE <Dolce@ethereal.email>',
		to: TEST_EMAIL,
		subject: `nuevo pedido de ${newOrder.userName}, ${newOrder.userEmail}`,
		html: `<h1>Pedido</h1>
            ${newOrder.products.map((x) => `<li>${x.products}, cantidad: ${x.quantity}</li>`)}
            `
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(`Error al enviar mail de pedido. ${error}`);
	}
}
