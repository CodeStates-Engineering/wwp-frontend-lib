import { ConfirmModalOpener, ConfirmModalOpenerProps } from '..';
import { Trash } from 'react-feather';

export interface DeleteModalOpenerProps
  extends Omit<ConfirmModalOpenerProps<'expandable-button'>,
    'openerType' | 'icon' | 'onConfirm'> {
  onDelete: ConfirmModalOpenerProps<'expandable-button'>['onConfirm'];
}
export function DeleteModalOpener({
  onDelete,
  modalType = 'center',
  openerContents = '삭제',
  confirmButtonTheme = 'wewin-peach500',
  type = 'button',
  maxWidth = '340px',
  disabled = false,
  contour = false,
  confirmButtonDisabled = false,
  ...restProps
}: DeleteModalOpenerProps) {
  return (
    <ConfirmModalOpener
      openerType="expandable-button"
      {...restProps}
      icon={Trash}
      confirmButtonTheme={confirmButtonTheme}
      modalType={modalType}
      openerContents={openerContents}
      onConfirm={onDelete}
      maxWidth={maxWidth}
      contour={contour}
      disabled={disabled}
      confirmButtonDisabled={confirmButtonDisabled}
    />
  );
}
