import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    get: (date: Date) => date.toISOString().split('T')[0]
  },
  sales_amount: {
    type: Number,
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Diesel', 'Ad Blue', 'Super E5', 'Super E10'],
    required: true
  },
  tankId: {
    type: String,
    required: true
  },
  malfunctionCount: {
    type: Number,
    default: 0
  },
  fill_rate: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, {
  timestamps: true,
  toJSON: { getters: true }
});

SaleSchema.index({ date: 1 });

const Sale = mongoose.models.Sale || mongoose.model('Sale', SaleSchema);

export default Sale; 