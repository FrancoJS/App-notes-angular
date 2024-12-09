import { text } from "express";
import { db } from "../database/connection.database.js";
const createUser = async (username, email, password) => {
	// funcion para crear un nuevo usuario que interactua con la base de datos, se ocupan argumentos parametrizados
	const query = {
		text: `
            INSERT INTO USERS (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *`,
		values: [username, email, password],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const findUserByEmail = async (email) => {
	const query = {
		text: `SELECT * FROM USERS WHERE EMAIL = $1`,
		values: [email],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

export const UserModel = {
	createUser,
	findUserByEmail,
};
