import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from './Table';
import React from 'react';

export default {
  title: 'molecules/Table',
  component: Table.Container,
} as ComponentMeta<typeof Table.Container>;

const TableStory: ComponentStory<typeof Table.Container> = (args) => (
  <Table.Container {...args} />
);

export const Default = TableStory.bind({});
Default.argTypes = {
  children: {
    defaultValue: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Title>title</Table.Title>
            <Table.Title>title2</Table.Title>
            <Table.Title>title3</Table.Title>
          </Table.Row>
        </Table.Head>
        <Table.Body></Table.Body>
      </>
    ),
    control: {
      type: 'object',
    },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  dataExisted: {
    defaultValue: false,
    control: {
      type: 'boolean',
    },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  loading: {
    defaultValue: false,
    control: {
      type: 'boolean',
    },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  invalid: {
    defaultValue: true,
    control: {
      type: 'boolean',
    },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: true,
      },
    },
  },
  maxWidth: {
    defaultValue: '100%',
    control: {
      type: 'text',
    },
    table: {
      type: {
        summary: 'React.CSSProperties["maxWidth"]',
      },
      defaultValue: {
        summary: '100%',
      },
    },
  },
};