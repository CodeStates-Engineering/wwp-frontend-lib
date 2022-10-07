import scss from './DrawerModal.module.scss';
import { X } from 'react-feather';
import { useParentState } from '@hooks';
import { cleanClassName } from '@utils';
import { useState } from 'react';

export interface DrawerModalProps {
  children?: React.ReactNode;
  opened?: boolean;
  closeButton?: boolean;
  title?: React.ReactNode;
  contour?: boolean;
  onClose?: () => void;
}

export function DrawerModal({
  children,
  opened,
  closeButton = true,
  title,
  contour = true,
  onClose,
}: DrawerModalProps) {
  const [] = useState();
  const [modalOpened, setModalOpened] = useParentState(opened),
    [modalClosing, setModalClosing] = useState(false),
    closeModal = () => {
      setModalClosing(true);
      setTimeout(() => {
        setModalOpened?.(false);
        setModalClosing(false);
        onClose?.();
      }, 700);
    };
  return modalOpened ? (
    <div className={scss.modal_container}>
      <div className={scss.background} onClick={closeModal} />
      <article className={cleanClassName(`${scss.modal} ${modalClosing && scss.closing}`)}>
        <header className={cleanClassName(`${scss.modal_header} ${contour && scss.contour}`)}>
          <h2 className={scss.title}>{title}</h2>
          {closeButton && (
            <button className={scss.modal_close_button} onClick={closeModal}>
              <X />
            </button>
          )}
        </header>
        <section className={cleanClassName(`${scss.modal_body} ${scss.contour}`)}>
          {children}
        </section>
      </article>
    </div>
  ) : (
    <></>
  );
}
