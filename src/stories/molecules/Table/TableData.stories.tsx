import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from './Table';
import React from 'react';

export default {
  title: 'molecules/Table/Data',
  component: Table.Data,
} as ComponentMeta<typeof Table.Data>;

const TableDataStory: ComponentStory<typeof Table.Data> = (args) => <Table.Data {...args} />;

function TableCommonDecorators({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ width: '1000px' }}>
      <Table.Container>
        <Table.Head>
          <Table.Row>
            <Table.Title>title</Table.Title>
            <Table.Title>title</Table.Title>
            <Table.Title>title</Table.Title>
            <Table.Title>title</Table.Title>
          </Table.Row>
        </Table.Head>
        <Table.Body>{children}</Table.Body>
      </Table.Container>
    </div>
  );
}

export const Default = TableDataStory.bind({});
Default.argTypes = {
  children: {
    defaultValue: '이것은 긴 텍스트를 내용의 적용된 모습을 보기위한 dummy-data 입니다.',
    control: {
      type: 'text',
    },
    table: {
      type: {
        summary: 'ReactNode',
      },
    },
  },
  resizable: {
    defaultValue: false,
    control: {
      type: 'boolean',
    },
    table: {
      defaultValue: {
        summary: false,
      },
      type: {
        summary: 'boolean',
      },
    },
  },
  align: {
    defaultValue: 'center',
    control: {
      type: 'radio',
      options: ['start', 'center', 'end'],
    },
    table: {
      defaultValue: {
        summary: 'center',
      },
      type: {
        summary: `"start" | "center" | "end"`,
      },
    },
  },
  justify: {
    defaultValue: 'center',
    control: {
      type: 'radio',
      options: ['start', 'center', 'end'],
    },
    table: {
      defaultValue: {
        summary: 'center',
      },
      type: {
        summary: `"start" | "center" | "end"`,
      },
    },
  },
  hoverDirection: {
    defaultValue: 'right',
    control: {
      type: 'radio',
      options: ['left', 'right'],
    },
    table: {
      defaultValue: {
        summary: 'right',
      },
      type: {
        summary: `"left" | "right"`,
      },
    },
  },
  hoverHighlight: {
    defaultValue: true,
    control: {
      type: 'boolean',
    },
    table: {
      defaultValue: {
        summary: true,
      },
      type: {
        summary: 'boolean',
      },
    },
  },
  copyable: {
    defaultValue: false,
    control: {
      type: 'boolean',
    },
    table: {
      defaultValue: {
        summary: false,
      },
      type: {
        summary: 'boolean',
      },
    },
  },
};
Default.decorators = [
  (Story) => {
    const RowList: React.ReactNode[] = [];
    for (let i = 0; i < 10; i++) {
      RowList.push(
        <Table.Row>
          <Story />
          <Story />
          <Story />
          <Story />
        </Table.Row>
      );
    }
    return <TableCommonDecorators>{RowList}</TableCommonDecorators>;
  },
];
Default.args = {
  children: '이것은 긴 텍스트를 내용의 적용된 모습을 보기위한 dummy-data 입니다.',
  resizable: true,
};

export const NoData = TableDataStory.bind({});
NoData.decorators = [() => <TableCommonDecorators />];
