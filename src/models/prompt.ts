import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  prompt: {
    type: String,
    required: true
  },
  enTitle: {
    type: String,
    required: true,
    trim: true
  },
  enDescription: {
    type: String,
    required: true,
    trim: true
  },
  enPrompt: {
    type: String,
    required: true
  },
  source: {
    type: Number,
    required: true,
    default: 99 // 默认值
  },
  tags: [{
    type: String,
    trim: true
  }],
  enTags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true, // 自动管理 createdAt 和 updatedAt
  versionKey: false // 不包含 __v 字段
});

// 添加索引以提升查询性能
promptSchema.index({ title: 'text', enTitle: 'text', description: 'text', enDescription: 'text' });
promptSchema.index({ source: 1 });
promptSchema.index({ tags: 1 });
promptSchema.index({ enTags: 1 });
promptSchema.index({ createdAt: -1 });

// 如果模型已经存在则使用现有的，否则创建新的
const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', promptSchema);

export default Prompt;
