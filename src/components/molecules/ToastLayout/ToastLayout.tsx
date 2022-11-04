import { Toast } from '../../atoms/Toast/Toast';
import { useToastLayoutStore } from '../../../hooks/useToast';
import scss from './ToastLayout.module.scss';
import { useEffect } from 'react';

export interface ToastLayoutProps {
  holdingTime?: number;
}

export function ToastLayout({ holdingTime = 5000 }: ToastLayoutProps) {
  const [toastOptions, clearToast, deleteLastToast] = useToastLayoutStore((state) => [
    state.toastOptions,
    state.clearToast,
    state.deleteLastToast,
  ]);

  const toastCount = toastOptions.length;

  useEffect(() => {
    const timer = setTimeout(clearToast, holdingTime);
    return () => clearTimeout(timer);
  }, [toastCount]);

  if (!toastCount) return <></>;

  const LastToast = () => {
    const { description, ...toastProps } = toastOptions[toastCount - 1];
    return (
      <Toast {...toastProps} onClose={deleteLastToast}>
        {description}
      </Toast>
    );
  };

  return (
    <div className={scss.toast_layout}>
      <LastToast />
    </div>
  );
}
