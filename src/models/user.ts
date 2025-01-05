import mongoose, { Document, Model } from 'mongoose';

export interface User {
  openId: string;
  nickname: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends User, Document {}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    openId: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    avatarUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema); 