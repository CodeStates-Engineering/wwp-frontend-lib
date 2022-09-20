import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaginationWithPageSize } from "./PaginationWithPageSize";
import React from "react";

export default {
  title: "molecules/PaginationWithPageSize",
  component: PaginationWithPageSize,
} as ComponentMeta<typeof PaginationWithPageSize>;

const PaginationWithPageSizeStory: ComponentStory<
  typeof PaginationWithPageSize
> = (args) => <PaginationWithPageSize {...args} />;

export const Default = PaginationWithPageSizeStory.bind({});
