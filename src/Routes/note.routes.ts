import express from "express";
import {
  addNote,
  archiveNote,
  deleteNote,
  editNote,
  getNote,
  getNotes,
  getNotesStats,
  unarchiveNote,
} from "../Controllers/NotesController";
import { validate } from "../Service/validation.service";
export const router = express.Router();

router.get("/notes/stats", getNotesStats);
router.get("/notes", getNotes);

router.post("/notes", validate, addNote);

router.get("/notes/:id", getNote);

router.delete("/notes/:id", deleteNote);

router.patch("/notes/:id", validate, editNote);

router.patch("/notes/:id/archive", archiveNote);

router.patch("/notes/:id/unarchive", unarchiveNote);
