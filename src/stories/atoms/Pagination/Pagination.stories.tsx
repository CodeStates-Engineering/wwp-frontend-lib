import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Pagination } from "./Pagination";
import { useState } from "react";

export default {
  title: "atoms/Pagination",
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const PaginationStory: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Default = () => {
  const pageState = useState(1);
  return <PaginationStory pageCount={10} pageState={pageState} />;
};
