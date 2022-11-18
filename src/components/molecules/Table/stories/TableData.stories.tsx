import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from '../Table';
import type { TableProps } from '../Table';
import { Button, Tab } from '../../../atoms';
import React from 'react';

export default {
  title: 'molecules/Table/Data',
  component: Table.Data,
} as ComponentMeta<typeof Table.Data>;

const TableStory: ComponentStory<typeof Table.Data> = (args) => <Table.Container {...args} />;

export const Default = TableStory.bind({});
{
  const ROW_COUNT = 13;
  const defaultArgs: TableProps = {
    config: {
      code: {
        hoverHighlight: true,
        maxWidth: '100px',
      },
      long_text: {
        maxWidth: '400px',
        summarized: true,
      },
      email: {
        minWidth: '200px',
        align: 'left',
      },
      button: {
        minWidth: '300px',
      },
    },
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Title name="code">Code</Table.Title>
            <Table.Title>PhoneNumber</Table.Title>
            <Table.Title name="email">Email</Table.Title>
            <Table.Title name="button">Button</Table.Title>
            <Table.Title>index</Table.Title>
            <Table.Title name="long_text">long text</Table.Title>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {(() => {
            const rows: JSX.Element[] = [];
            for (let i = 0; i < ROW_COUNT; i++) {
              rows.push(
                <Table.Row key={i}>
                  <Table.Data>{(i + 1) * 100000 + i * 33}</Table.Data>
                  <Table.Data>010-0000-0000</Table.Data>
                  <Table.Data name="email">User{i}@codestates.com</Table.Data>
                  <Table.Data name="button">
                    <Button
                      size="small"
                      minWidth="70px"
                      fontSize="smallX"
                      onClick={() => console.log('test2')}
                    >
                      Button {i}
                    </Button>
                  </Table.Data>
                  <Table.Data>{i}</Table.Data>
                  <Table.Data name="long_text">
                    http://localhost:6006/?path=/story/molecules-table-data--default&args=config.0.maxWidth:200px
                  </Table.Data>
                </Table.Row>
              );
            }
            return rows;
          })()}
        </Table.Body>
      </>
    ),
  };
  Default.args = defaultArgs;
}
