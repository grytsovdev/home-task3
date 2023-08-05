import { Request, Response } from "express";
import { Note } from "../Models/NotesModel";
import { notesService } from "../Service/notes.service";

export const addNote = async (req: Request, res: Response) => {
  const { title, body, category, archived } = req.body;

  const newNote: Note = {
    title: title,
    body: body,
    category: category,
    archived: archived,
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

export const getNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const note = await notesService.getNote(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to get the note." });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedNote = await notesService.deleteNoteById(id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.json({ message: "Note deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the note." });
  }
};

export const editNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { title, body, category, archived } = req.body;
    const updatedNote = { title, body, category, archived };
    const editedNote = await notesService.updateNote(id, updatedNote);

    if (!editedNote) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.json(editedNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit the note." });
  }
};

export const archiveNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const archivedNote = await notesService.archiveNote(id);
    if (!archivedNote) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.json({ message: "Note archived successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to archive the note." });
  }
};

export const unarchiveNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const archivedNote = await notesService.unarchiveNote(id);
    if (!archivedNote) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.json({ message: "Note unarchived successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to unarchive the note." });
  }
};

export const getNotesStats = async (req: Request, res: Response) => {
  try {
    const notes = await notesService.getNotes();

    const notesCount = notes.length;
    const archivedNotesCount = notes.filter((note) => note.archived).length;
    const activeNotesCount = notesCount - archivedNotesCount;

    const categories = ["Idea", "Random Thought", "Task"];
    const categoryCount = {};
    const activeCategotyCount = {};
    const archivedCategoryCount = {};

    categories.forEach((category) => {
      const count = notes.filter((note) => note.category === category).length;
      categoryCount[category] = count;

      const archivedCount = notes.filter(
        (note) => note.category === category && note.archived
      ).length;

      archivedCategoryCount[category] = archivedCount;

      const activeCount = count - archivedCount;
      activeCategotyCount[category] = activeCount;
    });

    const stats = {
      notesCount,
      activeNotesCount,
      archivedNotesCount,
      categoryCount,
      activeCategotyCount,
      archivedCategoryCount,
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to get notes statistics." });
  }
};
