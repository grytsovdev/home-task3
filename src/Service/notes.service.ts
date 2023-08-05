import NoteModel, { Note } from "../Models/NotesModel";

class NotesService {
  async addNote(note: Note) {
    try {
      const newNote = await NoteModel.create(note);
      return newNote;
    } catch (error) {
      console.log(error);
    }
  }
  async getNotes() {
    try {
      const notes = await NoteModel.find({});
      return notes;
    } catch (error) {
      console.log(error);
    }
  }
  async getNote(id: string) {
    try {
      const note = await NoteModel.findById({ _id: id });
      if (!note) return "There is no note with such id";
      return note;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteNote(id: string) {
    try {
      const note = await NoteModel.findByIdAndDelete(id);
      if (!note) return "There is no note with such id";
      return "Deleted succesfully";
    } catch (error) {
      console.log(error);
    }
  }
}
export const notesService = new NotesService();
