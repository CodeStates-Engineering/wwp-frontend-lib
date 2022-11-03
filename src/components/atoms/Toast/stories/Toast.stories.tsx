import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Toast } from '../Toast';
import type { ToastProps } from '../Toast';
import React from 'react';
export default {
  title: 'atoms/Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>;

const ToastStory: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const Default = ToastStory.bind({});
const defaultArgs: ToastProps = {
  title: 'Success',
};
Default.args = defaultArgs;

export const Error = ToastStory.bind({});
const errorArgs: ToastProps = {
  title: 'Error',
  type: 'error',
};

Error.args = errorArgs;
