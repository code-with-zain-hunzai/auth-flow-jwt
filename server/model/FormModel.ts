// src/model/FormModel.ts
import mongoose, { Document, Model, Schema } from "mongoose";

interface IFormData extends Document {
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}

const formSchema: Schema<IFormData> = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Email must be valid"],
    },
    message: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const FormData: Model<IFormData> =
  mongoose.models.FormData || mongoose.model<IFormData>("FormData", formSchema);

export default FormData;