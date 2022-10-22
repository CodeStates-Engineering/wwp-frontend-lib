import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { SectionMoveButton } from '../SectionMoveButton';
import React from 'react';
export default {
  title: 'atoms/SectionMoveButton',
  component: SectionMoveButton,
} as ComponentMeta<typeof SectionMoveButton>;

const SectionMoveButtonStory: ComponentStory<typeof SectionMoveButton> = (args) => (
  <SectionMoveButton {...args} />
);

export const Default = SectionMoveButtonStory.bind({});
Default.args = {
  title: 'title',
  subTitle: 'sub title',
};
