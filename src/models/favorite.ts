import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['tool', 'website', 'ai']
  },
  itemId: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'favorites'
});

// 创建复合索引确保不会重复收藏
favoriteSchema.index({ type: 1, itemId: 1 }, { unique: true });

export default mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);
