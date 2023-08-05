import { Schema, model } from "mongoose";

export interface Note {
  title: string;
  body: string;
  category: string;
  createdDate?: Date;
  archived: boolean;
}

const notesSchema = new Schema<Note>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Idea", "Random Thought", "Task"],
    },
    createdDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    archived: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false }
);

const NoteModel = model<Note>("Note", notesSchema);

export default NoteModel;
