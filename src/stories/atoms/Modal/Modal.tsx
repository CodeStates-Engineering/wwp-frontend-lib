import scss from './Modal.module.scss';
import { X } from 'react-feather';
import { useParentState } from '@hooks';

export interface ModalProps {
  children?: React.ReactNode;
  opened?: boolean;
  closeButton?: boolean;
  title?: React.ReactNode;
  explanation?: React.ReactNode;
  modalType?: 'left' | 'center';
  maxWidth?: React.CSSProperties['maxWidth'];
}

export function Modal({
  children,
  opened = false,
  closeButton = true,
  title,
  explanation,
  modalType = 'left',
  maxWidth = '340px',
}: ModalProps) {
  const [modalOpened, setModalOpened] = useParentState(opened),
    closeModal = () => setModalOpened(false);

  if (!modalOpened) return <></>;

  const ModalContents = () => {
    const CloseButton = closeButton ? (
      <button className={scss.modal_close_button} onClick={closeModal}>
        <X />
      </button>
    ) : undefined;

    const Title = title ? (
      <h2 className={`${scss.title} ${scss[modalType]}`}>{title}</h2>
    ) : undefined;

    const Explanation = explanation ? (
      <p className={`${scss.explanation} ${scss[modalType]}`}>{explanation}</p>
    ) : undefined;

    switch (modalType) {
      case 'left':
        return (
          <header className={scss.modal_header}>
            <div>
              {Title}
              {CloseButton}
            </div>
            {Explanation}
          </header>
        );
      case 'center':
        return (
          <>
            <header className={scss.modal_header}>
              <div>{CloseButton}</div>
            </header>
            <div className={scss.center_modal_contents}>
              {Title}
              {Explanation}
            </div>
          </>
        );
    }
  };

  return (
    <div className={scss.modal_container}>
      <div className={scss.background} onClick={closeModal} />
      <article className={scss.modal} style={{ maxWidth }}>
        <ModalContents />
        {children}
      </article>
    </div>
  );
}
