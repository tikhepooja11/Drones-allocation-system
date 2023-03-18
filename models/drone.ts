import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "./category";

export interface IDrone {
  id: string;
  createdAt: number;
  deletedBy: string;
  deletedOn: Date;
  droneType: string;
  makeName: string;
  name: string;
  updatedAt: number;
  createdBy: string;
  siteId: string;
  category: string;
}
export interface IDroneModel extends IDrone, ICategory, Document {
  id: string;
}

const droneSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Number },
  deletedBy: { type: mongoose.Schema.Types.ObjectId },
  deletedOn: { type: Date },
  droneType: { type: String },
  makeName: { type: String },
  name: { type: String, required: true },
  updatedAt: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  siteId: { type: mongoose.Schema.Types.ObjectId },
  category: { type: mongoose.Schema.Types.ObjectId },
});
export default mongoose.model<IDroneModel>("DroneModel", droneSchema);
