import {
  Modal,
  ModalProps,
  Tag,
  TagProps,
  ExpandableButton,
  ExpandableButtonProps,
  Button,
  ButtonProps,
} from '../../atoms';
import { useParentState } from '@hooks';

export type ModalOpenerType = 'tag' | 'expandable-button' | 'button';

type OpenerProps<T extends ModalOpenerType> = T extends 'tag'
  ? TagProps
  : T extends 'expandable-button'
  ? ExpandableButtonProps
  : ButtonProps;

export type ModalOpenerProps<T extends ModalOpenerType> = OpenerProps<T> &
  ModalProps & {
    openerType?: T;
    openerContents?: React.ReactNode;
  };

export function ModalOpener<T extends ModalOpenerType>({
  openerType,
  openerContents,
  children,
  opened,
  closeButton,
  title,
  explanation,
  modalType,
  onClick,
  footerItems,
  ...openerPropsPart
}: ModalOpenerProps<T>) {
  const [modalOpened, setModalOpend] = useParentState(opened);

  const openerProps: any = {
    ...openerPropsPart,
    children: openerContents,
    onClick: (value?: any) => {
      onClick?.(value);
      setModalOpend(false);
      setTimeout(() => setModalOpend(true));
    },
  };

  const modalProps: ModalProps = {
    children,
    modalType,
    opened: modalOpened,
    closeButton,
    title,
    explanation,
    footerItems
  };

  const Opener = (() => {
    switch (openerType) {
      case 'tag':
        openerProps.type = 'button';
        return Tag;
      case 'expandable-button':
        return ExpandableButton;
      default:
        return Button;
    }
  })();

  return (
    <>
      <Opener {...openerProps} />
      <Modal {...modalProps} />
    </>
  );
}
