import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { FileDownload } from "./FileDownload";
import React from "react";

export default {
  title: "atoms/FileDownload",
  component: FileDownload,
} as ComponentMeta<typeof FileDownload>;

const HrStory: ComponentStory<typeof FileDownload> = (args) => (
  <FileDownload {...args} />
);

export const Default = HrStory.bind({});
Default.args = {
  fileUrl: "https://imgdownloader.com/98926b88-2543-47f7-a6b9-46609226cfb6",
};
