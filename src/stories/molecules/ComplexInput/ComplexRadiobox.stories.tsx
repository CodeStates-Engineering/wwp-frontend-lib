import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplexRadiobox } from './ComplexInput';
import React from 'react';

export default {
  title: 'molecules/ComplexInput/ComplexRadiobox',
  component: ComplexRadiobox,
} as ComponentMeta<typeof ComplexRadiobox>;

const ComplexRadioboxStory: ComponentStory<typeof ComplexRadiobox> = (args) => (
  <ComplexRadiobox {...args} />
);

export const Default = ComplexRadioboxStory.bind({});
Default.args = {
  labelText: '라벨',
  options: ['option1', 'option2', 'option3'],
};
