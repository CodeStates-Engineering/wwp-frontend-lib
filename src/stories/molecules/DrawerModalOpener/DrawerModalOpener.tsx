import {
  DrawerModal,
  DrawerModalProps,
  Tag,
  TagProps,
  ExpandableButton,
  ExpandableButtonProps,
  Button,
  ButtonProps,
} from '../../atoms';
import { useParentState } from '@hooks';

type ModalOpenerType = 'tag' | 'expandable-button' | 'button';

type OpenerProps<T extends ModalOpenerType = 'button'> = T extends 'tag'
  ? TagProps
  : T extends 'expandable-button'
  ? ExpandableButtonProps
  : ButtonProps;

export interface DrawerModalOpenerProps<T extends ModalOpenerType = 'button'> {
  type?: T;
  children?: React.ReactNode;
  openerOptions?: OpenerProps<T>;
  modalOptions?: Omit<DrawerModalProps, 'children'>;
}

export function DrawerModalOpener<T extends ModalOpenerType = 'button'>({
  type = 'button' as T,
  children,
  openerOptions,
  modalOptions,
}: DrawerModalOpenerProps<T>) {
  const { opened, onClose, ...restModalOptions } = modalOptions ?? {},
    [modalOpened, setModalOpend] = useParentState(() => opened, [opened], modalOptions?.valueSync);

  const { onClick, ...restOpenerOptions } = openerOptions ?? {};

  const openerProps = {
    ...restOpenerOptions,
    onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
      setModalOpend?.(true);
      onClick?.(event);
    },
  };

  const modalProps = {
    ...restModalOptions,
    children,
    opened: modalOpened,
    valueSync: true,
    onClose: () => {
      setModalOpend?.(false);
      onClose?.();
    },
  };

  return (
    <>
      {(() => {
        switch (type) {
          case 'tag':
            return <Tag {...(openerProps as OpenerProps<'tag'>)} />;
          case 'expandable-button':
            return <ExpandableButton {...(openerProps as OpenerProps<'expandable-button'>)} />;
          default:
            return <Button {...(openerProps as OpenerProps<'button'>)} />;
        }
      })()}
      <DrawerModal {...modalProps} />
    </>
  );
}
