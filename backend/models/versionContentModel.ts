import mongoose, { Document, Schema } from 'mongoose';

export interface IVersion extends Document {
  script_version_id: mongoose.Types.ObjectId;
  scene_id_array: mongoose.Types.ObjectId[];
  time_stamp: Date;
}

const versionContentSchema: Schema = new Schema({
  script_version_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Script',
  },
  scene_id_array: {
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: 'Scene',
  },
  time_stamp: { type: Date, default: Date.now },
});

export default mongoose.model<IVersion>('VersionConent', versionContentSchema);
