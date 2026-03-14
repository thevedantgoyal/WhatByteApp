import {
  isToday,
  isTomorrow,
  isThisWeek,
  startOfDay,
  format,
  parseISO,
  addDays,
  isBefore,
} from 'date-fns';

export function groupTasksByDate(tasks) {
  const today = [];
  const tomorrow = [];
  const thisWeek = [];
  const later = [];

  tasks.forEach((task) => {
    if (!task.dueDate) {
      later.push(task);
      return;
    }
    const date = parseISO(task.dueDate);

    if (isToday(date)) {
      today.push(task);
    } else if (isTomorrow(date)) {
      tomorrow.push(task);
    } else if (isThisWeek(date, { weekStartsOn: 1 })) {
      thisWeek.push(task);
    } else {
      later.push(task);
    }
  });

  return { today, tomorrow, thisWeek, later };
}

export function formatDueDate(isoString) {
  if (!isoString) return '';
  try {
    const date = parseISO(isoString);
    return format(date, 'd MMM');
  } catch {
    return '';
  }
}

export function formatDueDateLong(isoString) {
  if (!isoString) return '';
  try {
    const date = parseISO(isoString);
    return format(date, 'MMM dd, yyyy');
  } catch {
    return '';
  }
}

export function formatHeaderDate() {
  const now = new Date();
  return isToday(now)
    ? `Today, ${format(now, 'd MMM')}`
    : format(now, 'EEEE, d MMM');
}

export function isPastDate(date) {
  if (!date) return false;
  const d = date instanceof Date ? date : parseISO(date);
  return isBefore(d, startOfDay(new Date()));
}

export function isOverdue(isoString) {
  if (!isoString) return false;
  try {
    const date = parseISO(isoString);
    const today = startOfDay(new Date());
    return date < today && !isToday(date);
  } catch {
    return false;
  }
}

export function parseDueDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (value && typeof value.toDate === 'function') return value.toDate();
  if (typeof value === 'string') {
    try {
      return parseISO(value);
    } catch {
      return null;
    }
  }
  if (value?.seconds != null) return new Date(value.seconds * 1000);
  return null;
}

export function formatDueDateFull(isoString) {
  if (!isoString) return '';
  try {
    const date = parseISO(isoString);
    return format(date, 'EEEE, MMMM d, yyyy');
  } catch {
    return '';
  }
}

export function getDueDateLabel(isoString) {
  if (!isoString) return 'No date';
  try {
    const date = parseISO(isoString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'd MMM');
  } catch {
    return 'No date';
  }
}
