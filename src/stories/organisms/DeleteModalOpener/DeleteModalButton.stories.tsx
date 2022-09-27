import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DeleteModalOpener } from './DeleteModalButton';
import React from 'react';

export default {
  title: 'organisms/DeleteModalOpener',
  component: DeleteModalOpener,
} as ComponentMeta<typeof DeleteModalOpener>;

const DeleteModalOpenerStory: ComponentStory<typeof DeleteModalOpener> = (
  args,
) => <DeleteModalOpener
  {...args}
  title={(
    <>
      작성중인 내용이 사라집니다.
      <br />
      정말로 삭제 하시겠습니까?
    </>
  )}
/>;

export const Default = DeleteModalOpenerStory.bind({});
Default.args = {
  onDelete: () => {},
  modalType: 'center',
  type: 'button',
  openerContents: '삭제',
  confirmButtonTheme: 'wewin-peach500',
  maxWidth: '340px',
  title: (
    <>
      작성중인 내용이 사라집니다.
      <br />
      정말로 삭제 하시겠습니까?
    </>
  ),
  disabled: false,
  confirmButtonDisabled: false,
  contour: false,
};