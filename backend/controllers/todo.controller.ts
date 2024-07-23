import { NextFunction, Request, Response } from 'express';

import ErrorHandler from '../utils/ErrorHandler';

import { createTodo, deleteTodo, updateTodo } from '../services/todo.service';
import todoModel, { ITodo } from '../models/todo.model';
import { CatchAsyncError } from '../middleware/catchAsynError';

export const creatingTodo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.body as ITodo;

      const todo = await createTodo(username, req.body as ITodo);

      res.status(200).json({
        success: true,
        message: 'Todo created successfully',
        data: todo,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getTodos = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await todoModel.find().sort({ createdAt: -1 });
      if (!todos) {
        return next(new ErrorHandler('todos not found', 404));
      }

      res.status(200).json({
        success: true,
        message: 'Todos fetched successfully',
        data: todos,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updatingTodo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todo = await todoModel.findById(id);
      if (!todo) {
        return next(new ErrorHandler('todo not found', 404));
      }

      const updatedTodo = await updateTodo(id, req.body as Partial<ITodo>);
      res.status(200).json({
        success: true,
        message: 'Todo updated successfully',
        data: updatedTodo,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deletingTodo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todo = await todoModel.findById(id);
      if (!todo) {
        return next(new ErrorHandler('todo not found', 404));
      }

      const updatedTodo = await deleteTodo(id);
      res.status(200).json({
        success: true,
        message: 'Todo deleted successfully',
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
