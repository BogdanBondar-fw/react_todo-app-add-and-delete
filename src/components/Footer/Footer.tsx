import React from 'react';
import { Filter } from '../../types/FilterType';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  counterValue: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  todos: Todo[];
  isLoading: boolean;
};

// should i create a separate file for filters?
const filters = [
  { value: 'all', label: 'All', cy: 'FilterLinkAll' },
  { value: 'active', label: 'Active', cy: 'FilterLinkActive' },
  { value: 'completed', label: 'Completed', cy: 'FilterLinkCompleted' },
] as const;

export const Footer: React.FC<Props> = ({
  counterValue,
  filter,
  setFilter,
  todos,
  isLoading,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counterValue} {counterValue === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(({ value, label, cy }) => (
          <a
            key={value}
            href={`#/${value === 'all' ? '' : value}`}
            className={classNames('filter__link', {
              selected: filter === value,
            })}
            data-cy={cy}
            onClick={event => {
              event.preventDefault();
              setFilter(value);
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      {todos.some(todo => todo.completed) && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="clear-completed"
          // onClick={handleClearCompleted}
          disabled={isLoading}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
