import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Note } from "../Models/NotesModel";

const JoiInstance = Joi.defaults((schema) => {
  return schema.options({
    errors: {
      wrap: {
        label: false,
      },
    },
  });
});

const noteSchema = JoiInstance.object<Note>({
  title: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.string().valid("Idea", "Random Thought", "Task").required(),
  archived: Joi.boolean().required(),
});

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const { error } = noteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
