import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

// Get all notes route
router.get("/", NotesController.getNotes);

// Get a single note route
router.get("/:noteId", NotesController.getNote);

// Create a new note route
router.post("/", NotesController.createNote);

// Update a note route
router.patch("/:noteId", NotesController.updateNote);

// Delete a note route
router.delete("/:noteId", NotesController.deleteNote);

export default router;