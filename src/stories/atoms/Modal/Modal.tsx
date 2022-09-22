import scss from "./Modal.module.scss";
import { X } from "react-feather";
import { useParentState } from "@hooks";
import { cleanClassName } from "@utils";
import { Button } from "../Button/Button";

export interface ModalProps {
  children?: React.ReactNode;
  opened?: boolean;
  closeButton?: boolean;
  title?: React.ReactNode;
  subText?: React.ReactNode;
  explanation?: React.ReactNode;
  modalType?: "left" | "center";
  maxWidth?: React.CSSProperties["maxWidth"];
  footerItems?: React.ReactNode;
  contour?: boolean;
}

export function Modal({
  children,
  opened = false,
  closeButton = true,
  title,
  subText,
  modalType = "left",
  maxWidth = "340px",
  contour = false,
  footerItems,
}: ModalProps) {
  const [modalOpened, setModalOpened] = useParentState(opened),
    closeModal = () => setModalOpened(false);

  if (!modalOpened) return <></>;

  const TitleSection = () => (
    <section className={`${scss.title_section} ${scss[modalType]}`}>
      <h2 className={scss.title}>{title}</h2>
      <p className={scss.sub_text}>{subText}</p>
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
    <div className={scss.modal_container}>
      <div className={scss.background} onClick={closeModal} />
      <article className={scss.modal} style={{ maxWidth }}>
        {(() => {
          switch (modalType) {
            case "left":
              return (
                <>
                  <header
                    className={cleanClassName(
                      `${scss.modal_header} ${contour && scss.contour}`
                    )}
                  >
                    <TitleSection />
                    <CloseButton />
                  </header>
                  <section className={modalBodyClassName}>{children}</section>
                </>
              );
            case "center":
              return (
                <>
                  <header
                    className={cleanClassName(
                      `${scss.modal_header} ${contour && scss.contour}`
                    )}
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
        {footerItems && (
          <footer className={`${scss.modal_footer} ${contour && scss.contour}`}>
            {footerItems}
          </footer>
        )}
      </article>
    </div>
  );
}
