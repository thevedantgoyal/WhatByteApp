import { useState, useEffect, useRef, useMemo } from 'react';
import Toast from 'react-native-toast-message';
import { getCurrentUser } from '../services/authService';
import {
  subscribeTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete as toggleCompleteService,
} from '../services/taskService';
import { useTaskStore } from '../store/taskStore';
import { groupTasksByDate } from '../utils/dateHelpers';

export function useTasks() {
  const { tasks, setTasks, setLoading, setError } = useTaskStore();
  const [filters, setFiltersState] = useState({
    priority: 'all',
    status: 'all',
  });
  const filter = filters;
  const unsubscribeRef = useRef(null);

  const setFilter = (obj) => {
    setFiltersState((prev) => (typeof obj === 'object' ? { ...prev, ...obj } : prev));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchPriority =
        filters.priority === 'all' || task.priority === filters.priority;
      const matchStatus =
        filters.status === 'all' ||
        (filters.status === 'completed' && task.isCompleted) ||
        (filters.status === 'active' && !task.isCompleted);
      return matchPriority && matchStatus;
    });
  }, [tasks, filters]);

  const groupedTasks = useMemo(() => {
    return groupTasksByDate(filteredTasks);
  }, [filteredTasks]);

  function subscribe() {
    const user = getCurrentUser();
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    unsubscribeRef.current = subscribeTasks(
      user.uid,
      (newTasks) => {
        setTasks(newTasks);
        setLoading(false);
      },
      (err) => {
        setError(err.message || 'Failed to load tasks');
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error loading tasks',
          text2: err.message,
        });
      }
    );
  }

  function retry() {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    subscribe();
  }

  useEffect(() => {
    subscribe();
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [setTasks, setLoading, setError]);

  async function addTask(data) {
    const user = getCurrentUser();
    if (!user) return { success: false };

    const taskData = {
      ...data,
      userId: user.uid,
    };

    const result = await createTask(taskData);
    if (result.success) {
      return { success: true };
    }
    Toast.show({
      type: 'error',
      text1: 'Failed to add task',
      text2: result.error,
    });
    return { success: false };
  }

  async function editTask(id, updates) {
    const result = await updateTask(id, updates);
    if (result.success) {
      return { success: true };
    }
    Toast.show({
      type: 'error',
      text1: 'Failed to update task',
      text2: result.error,
    });
    return { success: false };
  }

  async function removeTask(id) {
    const result = await deleteTask(id);
    if (result.success) {
      return;
    }
    Toast.show({
      type: 'error',
      text1: 'Failed to delete task',
      text2: result.error,
    });
  }

  async function toggleComplete(id, currentValue) {
    const result = await toggleCompleteService(id, currentValue);
    if (result.success) {
      return;
    }
    Toast.show({
      type: 'error',
      text1: 'Failed to update task',
      text2: result.error,
    });
  }

  return {
    tasks: useTaskStore((s) => s.tasks),
    filteredTasks,
    groupedTasks,
    loading: useTaskStore((s) => s.loading),
    error: useTaskStore((s) => s.error),
    filter,
    filters,
    setFilter,
    addTask,
    updateTask: editTask,
    editTask,
    removeTask,
    toggleComplete,
    retry,
  };
}
