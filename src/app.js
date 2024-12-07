import express from "express";
import morgan from "morgan";

const app = express();

// MIDDLEWARES
app.use(morgan("dev")); //morgan sirve para registrar las peticiones y mostrarlas en la consola
app.use(express.json()); //permite recibir peticiones en formato JSON

// RUTAS

export default app;
