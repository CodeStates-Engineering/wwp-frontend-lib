import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PaginationWithPageSize } from '../PaginationWithPageSize';
import type { PaginationWithPageSizeProps } from '../PaginationWithPageSize';
import { useState } from 'react';
import React from 'react';

export default {
  title: 'molecules/PaginationWithPageSize',
  component: PaginationWithPageSize,
} as ComponentMeta<typeof PaginationWithPageSize>;

const PaginationWithPageSizeStory: ComponentStory<typeof PaginationWithPageSize> = (args) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const PaginationWithPageSizeProps: PaginationWithPageSizeProps = {
    ...args,
    currentPage,
    onChangeCurrentPage: setCurrentPage,
    pageSize,
    onChangePageSize: setPageSize,
  };
  return <PaginationWithPageSize {...PaginationWithPageSizeProps} />;
};

export const Default = PaginationWithPageSizeStory.bind({});
const defaultArgs: PaginationWithPageSizeProps = {
  totalItemCount: 100,
};
Default.args = defaultArgs;
