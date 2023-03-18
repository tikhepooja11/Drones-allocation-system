import mongoose, { Document, Schema } from "mongoose";
export interface ICategory {
  id: string;
  name: string;
  color: string;
  tagName: string;
  createdAt: number;
  updatedAt: number;
}
export interface ICategoryModel extends ICategory, Document {
  id: string;
}

const categorySchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  color: { type: String },
  tagName: { type: String },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});
export default mongoose.model<ICategoryModel>("CategoryModel", categorySchema);
