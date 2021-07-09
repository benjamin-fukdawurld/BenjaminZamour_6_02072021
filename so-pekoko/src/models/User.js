import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: { type: String, required: true },
  priviledge: { type: Number, default: 0, min: 0 }
});

UserSchema.virtual('userId').get(function () {
  return this._id;
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

UserSchema.plugin(uniqueValidator);

export default model('User', UserSchema);
