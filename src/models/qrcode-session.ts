import mongoose, { Document, Model } from 'mongoose';
import { Types } from 'mongoose';

export interface QRCodeSession {
  qrcodeId: string;
  createdAt: Date;
  expireTime: Date;
  status: 'pending' | 'success' | 'expired';
  userId?: Types.ObjectId;
  userInfo?: {
    nickname: string;
    avatarUrl: string;
  };
}

export interface QRCodeSessionDocument extends QRCodeSession, Document {}

const qrcodeSessionSchema = new mongoose.Schema<QRCodeSessionDocument>(
  {
    qrcodeId: { type: String, required: true, unique: true },
    expireTime: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'success', 'expired'],
      default: 'pending',
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userInfo: {
      nickname: String,
      avatarUrl: String,
    },
  },
  {
    timestamps: true,
  }
);

// 自动删除过期的会话
qrcodeSessionSchema.index({ expireTime: 1 }, { expireAfterSeconds: 0 });

export const QRCodeSessionModel: Model<QRCodeSessionDocument> = mongoose.models.QRCodeSession || mongoose.model<QRCodeSessionDocument>('QRCodeSession', qrcodeSessionSchema); 