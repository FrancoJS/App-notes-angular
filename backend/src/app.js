import 'dotenv/config'; // carga las variables de entorno de .env al objeto process.env para poder ocuparlas
import express from 'express'; // framework que permite crear un servidor y definir las rutas
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/user.routes.js'; // importa el archivo de rutas del usuario
import notesRouter from './routes/notes.routes.js';

const app = express(); // crea una instancia de express para poder acceder a ella

// MIDDLEWARES
app.use(express.json()); //permite recibir peticiones en formato JSON
app.use(morgan('dev')); //morgan sirve para registrar las peticiones y mostrarlas en la consola
app.use(cors()); // permite que el servidor responda a peticiones de otros dominios
// RUTAS
app.use('/api/users', userRouter); // ruta de usuario
app.use('/api/notes', notesRouter);

// SERVIDOR
const PORT = process.env.PORT; // obtiene el puerto de la variable de entorno PORT

app.listen(PORT, () => {
	// inicia el servidor y hace que la aplicacion comience a escuchar peticiones HTTP
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});
