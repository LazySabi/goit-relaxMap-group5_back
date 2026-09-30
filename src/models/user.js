import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 64,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const UserModel = model('user', UserSchema);