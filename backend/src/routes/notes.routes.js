import { Router } from "express";
import { NotesController } from "../controllers/notes.controller.js";
import verifyToken from "../middlewares/jwt.middleware.js"; // importa el middleware de verificacion de token

const router = Router();

router.post("/create", verifyToken, NotesController.createNote); // ruta para crear una nueva nota
router.get("/all", verifyToken, NotesController.getAllNotes); // ruta para obtener todas las notas
router.delete("/delete/:note_id", verifyToken, NotesController.deleteNote); // ruta para eliminar una nota
router.put("/update/:note_id", verifyToken, NotesController.updateNote);

export default router;
