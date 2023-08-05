import NoteModel, { Note } from "../Models/NotesModel";

class NotesService {
  async addNote(note: Note) {
    try {
      const newNote = await NoteModel.create(note);

      return newNote;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getNotes() {
    try {
      const notes = await NoteModel.find({});

      return notes;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getNote(id: string) {
    console.log("here");
    try {
      const note = await NoteModel.findById(id);

      return note;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteNoteById(id: string) {
    try {
      const deletedNote = await NoteModel.findByIdAndDelete(id);

      return deletedNote;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async updateNote(id: string, updatedNote: Note) {
    try {
      const newNote = await NoteModel.findByIdAndUpdate(id, updatedNote, {
        new: true,
      });

      return newNote;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async archiveNote(id: string) {
    try {
      const newNote = await NoteModel.findByIdAndUpdate(
        id,
        { archived: true },
        {
          new: true,
        }
      );

      return newNote;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async unarchiveNote(id: string) {
    try {
      const newNote = await NoteModel.findByIdAndUpdate(
        id,
        { archived: false },
        {
          new: true,
        }
      );

      return newNote;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
export const notesService = new NotesService();
