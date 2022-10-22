import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplexTextbox } from './ComplexInput';
import type { ComplexTextboxProps } from './ComplexInput';
import React from 'react';

export default {
  title: 'molecules/ComplexInput/ComplexTextbox',
  component: ComplexTextbox,
} as ComponentMeta<typeof ComplexTextbox>;

const ComplexTextboxStory: ComponentStory<typeof ComplexTextbox> = (args) => (
  <ComplexTextbox {...args} />
);

export const Default = ComplexTextboxStory.bind({});
const defaultArgs: ComplexTextboxProps = {
  labelText: '라벨',
  essential: true,
};
Default.args = defaultArgs;
