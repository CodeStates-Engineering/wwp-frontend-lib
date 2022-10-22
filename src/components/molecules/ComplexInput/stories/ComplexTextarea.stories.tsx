import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplexTextarea } from '../ComplexInput';
import React from 'react';

export default {
  title: 'molecules/ComplexInput/ComplexTextarea',
  component: ComplexTextarea,
} as ComponentMeta<typeof ComplexTextarea>;

const ComplexTextareaStory: ComponentStory<typeof ComplexTextarea> = (args) => (
  <ComplexTextarea {...args} />
);

export const Default = ComplexTextareaStory.bind({});
Default.args = {
  labelText: '라벨',
};
