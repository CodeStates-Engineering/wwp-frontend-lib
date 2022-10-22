import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ExpandableButton } from '../ExpandableButton';
import { File } from 'react-feather';
import React from 'react';

export default {
  title: 'atoms/ExpandableButton',
  component: ExpandableButton,
} as ComponentMeta<typeof ExpandableButton>;

const ExpandableButtonStory: ComponentStory<typeof ExpandableButton> = (args) => (
  <ExpandableButton {...args} />
);

export const Default = ExpandableButtonStory.bind({});
Default.args = {
  icon: File,
  children: 'ExpandableButton',
};
