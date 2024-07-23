import { Todo, TodoState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TodoState = {
  todos: [],
  selectedTodo: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setSelectedTodo(state, { payload }: PayloadAction<Todo | null>) {
      state.selectedTodo = payload;
    },
  },
});

export const { setSelectedTodo } = todoSlice.actions;
export default todoSlice.reducer;
