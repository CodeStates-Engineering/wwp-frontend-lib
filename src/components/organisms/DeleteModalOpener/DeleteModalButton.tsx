import { Trash2 } from 'react-feather';
import { ModalOpener } from '..';
import type { ModalOpenerProps } from '..';
export interface DeleteModalOpenerProps
  extends Omit<ModalOpenerProps<'button'>, 'modalOptions' | 'type'> {
  modalOptions?: Omit<Required<ModalOpenerProps>['modalOptions'], 'buttonsOptions'>;
  deleteButtonOptions?: Required<Required<ModalOpenerProps>['modalOptions']>['buttonsOptions'][0];
}

export function DeleteModalOpener({
  deleteButtonOptions,
  openerOptions,
  modalOptions,
  ...restProps
}: DeleteModalOpenerProps) {
  const openerProps: DeleteModalOpenerProps['openerOptions'] = {
    fontWeight: 'medium',
    fontSize: 'small',
    variant: 'ghost',
    theme: 'bluish-gray600',
    icon: Trash2,
    ...openerOptions,
  };

  const deleteButtonProps: DeleteModalOpenerProps['deleteButtonOptions'] = {
    fontWeight: 'medium',
    fontSize: 'normal',
    children: '네, 삭제합니다.',
    theme: 'wewin-peach500',
    delay: 1500,
    fitContainer: true,
    ...deleteButtonOptions,
  };

  const modalOpenerProps: ModalOpenerProps = {
    modalOptions: {
      modalType: 'center',
      ...modalOptions,
      buttonsOptions: [deleteButtonProps],
    },
    openerOptions: openerProps,
    ...restProps,
  };
  return <ModalOpener {...modalOpenerProps} />;
}
