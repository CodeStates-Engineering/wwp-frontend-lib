import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputDescription } from '../InputDescription';
import type { InputDescriptionProps } from '../InputDescription';
import React from 'react';

export default {
  title: 'atoms/InputDescription',
  component: InputDescription,
} as ComponentMeta<typeof InputDescription>;

const InputDescriptionStory: ComponentStory<typeof InputDescription> = (args) => (
  <InputDescription {...args} />
);

export const Default = InputDescriptionStory.bind({});
const defaultArgs: InputDescriptionProps = {
  children: '2022년 10월 24일에 최초 월소득 제출 알림톡이 발송됩니다.',
  visible: true,
};
Default.args = defaultArgs;

export const Error = InputDescriptionStory.bind({});
const errorArgs: InputDescriptionProps = {
  children: '숫자만 입력 가능합니다.',
  visible: true,
  theme: 'error',
};
Error.args = errorArgs;
