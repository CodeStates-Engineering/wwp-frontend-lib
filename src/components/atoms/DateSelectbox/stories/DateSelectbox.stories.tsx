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

const defaultArgs: DateSelectboxProps<'date'> = {
  openDirection: ['down', 'left'],
};

Default.args = defaultArgs;

export const DateRange = DateSelectboxStory.bind({});
const DateRangeArgs: DateSelectboxProps<'date-range'> = {
  openDirection: ['down', 'left'],
  type: 'date-range',
};
DateRange.args = DateRangeArgs;

export const DateRangeWithTime = DateSelectboxStory.bind({});
const DateRangeWithTimeArgs: DateSelectboxProps<'date-range'> = {
  ...DateRangeArgs,
  withTime: true,
  width: '380px',
};
DateRangeWithTime.args = DateRangeWithTimeArgs;

export const LinearDate = DateSelectboxStory.bind({});
const LinearDateArgs: DateSelectboxProps<'date'> = {
  ...defaultArgs,
  theme: 'linear',
};
LinearDate.args = LinearDateArgs;

export const LinearDateRange = DateSelectboxStory.bind({});
const LinearDateRangeArgs: DateSelectboxProps<'date-range'> = {
  ...DateRangeArgs,
  theme: 'linear',
};
LinearDateRange.args = LinearDateRangeArgs;
