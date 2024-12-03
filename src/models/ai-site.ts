import mongoose from 'mongoose';

const aiSiteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  pricing: {
    type: String,
    enum: ['free', 'freemium', 'paid']
  },
  features: [{
    type: String
  }],
  description: {
    type: String
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true,
  collection: 'ai_sites'
});

export default mongoose.models.AISite || mongoose.model('AISite', aiSiteSchema);
