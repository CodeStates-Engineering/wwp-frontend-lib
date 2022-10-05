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
const defaultArgs: FileUploadProps = {
  disabled: false,
  instantUpload: false, //스토리북에서는 지원하지 않을 예정
  theme: "box",
  placeholder: "파일을 업로드해주세요.",
  accept: "image/*",
  url: "https://test",
};
Default.args = defaultArgs;
