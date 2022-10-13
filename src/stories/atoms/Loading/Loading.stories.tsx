import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Loading } from './Loading';
import React from 'react';
export default {
  title: 'atoms/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

const LoadingStory: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const Default = LoadingStory.bind({});
