import mongoose, { Document, Schema } from "mongoose";
export interface ISite {
  id: string;
  name: string;
  position: {
    latitude: string;
    longitude: string;
  };
  createdBy: string;
}
export interface ISiteModel extends ISite, Document {
  id: string;
}

const siteSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  position: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  createdBy: { type: String, required: true },
});
export default mongoose.model<ISiteModel>("SiteModel", siteSchema);
