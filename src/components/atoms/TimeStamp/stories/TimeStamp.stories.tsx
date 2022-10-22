import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { TimeStamp } from '../TimeStamp';
import type { TimeStampProps } from '../TimeStamp';
import React from 'react';
export default {
  title: 'atoms/TimeStamp',
  component: TimeStamp,
} as ComponentMeta<typeof TimeStamp>;

const TimeStampStory: ComponentStory<typeof TimeStamp> = (args) => <TimeStamp {...args} />;

export const Default = TimeStampStory.bind({});
const defaultArgs: TimeStampProps = {
  title: '등록 일시',
  time: new Date(),
  author: 'system',
  isAdmin: true,
};
Default.args = defaultArgs;
