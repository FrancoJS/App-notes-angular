import "dotenv/config"; // carga las variables de entorno de .env al objeto process.env para poder ocuparlas
import express from "express"; // framework que permite crear un servidor y definir las rutas
import morgan from "morgan";
import userRouter from "./routes/user.routes.js"; // importa el archivo de rutas del usuario

const app = express(); // crea una instancia de express para poder acceder a ella

// MIDDLEWARES
app.use(express.json()); //permite recibir peticiones en formato JSON
app.use(morgan("dev")); //morgan sirve para registrar las peticiones y mostrarlas en la consola

// RUTAS
app.use("/api/users", userRouter); // ruta de usuario

const PORT = process.env.PORT; // obtiene el puerto de la variable de entorno PORT

app.listen(PORT, () => {
	// inicia el servidor y hace que la aplicacion comience a escuchar peticiones HTTP
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});
