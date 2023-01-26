import { InferSchemaType, Schema, model } from "mongoose";

const NoteSchema = new Schema({
  userId: {type:Schema.Types.ObjectId, required: true},
  title: { type: String, required: true },
  text: { type: String },
}, { timestamps: true });

// This is the type of the NoteSchema
type Note = InferSchemaType<typeof NoteSchema>;

// Exports the model of type Note, which is the type of the NoteSchema, and creates the collection "notes" in the database
export default model<Note>("Note", NoteSchema);