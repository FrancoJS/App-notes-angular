import { NotesModel } from "../models/notes.model.js";

const createNote = async (req, res) => {
	// funcion para crear una nueva nota, toma como argumento req y res
	try {
		const { user_id, title, content } = req?.body;
		const newNote = await NotesModel.createNote(user_id, title, content);
		res.status(201).json({ ok: true, message: "Nota creada con exito", note: newNote });
	} catch (error) {
		return res.status(500).json({ ok: false, message: "Error al crear la nota" });
	}
};

const getAllNotes = async (req, res) => {
	// funcion para obtener todas las notas
	try {
		const user_id = req?.user_id; // se obtiene el id del usuario a traves del objeto req que se pasa en el middleware
		const notes = await NotesModel.getAllNotes(user_id);

		if (notes.length < 1) return res.status(404).json({ ok: false, message: "No se encontraron notas" });

		return res.status(200).json({ ok: true, message: "Notas obtenidas con exito", notes });
	} catch (error) {
		res.status(500).json({ ok: false, message: "Error al obtener las notas" });
	}
};

const deleteNote = async (req, res) => {
	try {
		const user_id = req?.user_id;
		const { note_id } = req?.params;
		const note = await NotesModel.deleteNote(user_id, note_id);

		if (!note) return res.status(404).json({ ok: false, message: "No se encontro la nota a eliminar" });

		return res.status(200).json({ ok: true, message: "Nota eliminada con exito", note });
	} catch (error) {
		res.status(500).json({ ok: false, message: "Error al eliminar la nota" });
	}
};

export const NotesController = {
	createNote,
	getAllNotes,
	deleteNote,
};
