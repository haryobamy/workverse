import React, { useCallback, useEffect, useRef } from 'react';
import TodoItem from './TodoItem';
import { TQueryActionCreatorResult, Todo } from '@/types';
import { useLazyGetTodosQuery } from '@/redux/features/todo/todoApi';
import { If, Then, Else } from 'react-if';
import Button from './ui/Button';

function TodoList() {
  const [getTodosQuery, { data, isFetching }] = useLazyGetTodosQuery();
  const triggerRef = useRef<TQueryActionCreatorResult>();

  const getAllTodos = useCallback(() => {
    if (triggerRef.current) {
      triggerRef.current.abort();
    }

    triggerRef.current = getTodosQuery();
  }, [getTodosQuery]);

  const todos = (data?.data as Todo[]) || [];

  useEffect(() => {
    getTodosQuery();
  }, []);
  return (
    <div>
      <If condition={todos.length}>
        <Then>
          <div className="grid grid-cols-4 gap-2 mt-5 w-full">
            {todos?.map((todo: Todo, idx: number) => (
              <TodoItem key={idx} todo={todo} />
            ))}
          </div>
        </Then>
        <Else>
          <If condition={isFetching}>
            <Then>
              <p>Fetching.....</p>
            </Then>
            <Else>
              <div className="mt-16 w-full flex flex-col  items-center justify-center">
                <p className="  text-center text-xl">No Todos display</p>
                <Button containClassName="mt-4 w-[200px]" onClick={getAllTodos}>
                  Retry
                </Button>
              </div>
            </Else>
          </If>
        </Else>
      </If>

      {isFetching && <p>Loading...</p>}

      {}
    </div>
  );
}

export default TodoList;
