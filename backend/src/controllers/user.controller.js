import { UserModel } from '../models/user.model.js';
import { userSchema } from '../models/user.schema.js';
import { generateToken } from '../services/jwt.service.js';
import { passwordService } from '../services/password.service.js';

const createUser = async (req, res) => {
	// funcion para crear un nuevo usuario, toma como argumento req y res
	try {
		const { error } = userSchema.registerSchema.validate(req.body); // se validan los datos del body
		if (error) return res.status(400).json({ ok: false, message: error.message });

		const { username, email, password } = req.body; // se obtienen los datos del body

		const user = await UserModel.findUserByEmail(email); // se busca al usuario antes de registralo para que no haya errores
		if (user) return res.status(400).json({ ok: false, message: 'El usuario ya existe' });

		const hashedPassword = await passwordService.hashPassword(password);
		const newUser = await UserModel.createUser(username, email, hashedPassword); // se llama al modelo para crear el usuario
		const token = generateToken(newUser.user_id);
		return res.status(201).json({
			ok: true,
			message: 'Usuario creado con exito',
			user: {
				id: newUser.user_id,
				username: newUser.username,
				email: newUser.email,
			},
			token,
		}); // se devuelve el usuario creado sin la contraseña y con el token
	} catch (error) {
		console.log(error);
		res.status(500).json({ ok: false, message: 'Error al crear el usuario' }); // se devuelve un error si hay un problema creando el usuario
	}
};

const loginUser = async (req, res) => {
	// funcion para loguear al usuario
	try {
		const { error } = userSchema.loginSchema.validate(req.body); // se validan los datos del body
		if (error) return res.status(400).json({ ok: false, message: error.message });

		const { email, password } = req?.body; // se obtienen los datos del body
		const user = await UserModel.findUserByEmail(email); // se busca al usuario
		if (!user) return res.status(404).json({ ok: false, message: 'El usuario no se encuentra registrado' });

		const passwordMatch = await passwordService.comparePassword(password, user.password);
		if (!passwordMatch) return res.status(400).json({ ok: false, message: 'La contraseña es incorrecta' }); // se comparan las contraseñas
		const token = generateToken(user.user_id);
		return res.status(200).json({
			ok: true,
			message: 'Usuario logueado con exito',
			user: {
				id: user.user_id,
				username: user.username,
				email: user.email,
			},
			token,
		});
	} catch {
		res.status(500).json({ ok: false, message: 'Error al loguear al usuario' }); // devuelve un error si hay problema logueando
	}
};

export const UserController = {
	createUser,
	loginUser,
};
