import Joi from "joi";

const registerSchema = Joi.object({
	username: Joi.string().min(1).max(50).required().messages({
		"string.empty": "El nombre de usuario no puede estar vacio",
		"any.required": "El nombre de usuario es obligatorio",
	}),
	email: Joi.string().min(1).max(50).required().messages({
		"string.empty": "El email no puede estar vacio",
		"any.required": "El email es obligatorio",
	}),
	password: Joi.string().min(8).max(255).required().messages({
		"string.empty": "La contraseña no puede estar vacia",
		"string.min": "La contraseña debe tener al menos 8 caracteres",
		"any.required": "La contraseña es obligatoria",
	}),
});

const loginSchema = Joi.object({
	email: Joi.string().min(1).max(50).required().messages({
		"string.empty": "El email no puede estar vacio",
		"any.required": "El email es obligatorio",
	}),
	password: Joi.string().min(8).max(255).required().messages({
		"string.empty": "La contraseña no puede estar vacia",
		"string.min": "La contraseña debe tener al menos 8 caracteres",
		"any.required": "La contraseña es obligatoria",
	}),
});

export const userSchema = {
	registerSchema,
	loginSchema,
};
