import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { FileUpload } from "./FileUpload";
import type { FileUploadProps } from "./FileUpload";
import React from "react";

export default {
  title: "atoms/FileUpload",
  component: FileUpload,
} as ComponentMeta<typeof FileUpload>;

const HrStory: ComponentStory<typeof FileUpload> = (args) => (
  <FileUpload {...args} />
);

export const Default = HrStory.bind({});
