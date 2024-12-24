import { db } from '../database/connection.database.js';

const createNote = async (user_id, title, content) => {
	const query = {
		text: `INSERT INTO NOTES (user_id, title, content) VALUES ($1, $2, $3) RETURNING *`,
		values: [user_id, title, content],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

const getAllNotes = async (user_id, limit, page) => {
	const offset = (page - 1) * limit;
	const query = {
		text: `SELECT * FROM NOTES WHERE user_id = $1 ORDER BY note_id DESC LIMIT $2 OFFSET $3`,
		values: [user_id, limit, offset],
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

const updateNote = async (user_id, note_id, title, content) => {
	const query = {
		text: `UPDATE NOTES SET title = $1, content = $2 WHERE user_id = $3 AND note_id = $4 RETURNING *`,
		values: [title, content, user_id, note_id],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

const countNotes = async (user_id) => {
	const query = {
		text: `SELECT COUNT(*) FROM NOTES WHERE user_id = $1`,
		values: [user_id],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

export const NotesModel = {
	createNote,
	getAllNotes,
	deleteNote,
	updateNote,
	countNotes,
};
