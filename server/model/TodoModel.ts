import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);