import scss from './Toast.module.scss';
import { CheckCircle, X } from 'react-feather';

export interface ToastProps {}

export function Toast(props: ToastProps) {
  return (
    <section className={scss.toast}>
      <header className={scss.toast_header}>
        <CheckCircle className={scss.sucess_icon} />
        <h4 className={scss.title}>Toast</h4>
        <button className={scss.close_button}>
          <X size="19px" />
        </button>
      </header>
    </section>
  );
}
