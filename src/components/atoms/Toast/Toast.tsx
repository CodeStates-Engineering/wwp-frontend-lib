import scss from './Toast.module.scss';
import { CheckCircle, AlertCircle, X } from 'react-feather';
import { useParentState } from 'hooks';

export interface ToastProps {
  children?: React.ReactNode;
  type?: 'success' | 'error';
  title: string;
  opened?: boolean;
  onClose?: () => void;
  valueSync?: boolean;
}

export function Toast({
  children,
  title,
  type = 'success',
  onClose,
  opened = true,
  valueSync,
}: ToastProps) {
  const [display, setDispaly] = useParentState(() => opened, [opened], valueSync);

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
  }[type];

  return (
    <section className={`${scss.toast} ${scss[type]} ${scss[display ? 'show' : 'hide']}`}>
      <header className={scss.toast_header}>
        <Icon className={`${scss.icon} ${scss[type]}`} />
        <h4 className={scss.title}>{title}</h4>
        <button
          className={scss.close_button}
          onClick={() => {
            setDispaly?.(false);
            onClose?.();
          }}
        >
          <X size="19px" />
        </button>
      </header>
      {children}
    </section>
  );
}
