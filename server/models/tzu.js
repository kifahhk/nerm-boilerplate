import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tzuSchema = new Schema({
  createDate: { type: 'Date', default: Date.now, required: true },
  updateDate: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Tzu', tzuSchema);
