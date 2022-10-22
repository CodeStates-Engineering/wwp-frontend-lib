import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateSelectbox, DateSelectboxProps } from '../DateSelectbox';
import React from 'react';

export default {
  title: 'atoms/DateSelectbox',
  component: DateSelectbox,
} as ComponentMeta<typeof DateSelectbox>;

const DateSelectboxStory: ComponentStory<typeof DateSelectbox> = (args) => {
  return <DateSelectbox {...args} />;
};
export const Default = DateSelectboxStory.bind({});

const defaultArgs: DateSelectboxProps<'date-range'> = {
  openDirection: ['down', 'left'],
};

Default.args = defaultArgs;
