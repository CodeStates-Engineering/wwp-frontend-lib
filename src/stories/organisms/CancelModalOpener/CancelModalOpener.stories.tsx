import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CancelModalOpener } from './CancelModalOpener';
import React from 'react';

export default {
  title: 'organisms/CancelModalOpener',
  component: CancelModalOpener,
} as ComponentMeta<typeof CancelModalOpener>;

const CancelModalOpenerStory: ComponentStory<typeof CancelModalOpener> = (
  args,
) => <CancelModalOpener {...args} />;

export const Default = CancelModalOpenerStory.bind({});
Default.args = {
  onCancel: () => {},
  modalType: 'center',
  variant: 'contain',
  theme: 'wewin-blue600',
  shape: 'square',
  size: 'medium',
  confirmButtonContents: '네, 취소합니다.',
  confirmButtonTheme: 'wewin-peach500',
  fontWeight: 'bold',
  fontSize: 'medium',
  fitContainer: false,
};

