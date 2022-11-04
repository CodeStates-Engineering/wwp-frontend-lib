import create from 'zustand';
import type { ToastProps } from '../components/atoms/Toast/Toast';

interface ToastOption extends Pick<ToastProps, 'title' | 'type'> {
  description?: React.ReactNode;
}

interface ToastLayoutStore {
  toastOptions: ToastOption[];
  addToast: (option: ToastOption) => void;
  clearToast: () => void;
  deleteLastToast: () => void;
}

export const useToastLayoutStore = create<ToastLayoutStore>((set) => ({
  toastOptions: [],
  addToast: (option) =>
    set((state) => ({
      toastOptions: [...state.toastOptions, option],
    })),
  clearToast: () => set(() => ({ toastOptions: [] })),
  deleteLastToast: () =>
    setTimeout(
      () =>
        set((state) => ({
          toastOptions: state.toastOptions.slice(0, -1),
        })),
      350
    ),
}));

export const useToast = () => useToastLayoutStore((state) => state.addToast);
