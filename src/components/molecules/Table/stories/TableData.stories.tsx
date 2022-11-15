import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from '../Table';
import { Button } from '../../../atoms';
import React from 'react';

export default {
  title: 'molecules/Table/Data',
  component: Table.Data,
} as ComponentMeta<typeof Table.Data>;

const TableDataStory: ComponentStory<typeof Table.Data> = (args) => <Table.Data {...args} />;

function TableCommonDecorators({ children }: { children?: React.ReactNode }) {
  return (
    <Table.Container maxWidth="800px">
      <Table.Head>
        <Table.Row>
          <Table.Title>name</Table.Title>
          <Table.Title>email</Table.Title>
          <Table.Title>test</Table.Title>
          <Table.Title>button</Table.Title>
        </Table.Row>
      </Table.Head>
      <Table.Body>{children}</Table.Body>
    </Table.Container>
  );
}

export const Default = TableDataStory.bind({});

Default.decorators = [
  (Story) => {
    const RowList: React.ReactNode[] = [];
    for (let i = 0; i < 10; i++) {
      RowList.push(
        <Table.Row>
          <Table.Data>User {i}</Table.Data>
          <Table.Data resizable>User{i}@codestates.com</Table.Data>
          <Story />
          <Table.Data hoverHighlight={false}>
            <Button size="small" theme="bluish-gray200">
              Button {i}
            </Button>
          </Table.Data>
        </Table.Row>
      );
    }
    return <TableCommonDecorators>{RowList}</TableCommonDecorators>;
  },
];
Default.args = {
  children: '매우 매우 긴글 테스트',
};

export const NoData = TableDataStory.bind({});
NoData.decorators = [() => <TableCommonDecorators />];
