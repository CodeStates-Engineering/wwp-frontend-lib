import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Progress } from '../Progress';

export default {
  title: 'atoms/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

const ProgressStory: ComponentStory<typeof Progress> = (args) => (
  <div style={{ width: '900px' }}>
    <Progress
      {...args}
    />
  </div>
);

export const Default = ProgressStory.bind({});
Default.args = {
  totalCount: 6,
  indicatorConfig: [
    {
      color: 'green600',
      activeNumber: [1, 2],
    },
    {
      color: 'wewin-orange500',
      activeNumber: [3, 4],
    },
  ],
};
