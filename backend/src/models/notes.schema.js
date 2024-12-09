import Joi from "joi";

export const notesSchema = Joi.object({
	title: Joi.string().min(1).max(50).required().messages({
		"string.empty": "El titulo no puede estar vacio",
		"any.required": "El titulo es obligatorio",
	}),
	content: Joi.string().min(1).max(255).required().messages({
		"string.empty": "El contenido no puede estar vacio",
		"any.required": "El contenido es obligatorio",
	}),
});
