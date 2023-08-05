import { Request, Response } from "express";
import { Note, noteValidationSchema } from "../Models/NotesModel";
import { notesService } from "../Service/notes.service";

export const addNote = async (req: Request, res: Response) => {
  const { error } = noteValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newNote: Note = {
    title: req.body.title,
    body: req.body.body,
    category: req.body.category,
  };

  try {
    const savedNote = await notesService.addNote(newNote);
    res.json(savedNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to add note." });
  }
};
export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await notesService.getNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get notes." });
  }
};
