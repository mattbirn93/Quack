import mongoose, { Document, Schema } from 'mongoose';

export interface IVersion extends Document {
  content: any[];
}

export interface ISceneVersion extends Document {
  current_version: mongoose.Types.ObjectId;
  versions_array: IVersion[];
}

export interface IScene extends Document {
  script_id: mongoose.Types.ObjectId;
  scene_array: ISceneVersion[];
  time_stamp: Date;
}

const versionSchema: Schema = new Schema({
  content: { type: [Schema.Types.Mixed], required: false },
});

const sceneVersionSchema: Schema = new Schema({
  current_version: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Version',
  },
  versions_array: { type: [versionSchema], required: false },
});

const sceneSchema: Schema = new Schema({
  script_id: { type: mongoose.Types.ObjectId, required: false, ref: 'Script' },
  scene_array: { type: [sceneVersionSchema], required: false },
  time_stamp: { type: Date, default: Date.now },
});

export default mongoose.model<IScene>('Scene', sceneSchema);
