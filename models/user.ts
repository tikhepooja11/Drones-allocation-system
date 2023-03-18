import mongoose, { Document, Schema } from "mongoose";
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
}

//  create interface to define model of this type
export interface IUserModel extends IUser, Document {
  id: string;
}

//  create schema
const userSchema: Schema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
});

// const saltRounds = 8;

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, saltRounds);
//   }
//   next();
// });

export default mongoose.model<IUserModel>("UserModel", userSchema);
