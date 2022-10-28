import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination } from '../Pagination';
import React from 'react';

export default {
  title: 'atoms/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const PaginationStory: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const Default = PaginationStory.bind({});
