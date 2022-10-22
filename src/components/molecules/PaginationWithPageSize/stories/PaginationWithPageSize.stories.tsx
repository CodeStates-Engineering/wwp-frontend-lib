import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PaginationWithPageSize } from '../PaginationWithPageSize';
import { usePaginationState } from '../../../../hooks';
import React from 'react';

export default {
  title: 'molecules/PaginationWithPageSize',
  component: PaginationWithPageSize,
} as ComponentMeta<typeof PaginationWithPageSize>;

const PaginationWithPageSizeStory: ComponentStory<typeof PaginationWithPageSize> = (args) => {
  const paginationState = usePaginationState();
  return <PaginationWithPageSize {...args} paginationState={paginationState} />;
};

export const Default = PaginationWithPageSizeStory.bind({});
Default.args = {
  totalItemCount: 100,
  pageSizeOptions: [10, 20, 30, 50],
};
Default.decorators = [
  (Story) => (
    <div style={{ marginTop: '200px' }}>
      <Story />
    </div>
  ),
];
