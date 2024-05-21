import mongoose, { Document, Schema } from 'mongoose';

export interface ISceneVersionContent extends Document {
  content: { type: [Schema.Types.Mixed]; required: false };
  sceneVersions_id: mongoose.Types.ObjectId;
  time_stamp: Date;
}

const SceneVersionContentSchema: Schema = new Schema({
  content: { type: [Schema.Types.Mixed], required: false },
  sceneVersions_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Scene',
  },
  time_stamp: { type: Date, default: Date.now },
});

export default mongoose.model<ISceneVersionContent>(
  'sceneVersionContent',
  SceneVersionContentSchema,
  'sceneVersionContent',
);
