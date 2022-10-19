import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplexSwitch } from './ComplexInput';
import React from 'react';

export default {
  title: 'molecules/ComplexInput/ComplexSwitch',
  component: ComplexSwitch,
} as ComponentMeta<typeof ComplexSwitch>;

const ComplexSwitchStory: ComponentStory<typeof ComplexSwitch> = (args) => (
  <ComplexSwitch {...args} />
);

export const Default = ComplexSwitchStory.bind({});
Default.args = {
  labelText: '라벨',
};
