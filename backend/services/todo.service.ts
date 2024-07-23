import todoModel, { ITodo } from '../models/todo.model';
import userModel from '../models/user.model';

export const createTodo = async (
  username: string,
  todoData: Omit<ITodo, 'id' | 'username'>
): Promise<ITodo> => {
  const user = await userModel.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }

  const todo = new todoModel({
    ...todoData,
    username,
  });

  return todo.save();
};

export const getTodosByUsername = async (
  username: string
): Promise<ITodo[]> => {
  return todoModel.find({ username });
};

export const updateTodo = async (
  id: string,
  todoData: Partial<ITodo>
): Promise<ITodo | null> => {
  return todoModel.findByIdAndUpdate(
    id,
    {
      $set: todoData,
    },
    { new: false }
  );
};

export const deleteTodo = async (id: string): Promise<ITodo | null> => {
  return todoModel.findByIdAndDelete(id);
};
