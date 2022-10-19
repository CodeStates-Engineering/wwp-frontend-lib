import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ValidationMessage } from './ValidationMessage';
import React from 'react';

export default {
  title: 'atoms/ValidationMessage',
  component: ValidationMessage,
} as ComponentMeta<typeof ValidationMessage>;

const ValidationMessageStory: ComponentStory<typeof ValidationMessage> = (args) => (
  <ValidationMessage {...args} />
);

export const Default = ValidationMessageStory.bind({});
Default.args = {
  visableMessage: '숫자만 입력 가능합니다.',
};
