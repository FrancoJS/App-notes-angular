import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router();
//Crea una instancia de la clase Router para manejar las rutas de manera modular de usuarios
//Tiene las mismas funcionalidades de app

router.post("/auth/register", UserController.createUser); // ruta para crear un nuevo usuario

export default router;
