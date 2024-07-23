import { NextApiRequest, NextApiResponse } from 'next';
import pusher from '@/lib/pusher';
import { Todo } from '@/types';

let tasks: Todo[] = [
  {
    id: '1',
    title: 'Task 1',
    completed: false,
    username: 'User 1',
    desc: 'Task 1 description',
    date: '2022-01-01',
  },
  {
    id: '2',
    title: 'Task 2',
    completed: false,
    userId: 'User 2',
    desc: 'Task 2 description',
    date: '2022-01-01',
  },
  {
    id: '3',
    title: 'Task 3',
    completed: false,
    userId: 'User 1',
    desc: 'Task 2 description',
    date: '2022-01-01',
  },
  {
    id: '4',
    title: 'Task 4',
    completed: false,
    userId: 'User 2',
    desc: 'Task 2 description',
    date: '2022-01-01',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { text, creator } = req.body;
    const newTask = { id: tasks.length + 1, text, done: false, creator };
    tasks.push(newTask);
    pusher.trigger('todo-channel', 'new-task', newTask);
    res.status(201).json(newTask);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    tasks = tasks.filter((task) => task.id !== id);
    pusher.trigger('todo-channel', 'delete-task', { id });
    res.status(200).json({ id });
  } else if (req.method === 'PATCH') {
    const { id, done } = req.body;
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.done = done;
      pusher.trigger('todo-channel', 'update-task', task);
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  }
}
