import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplexDateSelectbox } from './ComplexInput';
import React from 'react';

export default {
  title: 'molecules/ComplexInput/ComplexDateSelectbox',
  component: ComplexDateSelectbox,
} as ComponentMeta<typeof ComplexDateSelectbox>;

const ComplexDateSelectboxStory: ComponentStory<typeof ComplexDateSelectbox> = (args) => (
  <ComplexDateSelectbox {...args} />
);

export const Default = ComplexDateSelectboxStory.bind({});
Default.args = {
  labelText: '라벨',
};
