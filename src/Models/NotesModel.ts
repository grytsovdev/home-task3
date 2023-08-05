import Joi from "joi";
import { Schema, model } from "mongoose";

export interface Note {
  title: string;
  body: string;
  category: string;
  createdDate?: Date;
}

const JoiInstance = Joi.defaults((schema) => {
  return schema.options({
    errors: {
      wrap: {
        label: false,
      },
    },
  });
});

export const noteValidationSchema = JoiInstance.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.string().valid("Idea", "Random Thought", "Task").required(),
});

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
  },
  { versionKey: false }
);

const NoteModel = model<Note>("Note", notesSchema);

export default NoteModel;
