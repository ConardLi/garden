import mongoose from 'mongoose';

const AISiteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.AISite || mongoose.model('AISite', AISiteSchema);
