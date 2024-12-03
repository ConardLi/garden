import mongoose from 'mongoose';

const websiteSchema = new mongoose.Schema({
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
  iconType: {
    type: String,
    default: 'image'
  },
  iconValue: {
    type: String
  },
  description: {
    type: String
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true,
  collection: 'sites'
});

export default mongoose.models.Website || mongoose.model('Website', websiteSchema);
