import pg from "pg";

const { Pool } = pg; //

const db = new Pool({
	connectionString: process.env.DATABASE_URL,
});

try {
	await db.query("SELECT NOW()");
	console.log("Conectado a la base de datos");
} catch (error) {
	console.log("Error al conectar a la base de datos", error);
}
