import { UserModel } from "../models/user.model.js";

const createUser = async (req, res) => {
	// funcion para crear un nuevo usuario, toma como argumento req y res
	try {
		const { username, email, password } = req.body; // se obtienen los datos del body

		const user = await UserModel.findUserByEmail(email); // se busca al usuario antes de registralo para que no haya errores
		if (user) return res.status(400).json({ ok: false, message: "El usuario ya existe" });

		const newUser = await UserModel.createUser(username, email, password); // se llama al modelo para crear el usuario
		return res.status(201).json({
			ok: true,
			message: "Usuario creado con exito",
			user: {
				id: newUser.user_id,
				username: newUser.username,
				email: newUser.email,
			},
		}); // se devuelve el usuario creado sin la contrasena
	} catch (error) {
		res.status(500).json({ ok: false, message: "Error al crear el usuario" }); // se devuelve un error si hay un problema creando el usuario
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req?.body; // se obtienen los datos del body
		const user = await UserModel.findUserByEmail(email); // se busca al usuario
		if (!user) return res.status(404).json({ ok: false, message: "El usuario no se encuentra registrado" });

		if (user.password !== password) return res.status(400).json({ ok: false, message: "La contraseña es incorrecta" });

		return res.status(200).json({
			ok: true,
			message: "Usuario logueado con exito",
			user: {
				id: user.user_id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		res.status(500).json({ ok: false, message: "Error al loguear al usuario" });
	}
};

export const UserController = {
	createUser,
	loginUser,
};
