import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplexTagbox } from './ComplexInput';
import React from 'react';

export default {
  title: 'molecules/ComplexInput/ComplexTagbox',
  component: ComplexTagbox,
} as ComponentMeta<typeof ComplexTagbox>;

const ComplexTagboxStory: ComponentStory<typeof ComplexTagbox> = (args) => (
  <ComplexTagbox {...args} />
);

export const Default = ComplexTagboxStory.bind({});
Default.args = {
  labelText: '라벨',
};
