import { ConfirmModalOpener, ConfirmModalOpenerProps } from '..';

export interface CancelModalOpenerProps
  extends Omit<ConfirmModalOpenerProps<'button'>, 'onConfirm' | 'openerType'> {
  onCancel: ConfirmModalOpenerProps<'button'>['onConfirm'];
}

export function CancelModalOpener({
  onCancel,
  modalType = 'center',
  variant = 'contain',
  theme = 'wewin-blue600',
  shape = 'square',
  size = 'medium',
  confirmButtonContents = '네, 취소합니다.',
  confirmButtonTheme = 'wewin-peach500',
  fontWeight = 'bold',
  fontSize = 'medium',
  fitContainer = false,
  title = (
    <>
      작성중인 내용이 사라집니다.
      <br />
      정말로 취소 하시겠습니까?
    </>
  ),
  ...restProps
}: CancelModalOpenerProps) {
  return (
    <ConfirmModalOpener
      variant={variant}
      size={size}
      theme={theme}
      shape={shape}
      fitContainer={fitContainer}
      openerContents="Cancel Modal Opener"
      openerType="button"
      fontWeight={fontWeight}
      fontSize={fontSize}
      confirmButtonTheme={confirmButtonTheme}
      confirmButtonContents="취소"
      title={title}
      modalType={modalType}
      onConfirm={onCancel}
      {...restProps}
    />
  );
}
