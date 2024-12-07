import { UserModel } from "../models/user.model.js";

const createUser = async (req, res) => {
	// funcion para crear un nuevo usuario, toma como argumento req y res
	try {
		const { username, email, password } = req.body; // se obtienen los datos del body
		const user = await UserModel.createUser(username, email, password); // se llama al modelo para crear el usuario
		res.status(201).json(user); // se devuelve el usuario creado
	} catch (error) {
		console.log(error);
	}
};

export const UserController = {
	createUser,
};
