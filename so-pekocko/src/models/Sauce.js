import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SauceSchema = new Schema({
  name: { type: String, required: true, minLength: 1, trim: true },
  manufacturer: { type: String, required: true, minLength: 1, trim: true },
  description: { type: String, required: true, minLength: 1, trim: true },
  mainPepper: { type: String, required: true, minLength: 1, trim: true },
  imageUrl: { type: String, required: true, trim: true },
  heat: { type: Number, required: true, min: 1, max: 10 },
  likes: { type: Number, default: 0, min: 0 },
  dislikes: { type: Number, default: 0, min: 0 },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  usersLiked: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  usersDisliked: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export default model('Sauce', SauceSchema);
