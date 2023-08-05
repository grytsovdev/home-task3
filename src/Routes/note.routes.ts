import express from "express";
import { addNote, getNotes } from "../Controllers/NotesController";
export const router = express.Router();

router.post("/notes", addNote);

router.get("/notes", getNotes);
