import mongoose from 'mongoose';

/**
 * 必应壁纸 Schema
 * 用于存储从必应接口获取的壁纸数据
 */
const BingWallpaperSchema = new mongoose.Schema({
  // MongoDB 文档ID，与原始数据保持一致
  _id: { type: String, required: true },

  // 壁纸的结束展示日期，格式：YYYYMMDD
  enddate: { type: String, required: true },

  // 壁纸的版权信息，包含图片描述和拍摄地点
  copyright: { type: String, required: true },

  // 壁纸的完整URL，1920x1080分辨率
  fullSrc: { type: String, required: true },

  // 壁纸的基础URL路径，不包含尺寸参数
  urlbase: { type: String, required: true },

  // 壁纸的原始URL，包含所有参数
  raw: { type: String, required: true },

  // 壁纸的缩略图URL，用于预览
  thumb: { type: String, required: true },

  // 数据创建时间
  createdAt: { type: Date, default: Date.now },

  // 数据最后更新时间
  updatedAt: { type: Date, default: Date.now },
});

// 创建索引
BingWallpaperSchema.index({ enddate: -1 });  // 按日期倒序查询
BingWallpaperSchema.index({ urlbase: 1 });   // 按URL路径查询

// 导出模型
export const BingWallpaperModel = mongoose.models.BingWallpaper || 
  mongoose.model('BingWallpaper', BingWallpaperSchema);
