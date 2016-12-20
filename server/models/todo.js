import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  text: { type: 'String', required: true },
  completed: { type: 'Boolean', default: false, required: true },
  'created-date': { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Todo', todoSchema);
