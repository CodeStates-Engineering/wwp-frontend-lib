import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Table } from "./Table";
import React from "react";

export default {
  title: "molecules/Table",
  component: Table.Container,
} as ComponentMeta<typeof Table.Container>;

const TableStory: ComponentStory<typeof Table.Container> = (args) => (
  <Table.Container {...args} />
);

export const Default = TableStory.bind({});
Default.args = {
  children: (
    <>
      <Table.Head>
        <Table.Row>
          <Table.Title>title</Table.Title>
          <Table.Title>title2</Table.Title>
          <Table.Title>title3</Table.Title>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Data>data</Table.Data>
          <Table.Data>data2</Table.Data>
          <Table.Data>data3</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>data</Table.Data>
          <Table.Data>data2</Table.Data>
          <Table.Data>data3</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>data</Table.Data>
          <Table.Data>data2</Table.Data>
          <Table.Data>data3</Table.Data>
        </Table.Row>
      </Table.Body>
    </>
  ),
};
