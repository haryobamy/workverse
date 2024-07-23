import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  desc: string;
  username: string;
  date: Date;
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  desc: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const todoModel = model<ITodo>('Todo', todoSchema);

export default todoModel;
