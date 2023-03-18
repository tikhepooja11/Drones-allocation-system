import mongoose, { Document, Schema } from "mongoose";
export interface IMission {
  id: string;
  alt: number;
  speed: number;
  name: string;
  waypoints: [
    {
      alt: number;
      lat: number;
      long: number;
    }
  ];
  createdAt: number;
  updatedAt: number;
  siteId: string;
  category: string;
  createdBy: string;
  isRunnable: boolean;
}
export interface IMissionModel extends IMission, Document {
  id: string;
}

const missionSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  alt: { type: Number },
  speed: { type: Number },
  name: { type: String },
  waypoints: [
    {
      alt: { type: Number },
      lat: { type: Number },
      long: { type: Number },
    },
  ],
  createdAt: { type: Number },
  updatedAt: { type: Number },
  siteId: { type: mongoose.Schema.Types.ObjectId },
  category: { type: mongoose.Schema.Types.ObjectId },
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  isRunnable: { type: Boolean },
});
export default mongoose.model<IMissionModel>("MissionModel", missionSchema);
