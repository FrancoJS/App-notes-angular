import pg from "pg";

const { Pool } = pg; // imoorta Pool desde libreria pg

export const db = new Pool({
	// Crea una instancia de la clase Pool, para ocupar un grupo de conexiones reutilizables y la guarda en db
	connectionString: process.env.DATABASE_URL,
});

try {
	await db.query("SELECT NOW()"); // hace una consulta a la base de datos paras ver si esta conectada
	console.log("Conectado a la base de datos");
} catch (error) {
	console.log("Error al conectar a la base de datos", error); // imprime el error si no se pudo conectar
}
