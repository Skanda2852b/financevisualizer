import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  month: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);