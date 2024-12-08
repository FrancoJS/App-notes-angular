import { db } from "../database/connection.database.js";

const createNote = async (user_id, title, content) => {
	const query = {
		text: `INSERT INTO NOTES (user_id, title, content) VALUES ($1, $2, $3) RETURNING *`,
		values: [user_id, title, content],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

const getAllNotes = async (user_id) => {
	const query = {
		text: `SELECT * FROM NOTES WHERE user_id = $1`,
		values: [user_id],
	};

	const { rows } = await db.query(query);
	return rows;
};

const deleteNote = async (user_id, note_id) => {
	const query = {
		text: `DELETE FROM NOTES WHERE user_id = $1 AND note_id = $2 RETURNING *`,
		values: [user_id, note_id],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

export const NotesModel = {
	createNote,
	getAllNotes,
	deleteNote,
};
