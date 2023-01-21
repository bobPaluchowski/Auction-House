import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

// Get all notes endpoint
export const getNotes: RequestHandler = async (req, res, next) => {
  // In next major express update, this try catch block will be unnecessary
  try {
    // throw new Error("Something went wrong");
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get a single note endpoint
export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  // Error handling
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    res.status(200).json(note)  
  } catch (error) {
    next(error);
  }
};

// Create a new note endpoint
interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  // Error handling
  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }
  
    const newNote = await NoteModel.create({ 
      title: title, 
      text: text 
    });
    
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// Update a note endpoint
interface UpdateNoteParams {
  noteId: string,
}

interface UpdateNoteBody {
  title?: string,
  text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    if (!newTitle) {
      throw createHttpError(400, "Note must have a title");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    // Creating a new object with the new values and saving it
    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// Delete a note endpoint
export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "NOte not found");
    }

    await note.remove();

    res.sendStatus(204);

  } catch (error) {
    next(error);
  }
};