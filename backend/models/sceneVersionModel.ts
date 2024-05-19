import mongoose, { Document, Schema } from 'mongoose';

export interface ISceneVersion extends Document {
  scene_id: mongoose.Types.ObjectId;
  current_version_id: mongoose.Types.ObjectId;
  scene_version_id_array: mongoose.Types.ObjectId[];
  script_id: mongoose.Types.ObjectId;
  time_stamp: Date;
}

const sceneVersionSchema: Schema = new Schema({
  scene_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Scene' },
  current_version_id: { type: mongoose.Types.ObjectId, required: true },
  scene_version_id_array: { type: [mongoose.Types.ObjectId], required: false },
  script_id: { tyep: mongoose.Types.ObjectId, require: true },
  time_stamp: { type: Date, default: Date.now },
});

export default mongoose.model<ISceneVersion>(
  'SceneVersions',
  sceneVersionSchema,
);
