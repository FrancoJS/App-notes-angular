import dotenv from "dotenv";
import app from "./app.js";

dotenv.config(); //carga variables de .env al objeto process.env para poder ocuparlas

const PORT = process.env.PORT;
console.log(PORT);

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});
