import { ModalOpener } from '..';
import type { ModalOpenerProps } from '..';

export interface CancelModalOpenerProps
  extends Omit<ModalOpenerProps<'button'>, 'modalOptions' | 'type'> {
  modalOptions?: Omit<Required<ModalOpenerProps>['modalOptions'], 'buttonsOptions'>;
  cancelButtonOptions?: Required<Required<ModalOpenerProps>['modalOptions']>['buttonsOptions'][0];
}

export function CancelModalOpener({
  cancelButtonOptions,
  openerOptions,
  modalOptions,
  ...restProps
}: CancelModalOpenerProps) {
  const openerProps: CancelModalOpenerProps['openerOptions'] = {
    theme: 'bluish-gray500',
    fontWeight: 'medium',
    ...openerOptions,
  };

  const cancelButtonProps: CancelModalOpenerProps['cancelButtonOptions'] = {
    theme: 'wewin-peach500',
    fontWeight: 'medium',
    fontSize: 'normal',
    children: '네, 취소합니다.',
    fitContainer: true,
    ...cancelButtonOptions,
  };

  const modalOpenerProps: ModalOpenerProps = {
    modalOptions: {
      modalType: 'center',
      title: (
        <>
          작성중인 내용이 사라집니다.
          <br />
          정말로 취소하시겠습니까?
        </>
      ),
      ...modalOptions,
      buttonsOptions: [cancelButtonProps],
    },
    openerOptions: openerProps,
    ...restProps,
  };
  return <ModalOpener {...modalOpenerProps} />;
}
