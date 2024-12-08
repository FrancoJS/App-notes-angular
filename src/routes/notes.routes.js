import { Router } from "express";
import { NotesController } from "../controllers/notes.controller.js";
import verifyToken from "../middlewares/jwt.middleware.js";

const router = Router();

router.post("/create", verifyToken, NotesController.createNote);
router.get("/all", verifyToken, NotesController.getAllNotes);
router.delete("/delete/:note_id", verifyToken, NotesController.deleteNote);

export default router;
