import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Textarea } from '../Textarea';
import React from 'react';

export default {
  title: 'atoms/Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const TextareaStory: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Default = TextareaStory.bind({});
