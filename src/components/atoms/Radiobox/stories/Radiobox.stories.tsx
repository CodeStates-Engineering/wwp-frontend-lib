import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Radiobox, RadioboxProps } from '../Radiobox';
import React from 'react';

export default {
  title: 'atoms/Radiobox',
  component: Radiobox,
} as ComponentMeta<typeof Radiobox>;

const RadioboxStory: ComponentStory<typeof Radiobox> = (args: RadioboxProps<any>) => (
  <Radiobox {...args} />
);

export const Default = RadioboxStory.bind({});
Default.args = {
  options: ['option1', 'option2', 'option3', 'option4'],
};
