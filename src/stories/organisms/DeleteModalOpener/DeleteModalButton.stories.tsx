import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DeleteModalOpener } from './DeleteModalButton';
import type { DeleteModalOpenerProps } from './DeleteModalButton';
import React from 'react';

export default {
  title: 'organisms/DeleteModalOpener',
  component: DeleteModalOpener,
} as ComponentMeta<typeof DeleteModalOpener>;

const DeleteModalOpenerStory: ComponentStory<typeof DeleteModalOpener> = (args) => (
  <DeleteModalOpener {...args} />
);

export const Default = DeleteModalOpenerStory.bind({});
const defaultArgs: DeleteModalOpenerProps = {
  modalOptions: {
    title: '정말 삭제하시겠습니까?',
  },
};
Default.args = defaultArgs;
