import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Chip } from '../Chip';
import React from 'react';
export default {
  title: 'organisms/Chip',
  component: Chip,
} as ComponentMeta<typeof Chip>;

const ChipStory: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

export const Default = ChipStory.bind({});
Default.args = {
  children: 'Chip',
};
