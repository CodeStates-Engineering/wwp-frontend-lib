import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tagbox } from './Tagbox';
import React from 'react';

export default {
  title: 'atoms/Tagbox',
  component: Tagbox,
} as ComponentMeta<typeof Tagbox>;

const TagboxStory: ComponentStory<typeof Tagbox> = (args) => <Tagbox {...args} />;

export const Default = TagboxStory.bind({});
