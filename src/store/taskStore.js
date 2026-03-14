import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,

  setTasks: (tasks) => set({ tasks }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearTasks: () => set({ tasks: [] }),
}));
