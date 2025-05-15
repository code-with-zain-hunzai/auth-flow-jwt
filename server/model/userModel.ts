import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
