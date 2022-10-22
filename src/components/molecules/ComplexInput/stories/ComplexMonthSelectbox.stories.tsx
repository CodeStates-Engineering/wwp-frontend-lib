import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplexMonthSelectbox } from '../ComplexInput';
import React from 'react';

export default {
  title: 'molecules/ComplexInput/ComplexMonthSelectbox',
  component: ComplexMonthSelectbox,
} as ComponentMeta<typeof ComplexMonthSelectbox>;

const ComplexMonthSelectboxStory: ComponentStory<typeof ComplexMonthSelectbox> = (args) => (
  <ComplexMonthSelectbox {...args} />
);

export const Default = ComplexMonthSelectboxStory.bind({});
Default.args = {
  labelText: '라벨',
};
