import {
  ModalOpener,
  ModalOpenerProps,
  ModalOpenerType,
} from '../../molecules';
import { Button, ButtonProps } from '../../atoms';
import { useParentState } from '@hooks';

type ConfirmReturnType = { isRejected: boolean } | void;

export type ConfirmModalOpenerProps<T extends ModalOpenerType> =
  ModalOpenerProps<T> & {
  onConfirm?: () => Promise<ConfirmReturnType> | ConfirmReturnType;
  confirmButtonContents?: React.ReactNode;
  confirmButtonTheme?: ButtonProps['theme'];
  confirmButtonDisabled?: boolean;
  confirmButtonDelay?: ButtonProps['delay'];
};

export function ConfirmModalOpener<T extends ModalOpenerType>({
  onConfirm,
  confirmButtonContents,
  opened,
  children,
  confirmButtonDisabled,
  confirmButtonTheme,
  confirmButtonDelay,
  ...modalOpenerProps
}: ConfirmModalOpenerProps<T>) {
  const [modalOpened, setModalOpened] = useParentState(opened);

  return (
    <ModalOpener
      {...(modalOpenerProps as ModalOpenerProps<ModalOpenerType>)}
      opened={modalOpened}
      footerItems={
        <Button
          fontSize="medium"
          theme={confirmButtonTheme}
          fontWeight="boldest"
          fitContainer
          disabled={confirmButtonDisabled}
          delay={confirmButtonDelay}
          onClick={async () => {
            setModalOpened(true);
            const confirm = await onConfirm?.();
            if (confirm?.isRejected) return;
            setTimeout(() => setModalOpened(false));
          }}
        >
          {confirmButtonContents ?? modalOpenerProps.openerContents}
        </Button>
      }
    >{children}</ModalOpener>
  );
}
