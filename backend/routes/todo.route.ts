import express from 'express';
import {
  creatingTodo,
  deletingTodo,
  getTodos,
  updatingTodo,
} from '../controllers/todo.controller';

const todoRouter = express.Router();

todoRouter.post('/create', creatingTodo);

todoRouter.get('/getAll', getTodos);

todoRouter.put('/update/:id', updatingTodo);

todoRouter.delete('/delete/:id', deletingTodo);

export default todoRouter;
