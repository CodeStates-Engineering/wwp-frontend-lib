import scss from "./DrawerModal.module.scss";
import { X } from "react-feather";
import { useParentState } from "@hooks";
import { cleanClassName } from "@utils";

export interface DrawerModalProps {
  children?: React.ReactNode;
  opened?: boolean;
  closeButton?: boolean;
  title?: React.ReactNode;
  contour?: boolean;
}

export function DrawerModal({
  children,
  opened = false,
  closeButton = true,
  title,
  contour = true,
}: DrawerModalProps) {
  const [modalOpened, setModalOpened] = useParentState(opened),
    closeModal = () => setModalOpened(false);
  return modalOpened ? (
    <div className={scss.modal_container}>
      <div className={scss.background} onClick={closeModal} />
      <article className={scss.modal}>
        <header
          className={cleanClassName(
            `${scss.modal_header} ${contour && scss.contour}`
          )}
        >
          <h2 className={scss.title}>{title}</h2>
          {closeButton && (
            <button className={scss.modal_close_button} onClick={closeModal}>
              <X />
            </button>
          )}
        </header>
        <section
          className={cleanClassName(`${scss.modal_body} ${scss.contour}`)}
        >
          {children}
        </section>
      </article>
    </div>
  ) : (
    <></>
  );
}
