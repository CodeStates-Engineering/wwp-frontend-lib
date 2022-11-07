import scss from './Modal.module.scss';
import { X } from 'react-feather';
import { useParentState } from '../../../hooks';
import { cleanClassName } from '../../../utils';
import { Button, ButtonProps } from '../Button/Button';
import { useState } from 'react';

export interface ModalProps {
  children?: React.ReactNode;
  opened?: boolean;
  onClose?: () => void;
  closeButton?: boolean;
  title?: React.ReactNode;
  subText?: React.ReactNode;
  modalType?: 'left' | 'center';
  maxWidth?: React.CSSProperties['maxWidth'];
  buttonsOptions?: (Omit<ButtonProps, 'onClick'> & {
    onClick?: (closeModal: () => void) => void;
  })[];
  contour?: boolean;
  valueSync?: boolean;
}

export function Modal({
  children,
  opened,
  closeButton = true,
  onClose,
  title,
  subText,
  modalType = 'left',
  maxWidth = 'unset',
  contour = false,
  buttonsOptions,
  valueSync,
}: ModalProps) {
  const [modalOpened, setModalOpened] = useParentState(() => opened, [opened], valueSync),
    [modalClosing, setModalClosing] = useState(false),
    closeModal = () => {
      setModalClosing(true);
      setTimeout(() => {
        setModalClosing(false);
        setModalOpened?.(false);
        onClose?.();
      }, 200);
    };

  if (!modalOpened) return <></>;

  const TitleSection = () => (
    <section className={`${scss.title_section} ${scss[modalType]}`}>
      {title && <h2 className={scss.title}>{title}</h2>}
      {subText && <p className={scss.sub_text}>{subText}</p>}
    </section>
  );

  const CloseButton = () =>
    closeButton ? (
      <div>
        <button className={scss.modal_close_button} onClick={closeModal}>
          <X />
        </button>
      </div>
    ) : (
      <></>
    );

  const modalBodyClassName = `${scss.modal_body} ${scss[modalType]}`;

  return (
    <div className={cleanClassName(`${scss.modal_container} ${modalClosing && scss.closing}`)}>
      <div className={scss.background} onClick={closeModal} />
      <article className={scss.modal} style={{ maxWidth }}>
        {(() => {
          switch (modalType) {
            case 'left':
              return (
                <>
                  <header
                    className={cleanClassName(`${scss.modal_header} ${contour && scss.contour}`)}
                  >
                    <TitleSection />
                    <CloseButton />
                  </header>
                  <section className={modalBodyClassName}>{children}</section>
                </>
              );
            case 'center':
              return (
                <>
                  <header
                    className={cleanClassName(`${scss.modal_header} ${contour && scss.contour}`)}
                  >
                    <CloseButton />
                  </header>
                  <section className={modalBodyClassName}>
                    <TitleSection />
                    {children}
                  </section>
                </>
              );
          }
        })()}
        {buttonsOptions && (
          <footer className={`${scss.modal_footer} ${contour && scss.contour}`}>
            {buttonsOptions.map((buttonOptions) => {
              const { onClick, ...buttonProps } = buttonOptions;
              return <Button {...buttonProps} onClick={() => onClick?.(closeModal)} />;
            })}
          </footer>
        )}
      </article>
    </div>
  );
}
