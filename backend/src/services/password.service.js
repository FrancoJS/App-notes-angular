import bcrypt from "bcrypt";

// funcion para encriptar la contraseña
const hashPassword = async (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hash(password, salt);
};

// funcion para comparar la contraseña
const comparePassword = async (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};

// exporta las funciones en un objeto
export const passwordService = {
	hashPassword,
	comparePassword,
};
