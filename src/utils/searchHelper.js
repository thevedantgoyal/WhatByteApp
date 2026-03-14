import { format } from 'date-fns';
import { parseDueDate } from './dateHelpers';

export function filterTasks(query, tasks) {
  const raw = query.trim().toLowerCase();
  if (!raw) return tasks;

  const statusMap = {
    completed: true,
    complete: true,
    done: true,
    finished: true,
    incomplete: false,
    pending: false,
    active: false,
    unfinished: false,
  };

  const priorityMap = {
    high: 'high',
    medium: 'medium',
    med: 'medium',
    low: 'low',
  };

  const tokens = raw.split(/[\s,]+/).filter(Boolean);

  let statusFilter = null;
  let priorityFilter = null;
  const textTokens = [];

  tokens.forEach((token) => {
    if (token in statusMap) {
      statusFilter = statusMap[token];
    } else if (token in priorityMap) {
      priorityFilter = priorityMap[token];
    } else {
      textTokens.push(token);
    }
  });

  return tasks.filter((task) => {
    if (statusFilter !== null && task.isCompleted !== statusFilter) {
      return false;
    }

    if (priorityFilter !== null && task.priority !== priorityFilter) {
      return false;
    }

    if (textTokens.length > 0) {
      const due = parseDueDate(task.dueDate);
      const readableDate = due ? format(due, 'MMMM dd yyyy').toLowerCase() : '';

      const searchableText = [
        task.title ?? '',
        task.description ?? '',
        readableDate,
      ]
        .join(' ')
        .toLowerCase();

      const allMatch = textTokens.every((token) => searchableText.includes(token));
      if (!allMatch) return false;
    }

    return true;
  });
}
