import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplexSearchbox } from '../ComplexInput';
import React from 'react';

export default {
  title: 'molecules/ComplexInput/ComplexSearchbox',
  component: ComplexSearchbox,
} as ComponentMeta<typeof ComplexSearchbox>;

const ComplexSearchboxStory: ComponentStory<typeof ComplexSearchbox> = (args) => (
  <ComplexSearchbox {...args} />
);

export const Default = ComplexSearchboxStory.bind({});
Default.args = {
  labelText: '라벨',
};
