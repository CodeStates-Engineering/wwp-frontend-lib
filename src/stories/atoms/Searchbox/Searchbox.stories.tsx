import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Searchbox } from './Searchbox';
import type { SearchboxProps } from './Searchbox';
import React from 'react';

export default {
  title: 'atoms/Searchbox',
  component: Searchbox,
} as ComponentMeta<typeof Searchbox>;

const SearchboxStory: ComponentStory<typeof Searchbox> = (args: SearchboxProps<any>) => (
  <Searchbox {...args} />
);

export const Default = SearchboxStory.bind({});
Default.args = {
  openDirection: ['down', 'left'],
  options: [
    {
      value: '1',
      label: 'options1',
    },
    {
      value: '2',
      label: 'options2',
    },
    {
      value: '3',
      label: 'options3',
    },
  ],
};
